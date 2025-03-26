import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; // Import logout action
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  // Get user from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => setIsOpen(false), [location]);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-white dark:bg-gray-900"
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
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
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile or Login Button */}
          <ProfileDropdown user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="py-3 space-y-1">
          <NavLink to="/" label="Home" mobile />
          <NavLink to="/scholarships" label="Scholarships 🎓" mobile />
          <NavLink to="/opportunities" label="Opportunities 🚀" mobile />
          <NavLink to="/education-in-islam" label="Education in Islam 🕌" mobile />
          <NavLink to="/institutes" label="Institutes 🏫" mobile />
          <NavLink to="/learning" label="Learning Hub 📚" mobile />
          <NavLink to="/ai-chatbot" label="AI Chatbot 🤖" mobile />
          <NavLink to="/community" label="Community 👥" mobile />
        </div>
      </div>
    </nav>
  );
};

// Navigation Link Component
const NavLink = ({ to, label, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`${
      mobile
        ? "block px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        : "px-3 py-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
    } ${isActive ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""}`}>
      {label}
    </Link>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ user, isAuthenticated, onLogout }) => {
  if (!isAuthenticated) {
    return (
      <Link
        to="/auth"
        className="px-3 py-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
        <img
          src={user?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-700 dark:text-white font-medium hidden sm:block">
          {user?.name || "User"}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
