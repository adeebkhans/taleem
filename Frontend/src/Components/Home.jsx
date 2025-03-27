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

      {/* 📌 Why Join Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Join Us?
          </h2>
          
          {/* All Features/Opportunities Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/scholarships" className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/Images/scholarship-bg.jpg")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 to-blue-900/60 group-hover:from-blue-600/50 group-hover:to-blue-900/50 transition-colors duration-300" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">
                    <FaBookOpen className="text-white/90" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Scholarships</h3>
                  <p className="text-sm text-white/90">Find funding opportunities tailored for Muslim students.</p>
                </div>
              </div>
            </Link>

            <Link to="/institutes" className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/Images/institutes-bg.jpg")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-green-600/60 to-green-900/60 group-hover:from-green-600/50 group-hover:to-green-900/50 transition-colors duration-300" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">
                    <FaUniversity className="text-white/90" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Supportive Institutes</h3>
                  <p className="text-sm text-white/90">Discover institutions that welcome and support Muslim students.</p>
                </div>
              </div>
            </Link>

            <Link to="/education-in-islam" className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/Images/education-islam-bg.jpg")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-600/60 to-purple-900/60 group-hover:from-purple-600/50 group-hover:to-purple-900/50 transition-colors duration-300" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">
                    <FaBookOpen className="text-white/90" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Education in Islam</h3>
                  <p className="text-sm text-white/90">Discover the rich tradition of learning in Islamic history.</p>
                </div>
              </div>
            </Link>

            <Link to="/ai-chatbot" className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/Images/ai-chat-bg.jpg")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/60 to-cyan-900/60 group-hover:from-cyan-600/50 group-hover:to-cyan-900/50 transition-colors duration-300" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">
                    <FaRobot className="text-white/90" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Chatbot</h3>
                  <p className="text-sm text-white/90">Ask questions and get personalized guidance on education.</p>
                </div>
              </div>
            </Link>

            <Link to="/community" className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/Images/community-bg.jpg")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-600/60 to-orange-900/60 group-hover:from-orange-600/50 group-hover:to-orange-900/50 transition-colors duration-300" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">
                    <FaUsers className="text-white/90" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-sm text-white/90">Join discussions, mentorship programs, and events.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard number="1000+" label="Active Scholarships" />
            <StatCard number="500+" label="Minority Institutes" />
            <StatCard number="50k+" label="Community Members" />
            <StatCard number="24/7" label="AI Support" />
          </div>
        </div>
      </section>

      {/* 🤝 Success Stories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              name="Adeeb Khan"
              role="Engineering Student"
              quote="Taleem helped me secure a full scholarship for my studies. The community support was invaluable!"
              image="https://avatars.githubusercontent.com/u/179551932?v=4"
            />
            <TestimonialCard
              name="Mohd Gous"
              role="Information Tech Student"
              quote="The AI chatbot guided me through the application process, and now I'm studying at my dream university."
              image="https://media.licdn.com/dms/image/v2/D5603AQGsqbGd2t1XZQ/profile-displayphoto-shrink_800_800/B56ZONijYzGcAc-/0/1733246471500?e=1748476800&v=beta&t=d40RdwNaS7l7vXAaqszFPUSFCBMUZ4aKFbbVBIk1eb0"
            />
          </div>
        </div>
      </section>

      {/* 🔍 Personalized Recommendations */}
      {user && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Recommended For You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedScholarships.map((scholarship) => (
                <Link
                  key={scholarship.id}
                  to={scholarship.link}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {scholarship.title}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <span>Learn More</span>
                    <FaArrowRight className="ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🤝 Community Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and grow together in your educational journey.
          </p>
          <Link 
            to="/community" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            Join Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* 🌍 Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Taleem</h3>
              <p className="text-blue-100">Empowering Muslim students for a brighter future through education.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-blue-100 hover:text-white transition-colors">Home</Link>
                <Link to="/scholarships" className="block text-blue-100 hover:text-white transition-colors">Scholarships 🎓</Link>
                <Link to="/opportunities" className="block text-blue-100 hover:text-white transition-colors">Opportunities 🚀</Link>
                <Link to="/education-in-islam" className="block text-blue-100 hover:text-white transition-colors">Education in Islam 🕌</Link>
                <Link to="/institutes" className="block text-blue-100 hover:text-white transition-colors">Institutes 🏫</Link>
                <Link to="/ai-chatbot" className="block text-blue-100 hover:text-white transition-colors">AI Chatbot 🤖</Link>
                <Link to="/community" className="block text-blue-100 hover:text-white transition-colors">Community 👥</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <p className="text-blue-100">Follow us on social media for updates and announcements.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-100">
            <p>&copy; {new Date().getFullYear()} Taleem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 📌 Feature Card Component
// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
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

const OpportunityCard = ({ title, description, link, bgImage }) => (
  <Link to={link} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <div className="aspect-w-16 aspect-h-9">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  </Link>
);

const StatCard = ({ number, label }) => (
  <div className="p-6 rounded-lg bg-white shadow-lg">
    <div className="text-3xl font-bold text-blue-600">{number}</div>
    <div className="text-gray-600 mt-2">{label}</div>
  </div>
);

const TestimonialCard = ({ name, role, quote, image }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-md">
    <div className="flex items-center space-x-4 mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">"{quote}"</p>
  </div>
);

export default Home;
