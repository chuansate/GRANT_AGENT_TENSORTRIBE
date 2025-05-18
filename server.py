"""
Using alibaba cloud for the LLMs
"""
import traceback
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from threading import Thread
from fastapi.responses import StreamingResponse
import sys, chromadb, ollama
import os
from pydantic import BaseModel
from typing import Dict, List, Optional
import json
load_dotenv()
MAX_TURNS = 5
chromaclient = chromadb.HttpClient(host="0.0.0.0", port=8000)
collection = chromaclient.get_or_create_collection(name="grant")
print("Hi, I am a chatbot for answering questions related to grants, how may I help you?")
chat_history = []
app = FastAPI()

MODEL_STUDIO_API_KEY = os.getenv('MODEL_STUDIO_API_KEY')

client = OpenAI(
    api_key=MODEL_STUDIO_API_KEY,
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)
user_profile_prompt = "Here is the user profile:"
recommended_grant = False
onboarding_profiling_questions = {
    "What is your name?",
    "What is your email address?",
    "How many full-time employees does your business have?",  #  (To classify as a micro, small, or medium enterprise under SME definitions)
    "How many percentage of your business is owned by Malaysian citizens?",
    "Is your business registered with SSM (Companies Commission of Malaysia), a Local Authority (PBT), or SKM (for cooperatives)?",
    "How long has your business been operating?",
    "What is your business's average annual turnover (in RM)?",
    "What type of business are you operating? (e.g. retail, F&B, logistics, manufacturing, services)",
}

user_info = {
    "name": None,
    "email_address": None,
    "company_size": None,
    "owned_by_Msians_percentage": None,
    "registered": None,
    "operation_duration": None,
    "annual_turnover": None,
    "business_sector": None
}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

messages = [{"role": "system", "content": "You are a helpful assistant that answer the questions related to grants and license applications."}]

@app.post("/chat")
async def chat(request: Request):
    try:
        body = await request.json()
        query = body.get("message", "")
        # queryembed = ollama.embed(model="nomic-embed-text", input=query)['embeddings']
        completion = client.embeddings.create(
            model="text-embedding-v3",
            input=[query],
            dimensions=768,
            encoding_format="float"
        )
        data_dict = json.loads(completion.model_dump_json())
        queryembed = data_dict["data"][0]["embedding"]
        relateddocs = '\n\n'.join(collection.query(query_embeddings=queryembed, n_results=3)['documents'][0])
        
        prompt = f"""
        Answer the question using the following grant information only as a resource: {relateddocs}
        """
        print()
        print("\n\033[94m(((((((((((((((((((PROMPT)))))))))))))))))))\033[0m")
        print("\n\033[94m" + prompt + "\033[0m")
        print("\n\033[94m(((((((((((((((((())))))))))))))))))\033[0m")
        print()
        messages.append({"role": "user", "content": query})

        response = client.chat.completions.create(
            model="qwen-plus",
            messages=messages
        )

        # Extract and display the assistant's reply
        reply = response.choices[0].message.content.strip()

        return {
            "detail": "Response returned successfully.",
            "chat_response": reply
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )


class NameRequest(BaseModel):
    name: str

@app.post("/add-name")
async def add_name(data: NameRequest):
    try:
        name = data.name
        print("name = ", name)
        if not name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Name must not be empty."
            )
        user_info["name"] = name
        return {
            "detail": "Name of the user has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )

class EmailAddressRequest(BaseModel):
    email_address: str  

@app.post("/add-email-address")
async def add_email_address(data: EmailAddressRequest):
    try:
        email_address = data.email_address
        print("email_address = ", email_address)
        if not email_address:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address must not be empty."
            )
        user_info["email_address"] = email_address
        return {
            "detail": "Email address of the user has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )

class NumEmployeesRequest(BaseModel):
    num_employees: str
@app.post("/add-num-employees")
async def add_num_employees(data: NumEmployeesRequest):
    # 1 – 5 (Micro enterprise)
    # 6 – 30 (Small enterprise)
    # 31 – 75 (Small enterprise)
    # 76 – 200 (Medium enterprise)
    # More than 200 (Not eligible as SME) 
    try:
        num_employees_classes = {
            "0": "1-5 employees",
            "1": "6-30 employees",
            "2": "31-75 employees",
            "3": "76-200 employees",
            "4": "More than 200 employees"
        }
        num_employees = data.num_employees
        print("num_employees = ", num_employees)
        if not num_employees:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Number of full-time employees must not be empty."
            )
        user_info["company_size"] = num_employees_classes[num_employees]
        return {
            "detail": "Number of full-time employees has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )


class MsiaOwnedPercentageRequest(BaseModel):
    msian_owned_percentage: str
@app.post("/add-msian-owned-percentage")
async def add_msian_owned_percentage(data: MsiaOwnedPercentageRequest):
    try:
        msian_owned_percentage = data.msian_owned_percentage
        print("msian_owned_percentage = ", msian_owned_percentage)
        if not msian_owned_percentage:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Percentage of the company owned by Malaysians must not be empty."
            )
        msian_owned_percentage = int(msian_owned_percentage)
        user_info["owned_by_Msians_percentage"] = msian_owned_percentage
        return {
            "detail": "Percentage of the company owned by Malaysians has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )

class BusinessRegistrationStatusRequest(BaseModel):
    registration_status: str
@app.post("/add-business-registration-status")
async def add_business_registration_status(data: BusinessRegistrationStatusRequest):
    try:
        statuses = {
            "0": False,
            "1": True
        }
        business_registration_status = data.registration_status
        print("business_registration_status = ", business_registration_status)
        if not business_registration_status:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Business_registration_status must not be empty."
            )
        user_info["registered"] = statuses[business_registration_status]
        print("-----user_info----")
        print(user_info)
        print("-----------------")
        return {
            "detail": "Business_registration_status owned by Malaysians has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )


class BusinessOperationDurationRequest(BaseModel):
    num_years: int
    num_months: int
@app.post("/add-business-operation-duration")
async def add_business_operation_duration(data: BusinessOperationDurationRequest):
    try:
        num_years = data.num_years
        num_months = data.num_months
        if not num_years or not num_months:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Operation duration must not be empty."
            )
        user_info["operation_duration"] = [num_years, num_months]
        print("-----user_info----")
        print(user_info)
        print("-----------------")
        return {
            "detail": "Business operation duration has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )

class AnnualTurnoverRequest(BaseModel):
    annual_turnover: int
@app.post("/add-annual-turnover")
async def add_annual_turnover(data: AnnualTurnoverRequest):
    try:
        annual_turnover = data.annual_turnover
        if not annual_turnover:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Annual turnover must not be empty."
            )
        user_info["annual_turnover"] = annual_turnover
        print("-----user_info----")
        print(user_info)
        print("-----------------")
        return {
            "detail": "Annual turnover has been recorded!",
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )

messages_suggest_grant = [{"role": "system", "content": "You are a helpful assistant that suggests grants to the user based on their company profile."}]

class BusinessSectorRequest(BaseModel):
    business_sector: str
@app.post("/add-business-sector")
async def add_business_sector(data: BusinessSectorRequest):
    try:
        business_sector = data.business_sector
        if not business_sector:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Business_sector must not be empty."
            )
        user_info["business_sector"] = business_sector
        print("-----user_info----")
        print(user_info)
        print("-----------------")
        query = "List all the available grants and their eligibilities:"
        # prompting the LLM to recommend grant based on the user profile
        # queryembed = ollama.embed(model="nomic-embed-text", input=query)['embeddings']
        completion = client.embeddings.create(
            model="text-embedding-v3",
            input=[query],
            dimensions=768,
            encoding_format="float"
        )
        data_dict = json.loads(completion.model_dump_json())
        queryembed = data_dict["data"][0]["embedding"]
        relateddocs = '\n\n'.join(collection.query(query_embeddings=queryembed, n_results=5)['documents'][0])

        prompt = "A user approached you for grant suggestion for his/her company, here is the company profile:"
        prompt += "\n- The company consists of " + user_info["company_size"]
        prompt += "\n- The company is owned by " + str(user_info["owned_by_Msians_percentage"]) + "% of Malaysians"
        if user_info["registered"]:
            prompt += "\n- The company registered with SSM (Companies Commission of Malaysia), a Local Authority (PBT), or SKM (for cooperatives)"
        else:
            prompt += "\n- The company did not register with SSM (Companies Commission of Malaysia), a Local Authority (PBT), or SKM (for cooperatives)"
        prompt += "\n - The company has been operating for " + str(user_info["operation_duration"][0]) + " years and " + str(user_info["operation_duration"][1]) + " months"
        prompt += "\n - The company's annual turnover is RM " + str(user_info["annual_turnover"])
        prompt += "\n - The company is doing business in sector " + user_info["business_sector"]
        prompt += f"\nBy checking if the company fulfills the eligibility of the grants, recommend some grants to the user based the grants below only:\n {relateddocs}"
        
        print()
        print("\n\033[94m(((((((((((((((((((PROMPT)))))))))))))))))))\033[0m")
        print("\n\033[94m" + prompt + "\033[0m")
        print("\n\033[94m(((((((((((((((((())))))))))))))))))\033[0m")
        print()

        # ragoutput = ollama.generate(model="llama3.2", prompt=prompt, stream=False, options={"temperature": 0.0})
        # response_part = ragoutput["response"]
        response = client.chat.completions.create(
            model="qwen-max",
            messages=messages
        )

        # Extract and display the assistant's reply
        reply_part = response.choices[0].message.content.strip()
        messages_suggest_grant.append({"role": "user", "content": query})

        print("RESPONSE PART@@@@@@@@@@@@@")
        print(reply_part)
        return {
            "detail": "Business_sector has been recorded!",
            "suggested_grant": reply_part
        }
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error, try again."
        )
    
class GrantFormRequest(BaseModel):
    name: str
    email_address: str
    company_size: str
    owned_by_Msians_percentage: str
    registered: str
    operation_duration: str
    annual_turnover: str
    business_sector: str

#agentic AI on form filling
@app.post("/fill-form/")
async def fill_form(request: GrantFormRequest):
    agent = get_grant_agent()

    # constructing data for form filling process
    form_data = f"""
    Name: {request.name}
    Email: {request.email_address}
    Company Size: {request.company_size}
    Malaysian Shareholder Percentage: {request.owned_by_Msians_percentage}
    Registered: {request.registered}
    Operation Duration: {request.operation_duration}
    Annual Turnover: {request.annual_turnover}
    Business Sector: {request.business_sector}
    """

    result = agent.run(f"Use this user info to fill ther grant application {form_data}")
    return {"result": result}


class GrantFormRequest(BaseModel):
    pass  # You can add fields if needed later
# ROI Calculator - Grant Category List
@app.post("/category-list/")
async def category_list(request: GrantFormRequest):
    grantCategory = [
        "Travel & Accommodation",
        "Event / Trade Show",
        "Marketing & Promotion",
        "Tech / Digitalization",
        "Training & Development",
        "Certification & Compliance"
    ]
    return {
        "categories": grantCategory
    }


class ExpenseRequest(BaseModel):
    grantCategory: str

class ExpenseResponse(BaseModel):
    expenses: list[str]

# get user expenses
@app.post("/get-expenses/", response_model=ExpenseResponse)
async def get_expenses(request: ExpenseRequest):
    grantCategory = request.grantCategory

    try:
        client = OpenAI(
            api_key=os.getenv("MODELSTUDIO_API_KEY"),
            base_url="https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation "
        )

        system_prompt = "You are an expert assistant helping SMEs apply for grants. Based on the grant category provided, list out 3 typical business expenses they might incur."
        user_prompt = f"Based on the grant category '{grantCategory}', what are the typical business expenses SMEs incur? Return them as a numbered list."

        completion = client.chat.completions.create(
            model="qwen-plus",  
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            max_tokens=512
        )

        # Extract LLM output
        raw_response = completion.choices[0].message.content.strip()

        # Convert to list
        expenses = [line.split('. ', 1)[1] for line in raw_response.split('\n') if '. ' in line]

        return {"expenses": expenses}

    except Exception as e:
        print(f"Error fetching expenses: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve expense items")
    

# Request Model
class ROICalculationRequest(BaseModel):
    category: str
    expenses: Dict[str, float]  # e.g., {"Flight tickets": 2000, "Venue rental": 3500}

# Response Model
class ROICalculationResponse(BaseModel):
    grantName: str
    claimable_amount: float
    estimated_eligibility: str
    roi_percentage: float
    focus_area: str
    status: str

GRANT_AVERAGE_AMOUNTS = {
    "Travel & Accommodation": 5000,
    "Event / Trade Show": 8000,
    "Marketing & Promotion": 6000,
    "Tech / Digitalization": 10000,
    "Training & Development": 4000,
    "Certification & Compliance": 3000
}

@app.post("/calculate-roi/", response_model=ROICalculationResponse)
async def calculate_roi(request: ROICalculationRequest):
    grantCategory = request.grantCategory
    user_expenses = request.expenses

    # Get total expenses
    total_expenses = sum(user_expenses.values())

    queryembed = ollama.embed(model="nomic-embed-text", input=query)['embeddings']
    relateddocs = '\n\n'.join(collection.query(query_embeddings=queryembed, n_results=8)['documents'][0])

    # Basic ROI formula: (Grant Value / Expense) * 100
    roi_percentage = round((estimated_grant_amount / total_expenses) * 100, 2)

    # Get estimated grant amount based on category
    estimated_grant_amount = roi_percentage*
    # if not estimated_grant_amount:
    #     raise HTTPException(status_code=400, detail="Invalid grant category")

    # Optional: Use Qwen to explain result
    explanation = None
    try:
        client = OpenAI(
            api_key=os.getenv("MODELSTUDIO_API_KEY"),
            base_url="https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation "
        )

        #prompt = f"Explain the ROI result for an SME that spent ${total_expenses} under '{category}' and received an estimated grant of ${estimated_grant_amount}. Keep it concise and professional."
        prompt = f"Calculate the ROI percentage "

        completion = client.chat.completions.create(
            model="qwen-max",
            messages=[{"role": "system", "content": "You are a financial advisor helping SMEs understand ROI from grants."}, 
                      {"role": "user", "content": prompt}],
            max_tokens=150
        )
        explanation = completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Qwen explanation error: {e}")
        explanation = "Could not generate explanation at this time."

    return {
        # "category": category,
        # "total_expenses": total_expenses,
        # "explanation": explanation,
        "grantName": grantName,
        "claimable_amount": estimated_grant_amount,
        "estimated_eligibility": estimated_eligibility,
        "roi_percentage": roi_percentage,
        "focus_area": focus_area,
        "status": status
    }