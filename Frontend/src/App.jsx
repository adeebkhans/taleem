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
import Community from "./Components/Community";
import PostView from "./Components/PostView";
import EventView from "./Components/EventView";

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
        <Route path="/community" element={<Community />} /> 
        <Route path="/community/post/:id" element={<PostView />} />
        <Route path="/community/event/:id" element={<EventView />} />
      </Routes>
    </>
  );
}

export default App;
