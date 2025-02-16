import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBook, FaLightbulb, FaGraduationCap } from "react-icons/fa";

const lessons = [
  {
    id: 1,
    title: "The Importance of Education in Islam",
    content: `
      Islam emphasizes the pursuit of knowledge. The first word revealed in the Quran was "Iqra" (Read).
      Prophet Muhammad (ﷺ) said: "Seeking knowledge is an obligation upon every Muslim." (Ibn Majah)
      Education is not only about religious studies but also about understanding the world.
    `,
    quran: "Read! In the name of your Lord who created. (Quran 96:1)",
    hadith: "Whoever follows a path in pursuit of knowledge, Allah will make the path to Paradise easy for him. (Muslim)",
  },
  {
    id: 2,
    title: "Contributions of Muslim Scholars to Education",
    content: `
      Muslim scholars played a major role in education. 
      - **Ibn Sina** (Avicenna) - Father of modern medicine.
      - **Al-Khwarizmi** - Founder of algebra.
      - **Fatima Al-Fihri** - Established the first university (University of Al Quaraouiyine).
    `,
    quran: "Say, 'Are those who know equal to those who do not know?' (Quran 39:9)",
    hadith: "The best among you are those who learn the Quran and teach it. (Bukhari)",
  },
  {
    id: 3,
    title: "Education as a Tool for Social Change",
    content: `
      Education empowers individuals and communities. It helps eliminate poverty, promotes equality, 
      and encourages critical thinking. Islam encourages seeking both religious and worldly knowledge.
    `,
    quran: "And say, 'My Lord, increase me in knowledge.' (Quran 20:114)",
    hadith: "When a person dies, their deeds end except for three: Sadaqah Jariyah, beneficial knowledge, and a righteous child. (Muslim)",
  },
];

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
          Explore the importance of education in Islam through Quranic verses, Hadith, and inspiring stories.
        </p>
      </header>

      {/* Lesson Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-900">{lessons[currentLesson].title}</h2>
        <p className="text-gray-700 mt-3">{lessons[currentLesson].content}</p>
        
        {/* Quran & Hadith Reference */}
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-blue-900"><FaBook className="inline-block text-lg mr-2" /> <strong>Quran:</strong> {lessons[currentLesson].quran}</p>
          <p className="text-blue-900 mt-2"><FaLightbulb className="inline-block text-lg mr-2" /> <strong>Hadith:</strong> {lessons[currentLesson].hadith}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition" 
            onClick={prevLesson} 
            disabled={currentLesson === 0}
          >
            <FaArrowLeft className="inline-block mr-2" /> Previous
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" 
            onClick={nextLesson} 
            disabled={currentLesson === lessons.length - 1}
          >
            Next <FaArrowRight className="inline-block ml-2" />
          </button>
        </div>
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
