/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import {  FaGraduationCap } from "react-icons/fa";
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
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">Education in Islam</h1>
        <p className="text-lg text-gray-700 mt-2">
          Explore the importance of education in Islam through interactive lessons.
        </p>
      </header>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/lesson/${lesson.id}`} 
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <FaGraduationCap className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 text-center mb-3">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {lesson.content.substring(0, 100)}...
                </p>
              </div>
              <div className="bg-blue-50 px-6 py-3">
                <div className="flex items-center justify-center text-blue-600 text-sm">
                  Click to start lesson
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-900">Knowledge Check</h2>
        {!quizCompleted ? (
          <>
            <p className="text-gray-700 mt-3">{quizQuestions[quizIndex].question}</p>
            <div className="mt-3">
              {quizQuestions[quizIndex].options.map((option) => (
                <button 
                  key={option} 
                  className={`block w-full py-2 px-4 my-2 rounded-lg border ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => handleQuizAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={nextQuizQuestion}>
              Next Question
            </button>
          </>
        ) : (
          <p className="text-lg font-semibold text-green-600">You scored {score}/{quizQuestions.length}!</p>
        )}
      </div>
    </div>
  );
}
