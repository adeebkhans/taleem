/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaQuestionCircle } from "react-icons/fa";
import { lessons } from '../data/lessons';

const quizQuestions = [
  {
    question: "What was the first word revealed in the Quran?",
    options: ["Read", "Pray", "Write", "Believe"],
    answer: "Read",
  },
  {
    question: "Who is known as the Father of Algebra?",
    options: ["Ibn Sina", "Al-Khwarizmi", "Al-Farabi", "Jabir Ibn Hayyan"],
    answer: "Al-Khwarizmi",
  },
  {
    question: "Which Muslim woman founded the first university?",
    options: ["Aisha bint Abu Bakr", "Fatima Al-Fihri", "Khadija bint Khuwaylid", "Razia Sultana"],
    answer: "Fatima Al-Fihri",
  },
];

export default function EducationInIslam() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleQuizAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === quizQuestions[quizIndex].answer) {
      setScore(score + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Quiz Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Education in Islam 📚
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore the importance of education in Islam through interactive lessons
            </p>
          </div>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md flex items-center gap-2"
          >
            <FaQuestionCircle className="text-xl" />
            {showQuiz ? 'View Lessons' : 'Take Quiz'}
          </button>
        </div>

        {!showQuiz ? (
          // Lessons Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Link 
                key={lesson.id} 
                to={`/lesson/${lesson.id}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
                      <FaGraduationCap className="text-3xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center line-clamp-3">
                      {lesson.content}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3">
                    <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">
                      Start Learning →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Quiz Section
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Knowledge Check
            </h2>
            {!quizCompleted ? (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200 text-lg">
                    {quizQuestions[quizIndex].question}
                  </p>
                </div>
                <div className="grid gap-3">
                  {quizQuestions[quizIndex].options.map((option) => (
                    <button 
                      key={option} 
                      className={`w-full p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        selectedAnswer === option 
                          ? "bg-blue-600 text-white border-blue-600" 
                          : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handleQuizAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button 
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md w-full"
                  onClick={nextQuizQuestion}
                >
                  Next Question
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quiz Completed!
                </h3>
                <p className="text-lg text-green-600 dark:text-green-400">
                  You scored {score}/{quizQuestions.length}
                </p>
                <button
                  onClick={() => {
                    setQuizCompleted(false);
                    setQuizIndex(0);
                    setScore(0);
                    setSelectedAnswer(null);
                  }}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
