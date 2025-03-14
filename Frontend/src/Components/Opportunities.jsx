import { useState, useEffect } from 'react';
import axios from 'axios';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    deadline: '',
    type: 'internship',
    organization: '',
    link: '',
    hasReferral: false,
    referralEmail: '',
    referralFormLink: '',
    postedAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/opportunities');
      setOpportunities(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/opportunities', {
        ...newOpportunity,
        postedAt: new Date().toISOString()
      });
      setIsAddingNew(false);
      setNewOpportunity({
        title: '',
        description: '',
        deadline: '',
        type: 'internship',
        organization: '',
        link: '',
        hasReferral: false,
        referralEmail: '',
        referralFormLink: '',
        postedAt: new Date().toISOString()
      });
      fetchOpportunities();
    } catch (error) {
      console.error('Error adding opportunity:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Opportunities
          </h1>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            {isAddingNew ? 'Cancel' : '+ Add Opportunity'}
          </button>
        </div>

        {/* Add New Opportunity Form */}
        {isAddingNew && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Add New Opportunity
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newOpportunity.title}
                  onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={newOpportunity.organization}
                  onChange={(e) => setNewOpportunity({...newOpportunity, organization: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <select
                  value={newOpportunity.type}
                  onChange={(e) => setNewOpportunity({...newOpportunity, type: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="internship">Internship</option>
                  <option value="job">Job</option>
                  <option value="research">Research</option>
                  <option value="volunteer">Volunteer</option>
                </select>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={newOpportunity.deadline}
                    onChange={(e) => setNewOpportunity({...newOpportunity, deadline: e.target.value})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newOpportunity.hasReferral}
                      onChange={(e) => setNewOpportunity({...newOpportunity, hasReferral: e.target.checked})}
                      className="rounded text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Referral Available</span>
                  </label>
                </div>
                {newOpportunity.hasReferral && (
                  <div className="col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Referral Contact Email
                        <span className="text-xs text-gray-500 ml-2">
                          (Direct messaging feature coming soon!)
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email for referral requests"
                        value={newOpportunity.referralEmail}
                        onChange={(e) => setNewOpportunity({...newOpportunity, referralEmail: e.target.value})}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required={newOpportunity.hasReferral}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Referral Form Link (Optional)
                        <span className="text-xs text-gray-500 ml-2">
                          (Google Form or similar)
                        </span>
                      </label>
                      <input
                        type="url"
                        placeholder="Enter Google Form link for referral requests"
                        value={newOpportunity.referralFormLink}
                        onChange={(e) => setNewOpportunity({...newOpportunity, referralFormLink: e.target.value})}
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                )}
                <input
                  type="url"
                  placeholder="Application Link"
                  value={newOpportunity.link}
                  onChange={(e) => setNewOpportunity({...newOpportunity, link: e.target.value})}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                className="w-full p-2 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Submit Opportunity
              </button>
            </form>
          </div>
        )}

        {/* Opportunities List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {opportunity.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {opportunity.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {opportunity.organization}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Posted: {new Date(opportunity.postedAt).toLocaleDateString()}
                      </span>
                      <span className="text-red-600 dark:text-red-400">
                        Expires: {new Date(opportunity.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {opportunity.hasReferral && (
                      <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-green-700 dark:text-green-400 text-sm">
                          ✨ Referral Available
                          {opportunity.referralFormLink ? (
                            <a 
                              href={opportunity.referralFormLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Fill Referral Form
                            </a>
                          ) : (
                            <a 
                              href={`mailto:${opportunity.referralEmail}?subject=Referral Request: ${opportunity.title}`}
                              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Request Referral
                            </a>
                          )}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      <a
                        href={opportunity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities; 