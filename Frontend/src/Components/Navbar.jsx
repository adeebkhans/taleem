import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md' : 'bg-white dark:bg-gray-900'
    } ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Taleem
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/scholarships" label="Scholarships 🎓" />
            <NavLink to="/opportunities" label="Opportunities 🚀" />
            <NavLink to="/education-in-islam" label="Education in Islam 🕌" />
            <NavLink to="/institutes" label="Institutes 🏫" />
            <NavLink to="/learning" label="Learning Hub 📚" />
            <NavLink to="/ai-chatbot" label="AI Chatbot 🤖" />
            <NavLink to="/community" label="Community 👥" />
            <NavLink to="/contribute" label="Contribute ❤️" />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <ProfileDropdown />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-3 space-y-1">
            <NavLink to="/" label="Home" mobile />
            <NavLink to="/scholarships" label="Scholarships 🎓" mobile />
            <NavLink to="/opportunities" label="Opportunities 🚀" mobile />
            <NavLink to="/islamic-education" label="Education in Islam 🕌" mobile />
            <NavLink to="/institutes" label="Institutes 🏫" mobile />
            <NavLink to="/learning" label="Learning Hub 📚" mobile />
            <NavLink to="/ai-chatbot" label="AI Chatbot 🤖" mobile />
            <NavLink to="/community" label="Community 👥" mobile />
            <NavLink to="/contribute" label="Contribute ❤️" mobile />
          </div>
        </div>
      </div>
    </nav>
  );
};

// eslint-disable-next-line react/prop-types
const NavLink = ({ to, label, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`${
        mobile 
          ? "block px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300" 
          : "px-3 py-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
      } ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}
    >
      {label}
    </Link>
  );
};

const ProfileDropdown = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
        <img 
          src="https://avatars.githubusercontent.com/u/179551932?s=400&u=adf456cc2b4759ce5500e9a048e5a21f18c7cef7&v=4" 
          alt="Profile" 
          className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
        />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="py-2">
          <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            Settings
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
