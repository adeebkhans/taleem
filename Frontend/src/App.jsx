import EducationInIslam from "./Components/EducationInIslam";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Story from './Components/story';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/scholarships" element={<Scholarships />} /> */}
        <Route path="/education-in-islam" element={<EducationInIslam />} />
        <Route path="/lesson/:id" element={<Story />} />
        {/* <Route path="/institutes" element={<Institutes />} />
        <Route path="/learning" element={<LearningHub />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
