import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBook, FaLightbulb, FaHome } from "react-icons/fa";

const LessonPresentation = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Find the current lesson
  const lesson = lessons.find(l => l.id === parseInt(id));
  
  // Define slides for each lesson
  const slides = [
    {
      type: "introduction",
      content: (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-blue-900">{lesson?.title}</h2>
          <p className="text-lg text-gray-700">{lesson?.content}</p>
        </div>
      )
    },
    {
      type: "quran",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-green-800">Quranic Reference</h3>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-xl text-green-900 arabic-font">{lesson?.quran}</p>
          </div>
        </div>
      )
    },
    {
      type: "hadith",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-blue-800">Prophetic Hadith</h3>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-xl text-blue-900">{lesson?.hadith}</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaHome className="mr-2" /> Back to Lessons
          </Link>
          <div className="text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>

        {/* Presentation Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[400px]">
          {slides[currentSlide].content}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            <FaArrowLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPresentation; 