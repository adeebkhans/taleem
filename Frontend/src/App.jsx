import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Opportunities from "./Components/Opportunities";
import Scholarship from "./Components/scholarship";
import EducationInIslam from "./Components/EducationInIslam";
import Story from "./Components/story";
import AIChatbot from "./Components/AIChatbot";
import Institutes from "./Components/Institutes";
import { AuthPage } from "./Components/AuthPage"; // Import Auth Page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/scholarships" element={<Scholarship />} />
        <Route path="/education-in-islam" element={<EducationInIslam />} />
        <Route path="/lesson/:id" element={<Story />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/institutes" element={<Institutes />} />
        <Route path="/auth" element={<AuthPage />} /> 
      </Routes>
    </>
  );
}

export default App;
