import React, { useState, useEffect } from "react";
import axios from "axios";

const statesList = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", 
  "Chandigarh", "Dadra and Nagar Haveli and Daman & Diu", "Delhi", 
  "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [governmentFilter, setGovernmentFilter] = useState("");
  const [muslimSpecificFilter, setMuslimSpecificFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  // Function to fetch scholarships from the backend
  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...(governmentFilter && { government: governmentFilter }),
        ...(muslimSpecificFilter && { muslimSpecific: muslimSpecificFilter }),
        ...(stateFilter && { state: stateFilter })
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/scholarships?${params}`
      );

      setScholarships(response.data.data);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
      setError(null);
    } catch (err) {
      setError("Failed to fetch scholarships");
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [governmentFilter, muslimSpecificFilter, stateFilter, page]);

  return (
    <div className="w-full min-h-screen pt-20 px-4 flex flex-col gap-6 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Scholarships
        </h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={governmentFilter}
            onChange={(e) => { setGovernmentFilter(e.target.value); setPage(1); }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white [&>option]:text-gray-900"
          >
            <option value="">All Scholarships</option>
            <option value="true">Government</option>
            <option value="false">Private</option>
          </select>

          <select
            value={muslimSpecificFilter}
            onChange={(e) => { setMuslimSpecificFilter(e.target.value); setPage(1); }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white [&>option]:text-gray-900"
          >
            <option value="">All Communities</option>
            <option value="true">Muslim-Specific</option>
            <option value="false">General</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => { setStateFilter(e.target.value); setPage(1); }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white [&>option]:text-gray-900"
          >
            <option value="">All States</option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Scholarships Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white border border-white/10 rounded-lg">
            <thead>
              <tr className="bg-white/10 text-blue-400">
                <th className="p-3 border border-white/10">Organization</th>
                <th className="p-3 border border-white/10">State</th>
                <th className="p-3 border border-white/10">Muslim Specific</th>
                <th className="p-3 border border-white/10">Scheme</th>
                <th className="p-3 border border-white/10">Website</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-yellow-400">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : scholarships.length > 0 ? (
                scholarships.map((scholarship, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="p-3 border border-white/10">
                      {scholarship.Organization}
                    </td>
                    <td className="p-3 border border-white/10">
                      {scholarship.State}
                    </td>
                    <td className="p-3 border border-white/10">
                      {scholarship.MuslimSpecific === "Yes" ? "Yes" : "No"}
                    </td>
                    <td className="p-3 border border-white/10">
                      {scholarship.Scheme || "N/A"}
                    </td>
                    <td className="p-3 border border-white/10">
                      {scholarship.Website ? (
                        <a
                          href={scholarship.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Visit
                        </a>
                      ) : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    No scholarships found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
