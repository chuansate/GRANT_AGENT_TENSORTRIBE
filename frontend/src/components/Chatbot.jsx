import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const chatbot_replies = [
  {
    sender: "bot",
    text: `MSME Digital Grant is a grant amounting up to 50% or a maximum of RM 5,000 from total invoice amount. It has great deals on digital solutions from a wide list of panels listed by MDEC, such as 
- Digital marketing/sales
- Digital payment/e-POS System
- HR Payroll System/Customer Relationship Management (CRM)
- Enterprise Resource Planning (ERP)/Accounting & Tax
- Digital Signature
- IoT/Intelligent System
- Cyber Security

Here is the list of panels to choose from: https://www.bsn.com.my/cms/upload/pdf/business/msme_panel_list.pdf?csrt=3143073431472216021`,
  },
  {
    sender: "bot",
    text: `The application process for MSME Digital Grant:
1. Application & Selection
MSMEs/cooperatives can apply for the grant through our online portal, selecting the digital services they need from our Digitalisation Partners (DP). The grant is open to MSMEs/cooperatives meeting specific eligibility criteria.

2. Approval Process
Funding Societies will review applications. Approved MSMEs/cooperatives will be notified and must make a balance payment for the selected services within a 14-day period via a specific payment link.

3. Payment & Service Delivery
Upon payment, the chosen DPs will deliver the digital services to the MSMEs/cooperatives. The grant covers 50% of the invoiced amount or up to RM5,000.00.

4. Claim & Disbursement
Once services are delivered, DPs are to submit a claim form with proof of delivery. Upon approval, 50% of the total invoice amount (or up to RM5,000.00) will be disbursed to the DPs.`,
  },
];

const fallback_reply = { sender: "bot", text: "Server busy, try again later!" };

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I am a chatbot that will answer any questions related to grants.",
    },
  ]);
  const [curReplyIndex, setCurReplyIndex] = useState(0);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    setTimeout(() => {
      const reply = chatbot_replies[curReplyIndex];
      if (reply) {
        setMessages((prev) => [...prev, reply]);
        setCurReplyIndex(curReplyIndex + 1);
      } else {
        setMessages((prev) => [...prev, fallback_reply]);
        setCurReplyIndex(curReplyIndex + 1);
      }
    }, 1000);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[320px] md:w-[360px] p-3 md:p-4 flex flex-col h-[450px] md:h-[500px] border border-gray-200 shadow-lg rounded-2xl bg-white">
      <div className="text-base md:text-lg font-semibold mb-2">💬 Grant Bot</div>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-md">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3 py-2 rounded-md text-sm whitespace-pre-wrap break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
