import { useParams, useNavigate, Navigate } from "react-router-dom";
import UserOnboarding from "../components/UserOnboarding";

const steps = [
  {
    question: "How many full-time employees does your business have?",
    options: ["1-5 employees", "6-50 employees", "51-200 employees", "More than 200 employees"],
  },
  {
    question: "How many percentage of your business is owned by Malaysian citizens?",
    options: ["100%", "51-99%", "20-50%", "Less than 20%"],
  },
  {
    question: "Is your business registered with SSM, PBT, or SKM?",
    options: ["Yes, registered with SSM", "Yes, registered with PBT", "Yes, registered with SKM", "No, not registered with any authority"],
  },
   {
    question: "How long has your business been operating?",
    options: ["Less than 1 year", "1-3 years", "8-10 years", "More than 10 years"],
  },
  {
    question: "What is your business's average annual turnover (in RM)?",
    options: ["Less than RM 300,000", "RM300,000 - RM3 million", "RM3 million - RM20 million", "More than RM20 million"],
  },
  {
    question: "What type of business are you operating?",
    options: ["Manufacturing", "Services", "Retail", "Others"],
  }
];

export default function OnboardingStep() {
  const { step } = useParams();
  const navigate = useNavigate();

  // Extract number from 'step-1' format
  const match = step?.match(/^step-(\d+)$/);
  const stepIndex = match ? parseInt(match[1], 10) - 1 : -1;

  // Invalid or out-of-bounds step? Redirect to first step
  if (stepIndex < 0 || stepIndex >= steps.length) {
    return <Navigate to="/onboarding/step-1" replace />;
  }

  // eslint-disable-next-line no-unused-vars
  const handleNext = (selectedOption) => {
    const nextStep = stepIndex + 2;
    if (nextStep > steps.length) {
      // All steps complete — redirect to dashboard or final destination
      navigate("/dashboard");
    } else {
      // Go to next onboarding step
      navigate(`/onboarding/step-${nextStep}`);
    }
  };

  return (
    <UserOnboarding
      currentStep={stepIndex + 1}
      totalSteps={steps.length}
      question={steps[stepIndex].question}
      options={steps[stepIndex].options}
      onNext={handleNext}
    />
  );
}
