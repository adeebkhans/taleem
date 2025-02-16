import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBookOpen, FaUniversity, FaRobot, FaUsers, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null); // Simulate user authentication state
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);

  // Simulating fetching recommended scholarships
  useEffect(() => {
    if (user) {
      setRecommendedScholarships([
        { id: 1, title: "Islamic Development Bank Scholarship", link: "/scholarships/1" },
        { id: 2, title: "Muslim Women in STEM Grant", link: "/scholarships/2" },
      ]);
    }
  }, [user]);

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* 🌟 Hero Section */}
      <section 
        className="relative bg-blue-900 text-white py-35 text-center min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url("/Images/studying-5831644_1920.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
        
        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Empowering Muslim Students for a Brighter Future</h1>
          <p className="mt-3 text-lg md:text-xl">Explore scholarships, learning resources, and a supportive community.</p>
          <div className="mt-16 space-x-4">
            <Link to="/scholarships" className="inline-block bg-yellow-400 hover:bg-yellow-400/80 text-black px-6 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              Find Scholarships
            </Link>
            <Link to="/education-in-islam" className="inline-block bg-white hover:bg-white/80 text-blue-900 px-6 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              Take a Tour   
            </Link>
          </div>
        </div>
      </section>

      {/* 📌 Features Overview */}
      <section className="py-16 px-5">
        <h2 className="text-3xl font-bold text-center">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <FeatureCard icon={<FaBookOpen />} title="Scholarships" description="Find funding opportunities tailored for Muslim students." />
          <FeatureCard icon={<FaUniversity />} title="Supportive Institutes" description="Discover institutions that welcome and support Muslim students." />
          <FeatureCard icon={<FaRobot />} title="AI Chatbot" description="Ask questions and get personalized guidance on education." />
          <FeatureCard icon={<FaUsers />} title="Community" description="Join discussions, mentorship programs, and events." />
        </div>
      </section>

      {/* 🔍 Personalized Recommendations (Only if user is logged in) */}
      {user && (
        <section className="py-10 px-5 bg-white shadow-md rounded-lg mx-5">
          <h2 className="text-2xl font-bold mb-4">Recommended Scholarships for You</h2>
          <ul className="list-disc pl-5">
            {recommendedScholarships.map((scholarship) => (
              <li key={scholarship.id}>
                <Link to={scholarship.link} className="text-blue-500">{scholarship.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 📢 Latest Blog Articles */}
      <section className="py-10 px-5">
        <h2 className="text-2xl font-bold text-center">Latest Articles</h2>
        <div className="mt-5">
          <BlogPost title="The Importance of Seeking Knowledge in Islam" link="/blog/1" />
          <BlogPost title="Top Scholarships for Muslim Students in 2025" link="/blog/2" />
          <BlogPost title="Best Free Coding Resources for Beginners" link="/blog/3" />
        </div>
      </section>

      {/* 🤝 Community Engagement */}
      <section className="py-16 px-5 text-center bg-blue-100">
        <h2 className="text-3xl font-bold">Join the Community</h2>
        <p className="mt-3">Engage with like-minded learners, mentors, and education experts.</p>
        <Link to="/community" className="mt-5 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
          Join Now
        </Link>
      </section>

      {/* 🌍 Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>&copy; 2025 Taleem. All rights reserved.</p>
        <div className="mt-3">
          <Link to="/about" className="mx-3 text-gray-400">About Us</Link>
          <Link to="/contact" className="mx-3 text-gray-400">Contact</Link>
          <Link to="/privacy" className="mx-3 text-gray-400">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

// 📌 Feature Card Component
// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-lg p-5 rounded-lg text-center">
    <div className="text-blue-600 text-4xl">{icon}</div>
    <h3 className="text-xl font-bold mt-3">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

// 📢 Blog Post Component
// eslint-disable-next-line react/prop-types
const BlogPost = ({ title, link }) => (
  <div className="border-b py-3">
    <Link to={link} className="text-blue-600 font-semibold">{title}</Link>
    <FaArrowRight className="inline ml-2 text-blue-500" />
  </div>
);

export default Home;
