import { useState, useEffect } from 'react';
import axios from 'axios';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman & Diu", "Delhi",
  "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const courses = ["School", "Engineering & Technology", "Medicine", "Management", "Science"];
const communities = ['Christian', 'Sikh', 'Muslim', 'Jain', 'Buddhist', 'Parsi'];

const Institutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState('Muslim');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchInstitutes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 50,
        ...(selectedState && { state: selectedState }),
        ...(selectedCourse && { course: selectedCourse })
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/institutes/${selectedCommunity}?${params}`
      );

      setInstitutes(response.data.data);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
      setError(null);
    } catch (err) {
      setError('Failed to fetch institutes');
      setInstitutes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, [selectedCommunity, selectedState, selectedCourse, page]);

  return (
    <div className="w-full min-h-screen pt-20 px-4 flex flex-col gap-6 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Institutes Directory</h1>

        {/* Universities Section */}
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Universities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative h-80 rounded-xl shadow overflow-hidden border border-white/10">
            <img 
              src="https://static.theprint.in/wp-content/uploads/2022/03/Untitled-design-1-8-696x392.jpg?compress=true&quality=80&w=800&dpr=1.3" 
              alt="Jamia Millia Islamia" 
              className="absolute w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="text-xl font-bold text-shadow-glow animate-pulse-subtle">Jamia Millia Islamia</h3>
              <p className="text-shadow-sm">New Delhi, India</p>
            </div>
          </div>
          <div className="relative h-80 rounded-xl shadow overflow-hidden border border-white/10">
            <img 
              src="https://educationpost.in/_next/image?url=https%3A%2F%2Fapi.educationpost.in%2Fs3-images%2F1731410075058-file-photo-of-aligarh-muslim-university-082312327-16x9_0%20(1).webp&w=1920&q=75" 
              alt="Aligarh Muslim University" 
              className="absolute w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="text-xl font-bold text-shadow-glow animate-pulse-subtle">Aligarh Muslim University</h3>
              <p className="text-shadow-sm">Aligarh, Uttar Pradesh, India</p>
              <p className="text-red-300 text-sm mt-1 text-shadow-sm">* Minority status is currently under court consideration.</p>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select 
            value={selectedCommunity} 
            onChange={(e) => { setSelectedCommunity(e.target.value); setPage(1); }} 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
            {communities.map(community => <option key={community} value={community}>{community}</option>)}
          </select>

          <select 
            value={selectedState} 
            onChange={(e) => { setSelectedState(e.target.value); setPage(1); }} 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
            <option value="">All States</option>
            {states.map(state => <option key={state} value={state}>{state}</option>)}
          </select>

          <select 
            value={selectedCourse} 
            onChange={(e) => { setSelectedCourse(e.target.value); setPage(1); }} 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
            <option value="">All Courses</option>
            {courses.map(course => <option key={course} value={course}>{course}</option>)}
          </select>
        </div>

        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}

        {/* Institutes Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="border border-white/10 p-2 text-blue-400">Name</th>
                <th className="border border-white/10 p-2 text-blue-400">State</th>
                <th className="border border-white/10 p-2 text-blue-400">Date of Issue</th>
                <th className="border border-white/10 p-2 text-blue-400">Community</th>
              </tr>
            </thead>
            <tbody>
              {institutes.map((inst, index) => (
                <tr key={index} className="hover:bg-white/5">
                  <td className="border border-white/10 p-2 text-gray-200">{inst.name}</td>
                  <td className="border border-white/10 p-2 text-gray-200">{inst.state}</td>
                  <td className="border border-white/10 p-2 text-gray-200">{inst.date_of_issue}</td>
                  <td className="border border-white/10 p-2 text-gray-200">{inst.community}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1} 
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <span className="px-4 py-2 text-white">Page {page} of {totalPages}</span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
            disabled={page === totalPages} 
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Institutes;
