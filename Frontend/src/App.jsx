import EducationInIslam from "./Components/EducationInIslam";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/scholarships" element={<Scholarships />} /> */}
        <Route path="/education-in-islam" element={<EducationInIslam />} />
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
