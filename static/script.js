let finishedCollectingPersonalInfo = false;
let curQuestionIndex = 1;
const numOfQuestions = 8;
function addMessage(sender, text, className) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = `message ${className}`;
    msg.innerText = `${sender}: ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function initWelcomeMessage() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: Hi, I am a chatbot for answering questions related to grants.";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForName() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: Before starting our conversation, I need to collect some of your personal info for smoother experience. Please tell me your name.";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForEmail() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: Great. Please tell me your email address.";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}


async function askForNumOfEmployees() {
    document.getElementById('user-input').disabled = true;
    document.getElementById('send-msg').disabled = true;
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    // Add the bot message
    const text = document.createElement("p");
    text.innerText = "Bot: How many full-time employees does your business have?";
    msgElem.appendChild(text);

    // Create the dropdown
    const select = document.createElement("select");
    select.name = "numEmployees";
    select.id = "numEmployees";
    select.value = "0";

    // Add options to the dropdown
    const options = [
        "1 - 5 (Micro enterprise)",
        "6 - 30 (Small enterprise)",
        "31 - 75 (Small enterprise)",
        "76 - 200 (Medium enterprise)",
        "More than 200 (Not eligible as SME)"
    ];

    options.forEach((label, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = label;
        select.appendChild(option);
    });

    // Create submit button
    const submitBtn = document.createElement("button");
    submitBtn.id = "submit_btn"
    submitBtn.innerText = "Submit";
    submitBtn.style.marginLeft = "10px";
    submitBtn.onclick = async () => {
        const selectedValue = select.value;
        if (selectedValue) {
            // send a post req to backend
            try {
                const response = await fetch("/add-num-employees", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ num_employees: selectedValue }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
                console.log("Success:", data.detail);
                document.getElementById('user-input').disabled = false;
                document.getElementById('send-msg').disabled = false;
                document.getElementById("user-input").value = options[selectedValue];                
                sendMessage();
            } catch (error) {
                console.error("Error:", error.message);
            }
        } else {
            alert("Please select an option.");
        }
    };
    // Append the dropdown to the message
    msgElem.appendChild(select);
    msgElem.appendChild(submitBtn);

    // Add the whole message to the chat box
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForMalaysianOwnedInfo() {
    console.log("asking for msian owned info...")
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: How many percentage of your business is owned by Malaysian citizens?";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForBusinessRegistrationStatus() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: Is your business registered with SSM (Companies Commission of Malaysia), a Local Authority (PBT), or SKM (for cooperatives)?";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}


async function askForBusinessOperationDuration() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: How long has your business been operating?";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForAnnualTurnover() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: What is your business's average annual turnover (in RM)?";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askForBusinesType() {
    const chatBox = document.getElementById("chat-box");
    const msgElem = document.createElement("div");
    msgElem.className = `message bot`;
    msgElem.innerText = "Bot: What type of business are you operating? (e.g. retail, F&B, logistics, manufacturing, services)";
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}


async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;
  
    console.log("user answering curQuestionIndex = " + curQuestionIndex);
    addMessage("You", message, "user");
    input.value = "";
    if (finishedCollectingPersonalInfo) {
        
        try {
            const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
            });
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.detail || "Unknown error");
            }
            const chatBox = document.getElementById("chat-box");
            const msgElem = document.createElement("div");
            msgElem.className = `message bot`;
            msgElem.innerText = "Bot: " + data.chat_response;
            chatBox.appendChild(msgElem);
            chatBox.scrollTop = chatBox.scrollHeight;
            console.log("Success:", data.detail);
        } catch (error) {
            console.error("Error:", error.message);
        }
        
    } else {
        // send POST reqs to backend, to save personal info of the user
        console.log("Sending message (for onboarding user profiling) to backend:")
        console.log(message);
        if (curQuestionIndex == 1) {
            try {
                const response = await fetch("/add-name", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: message }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForEmail();
        } else if (curQuestionIndex == 2) {
            try {
                const response = await fetch("/add-email-address", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email_address: message }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForNumOfEmployees();
        } else if (curQuestionIndex == 3) {
            //  delete drop-down menu and the submit button
            const num_employees = document.getElementById("numEmployees");
            if (submit_btn) {
                submit_btn.remove(); // This removes it from the DOM
            }

            if (num_employees) {
                num_employees.remove(); // This removes it from the DOM
            }
            curQuestionIndex++;
            askForMalaysianOwnedInfo();
        } else if (curQuestionIndex == 4) {
            try {
                const response = await fetch("/add-msian-owned-percentage", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ msian_owned_percentage: message }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForBusinessRegistrationStatus();
        } else if (curQuestionIndex == 5) {
            try {
                const response = await fetch("/add-business-registration-status", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ registration_status: message }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForBusinessOperationDuration();
        } else if (curQuestionIndex == 6) {
            try {
                const response = await fetch("/add-business-operation-duration", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ num_years: 2, num_months: 3}),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForAnnualTurnover();
        } else if (curQuestionIndex == 7) {
            try {
                const response = await fetch("/add-annual-turnover", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ annual_turnover: 50000}),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
            } catch (error) {
                console.error("Error:", error.message);
            }
            curQuestionIndex++;
            askForBusinesType();
        } else if (curQuestionIndex == 8) {
            finishedCollectingPersonalInfo = true;
            try {
                const response = await fetch("/add-business-sector", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ business_sector: message}),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    throw new Error(data.detail || "Unknown error");
                }
            
                console.log("Success:", data.detail);
                const chatBox = document.getElementById("chat-box");
                const msgElem = document.createElement("div");
                msgElem.className = `message bot`;
                msgElem.innerText = "Bot: Done with collecting your personal info!";
                chatBox.appendChild(msgElem);
                chatBox.scrollTop = chatBox.scrollHeight;
                const chatBox2 = document.getElementById("chat-box");
                const msgElem2 = document.createElement("div");
                msgElem2.className = `message bot`;
                msgElem2.innerText = "Bot: " + data["suggested_grant"];
                chatBox.appendChild(msgElem2);
                chatBox2.scrollTop = chatBox2.scrollHeight;
                
            } catch (error) {
                console.error("Error:", error.message);
            }
            
        } else {
            finishedCollectingPersonalInfo = true;
            const chatBox = document.getElementById("chat-box");
            const msgElem = document.createElement("div");
            msgElem.className = `message bot`;
            msgElem.innerText = "Bot: Done with collecting your personal info!";
            chatBox.appendChild(msgElem);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
  }

initWelcomeMessage()
askForName()