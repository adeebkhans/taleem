import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/community";

const EventView = () => {
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [hovered, setHovered] = useState(false); // For hover effect
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRes = await axios.get(`${API_BASE_URL}/events/${id}`);
        setEvent(eventRes.data);
        setLoading(false);

        // Fetch comments
        const commentsRes = await axios.get(`${API_BASE_URL}/events/${id}/comments`);
        setComments(commentsRes.data);
        setLoadingComments(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${API_BASE_URL}/events/${id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );

      // Refresh comments
      const commentsRes = await axios.get(`${API_BASE_URL}/events/${id}/comments`);
      setComments(commentsRes.data);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Add attend function
  const handleAttend = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/events/${id}/attend`,
        {},
        { withCredentials: true }
      );
      // Update event with new attendees array
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: res.data.attendees
      }));
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/community')}
            className="mb-6 flex items-center text-green-500 hover:text-green-700 transition-all duration-200 hover:-translate-x-1"
          >
            <span className="mr-2">←</span> Back to Community
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {event.title}
              </h1>

              {event.images?.length > 0 && (
                <img 
                  src={event.images[0]} 
                  alt="Event" 
                  className="w-full h-[400px] object-cover rounded-lg mb-6" 
                />
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="text-xl mr-2">📅</span>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="text-xl mr-2">📍</span>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="flex items-center justify-between mb-8 border-t border-b border-gray-100 dark:border-gray-700 py-4">
                <button
                  onClick={handleAttend}
                  className={`flex items-center gap-2 transform hover:scale-110 active:scale-95 transition-all duration-200 ${
                    event.attendees?.includes(localStorage.getItem('userId'))
                      ? 'text-green-500 hover:text-green-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span className="text-xl">
                    {event.attendees?.includes(localStorage.getItem('userId')) ? '🎉' : '✅'}
                  </span>
                  <span>
                    {event.attendees?.includes(localStorage.getItem('userId')) 
                      ? `Attending (${event.attendees?.length || 0})` 
                      : `Attend (${event.attendees?.length || 0})`}
                  </span>
                </button>

                <span className="text-gray-500 dark:text-gray-400">
                  Posted by {event.createdBy?.name} • {new Date(event.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Comments ({comments.length})
                </h2>
                
                <div className="space-y-4 mb-6">
                  {loadingComments ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 mb-2">{comment.text}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{comment.createdBy.name}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No comments yet</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Add a comment..."
                  />
                  <button 
                    onClick={handleComment}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;