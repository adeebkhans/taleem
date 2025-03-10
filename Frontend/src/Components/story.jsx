import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBook, FaLightbulb, FaHome } from "react-icons/fa";
import { lessons } from '../data/lessons';
import { motion, AnimatePresence } from "framer-motion";

const Story = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Find the current lesson
  const lesson = lessons.find(l => l.id === parseInt(id));
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Define interactive slides for each lesson
  const slides = [
    {
      type: "title",
      background: "bg-[url('/images/islamic-pattern1.jpg')]",
      content: (
        <div className="text-center space-y-6 bg-white/90 p-8 rounded-xl backdrop-blur-sm">
          <h2 className="text-5xl font-bold text-blue-900">{lesson?.title}</h2>
          <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <FaBook className="text-5xl text-blue-600" />
          </div>
          <p className="text-2xl text-gray-700">Let's explore this topic together!</p>
        </div>
      )
    },
    {
      type: "introduction",
      background: "bg-[url('/images/islamic-pattern2.jpg')]",
      content: (
        <div className="space-y-6 bg-white/90 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-4xl font-bold text-blue-800">Introduction</h3>
          <div className="bg-white/80 p-8 rounded-lg shadow-xl">
            <p className="text-xl text-gray-700 leading-relaxed">{lesson?.content}</p>
          </div>
        </div>
      )
    },
    {
      type: "quran",
      background: "bg-[url('/images/islamic-pattern3.jpg')]",
      content: (
        <div className="space-y-6 bg-white/90 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-4xl font-bold text-green-800">Quranic Guidance</h3>
          <div className="bg-green-50/90 p-8 rounded-lg border-2 border-green-200 shadow-xl">
            <p className="text-3xl text-green-900 text-center mb-6 arabic-font">{lesson?.quran}</p>
            <div className="mt-6 p-6 bg-white/90 rounded-lg">
              <p className="text-xl text-gray-700">This verse teaches us the importance of seeking knowledge and understanding in our faith journey.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      type: "hadith",
      background: "bg-[url('/images/islamic-pattern4.jpg')]",
      content: (
        <div className="space-y-6 bg-white/90 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-4xl font-bold text-blue-800">Prophetic Wisdom</h3>
          <div className="bg-blue-50/90 p-8 rounded-lg border-2 border-blue-200 shadow-xl">
            <p className="text-2xl text-blue-900 mb-6">{lesson?.hadith}</p>
            <div className="mt-6 p-6 bg-white/90 rounded-lg">
              <p className="text-xl text-gray-700">This hadith emphasizes the significance of education in Islam and its rewards.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      type: "reflection",
      background: "bg-[url('/images/islamic-pattern5.jpg')]",
      content: (
        <div className="space-y-6 bg-white/90 p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-4xl font-bold text-purple-800">Reflection Points</h3>
          <div className="bg-purple-50/90 p-8 rounded-lg shadow-xl">
            <ul className="space-y-6">
              <li className="flex items-start">
                <FaLightbulb className="text-purple-600 text-2xl mt-1 mr-4" />
                <p className="text-xl text-gray-700">How can we apply this knowledge in our daily lives?</p>
              </li>
              <li className="flex items-start">
                <FaLightbulb className="text-purple-600 text-2xl mt-1 mr-4" />
                <p className="text-xl text-gray-700">What changes can we make based on these teachings?</p>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    console.log('Next clicked', currentSlide, slides.length); // Debug log
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    console.log('Prev clicked', currentSlide); // Debug log
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentSlide === slides.length - 1) {
          // Navigate back to lessons page on right arrow at last slide
          window.location.href = '/education-in-islam';
        } else {
          nextSlide();
        }
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, slides.length]);

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/education-in-islam" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <FaHome className="mr-2" /> Back to Lessons
          </Link>
          <div className="text-white">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentSlide + 1) / slides.length * 100}%` }}
          ></div>
        </div>

        {/* Presentation Card */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl mb-16">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={`absolute inset-0 ${slides[currentSlide].background} bg-cover bg-center p-12 flex items-center justify-center`}
            >
              <div className="w-full max-w-4xl">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 w-full max-w-md px-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex-1 flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg 
                      disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300
                      hover:bg-blue-700 hover:scale-105 active:scale-95
                      shadow-lg hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaArrowLeft className="mr-2" /> Previous
          </button>
          {currentSlide === slides.length - 1 ? (
            <Link 
              to="/education-in-islam"
              className="flex-1 flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg 
                        transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95
                        shadow-lg hover:shadow-xl"
            >
              Done <FaHome className="ml-2" />
            </Link>
          ) : (
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex-1 flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg 
                        disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300
                        hover:bg-blue-700 hover:scale-105 active:scale-95
                        shadow-lg hover:shadow-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                          ${currentSlide === index 
                            ? 'bg-blue-500 w-6' 
                            : 'bg-gray-400 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
