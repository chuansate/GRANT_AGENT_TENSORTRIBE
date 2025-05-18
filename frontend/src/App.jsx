import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GrantDashboard from './components/GrantDashboard';
import Chatbot from './components/Chatbot';
import ROICalculator from './components/ROI_calculator';
import GrantROIResult from './components/ROI_calculator_best_fit_grant';
import Account from './components/Account';
import Language from './components/Language';
import Settings from './components/Settings';
import Login from './components/Login';
import OnboardingStep from './components/OnboardingStep';
import EligibilityChecker from './components/EligibilityChecker';
import RecommendedGrants from './components/RecommendedGrants';
import GrantDetails from './components/GrantDetails';
import GrantChecklist from './components/GrantChecklist';
import GrantApplicationAssistant from './components/GrantApplicationAssistant';
import EligibilityResult from './components/EligibilityResult';
import IneligibilityResult from './components/IneligibilityResult';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Set the Routes here */}
        <Routes>
          <Route path="/dashboard" element={<GrantDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/roi-result" element={<GrantROIResult />} />
          <Route path="/account" element={<Account />} />
          <Route path="/language" element={<Language />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Login />} />
          <Route path="/onboarding/:step" element={<OnboardingStep />} />
          <Route path='/eligibility-checker' element={<EligibilityChecker />} />
          <Route path='/recommended-grants' element={<RecommendedGrants />} />  
          <Route path='/grant-details' element={<GrantDetails />} />
          <Route path='/grant-checklist' element={<GrantChecklist />} />
          <Route path='/grant-application-assistant' element={<GrantApplicationAssistant />} />
          <Route path='/eligibility-result' element={<EligibilityResult/>} />
          <Route path='/ineligibility-result' element={<IneligibilityResult/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
