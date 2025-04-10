import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/community";

// Configure Axios to always send cookies
axios.defaults.withCredentials = true;

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "", images: [] });
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", location: "", images: [] });
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const navigate = useNavigate();

  // Fetch Posts & Events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`${API_BASE_URL}/posts`, { withCredentials: true });
        const eventRes = await axios.get(`${API_BASE_URL}/events`, { withCredentials: true });

        setPosts(Array.isArray(postRes.data) ? postRes.data : []);
        setEvents(Array.isArray(eventRes.data) ? eventRes.data : []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Create New Post
  const createPost = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/posts`, newPost, { withCredentials: true });
      setPosts([res.data, ...posts]);
      setNewPost({ title: "", description: "", images: [] });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Create New Event
  const createEvent = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/events`, newEvent, { withCredentials: true });
      setEvents([res.data, ...events]);
      setNewEvent({ title: "", description: "", date: "", location: "", images: [] });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Handle Like for Post
  const likePost = async (postId) => {
    try {
      await axios.post(`${API_BASE_URL}/posts/${postId}/like`, {}, { withCredentials: true });
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle Attend Event
  const attendEvent = async (eventId) => {
    try {
      await axios.post(`${API_BASE_URL}/events/${eventId}/attend`, {}, { withCredentials: true });
      setEvents(events.map(event => event._id === eventId ? { ...event, attendees: event.attendees + 1 } : event));
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  // Add this new function to fetch comments
  const fetchComments = async (id, type) => {
    setLoadingComments(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/${type}s/${id}/comments`,
        { withCredentials: true }
      );
      setComments(res.data);
    } catch (error) {
      console.error(`Error fetching ${type} comments:`, error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Update the post selection handler
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setSelectedEvent(null);
    fetchComments(post._id, 'post');
    navigate(`/community/post/${post._id}`);
  };

  // Update the event selection handler
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedPost(null);
    fetchComments(event._id, 'event');
    navigate(`/community/event/${event._id}`);
  };

  // Update the comment handlers to refresh comments after posting
  const commentOnPost = async (postId) => {
    if (!newComment.trim()) return;
    
    try {
      await axios.post(
        `${API_BASE_URL}/posts/${postId}/comment`,
        { text: newComment },
        { withCredentials: true }
      );
      
      setNewComment("");
      // Refresh comments
      await fetchComments(postId, 'post');
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const commentOnEvent = async (eventId) => {
    if (!newComment.trim()) return;
    
    try {
      await axios.post(
        `${API_BASE_URL}/events/${eventId}/comment`,
        { text: newComment },
        { withCredentials: true }
      );
      
      setNewComment("");
      // Refresh comments
      await fetchComments(eventId, 'event');
    } catch (error) {
      console.error("Error commenting on event:", error);
    }
  };

  // Update the back handler
  const handleBack = () => {
    setSelectedPost(null);
    setSelectedEvent(null);
    setNewComment("");
    setComments([]);
  };

  const handleAddPostClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    } else {
      setShowCreatePost(!showCreatePost);
    }
  };

  const handleAddEventClick = () => {
    const token = localStorage.getItem('token'); // Check if user is logged in
    if (!token) {
      navigate('/auth'); // Redirect to login if not logged in
    } else {
      setIsAddingNewEvent(!isAddingNewEvent); // Toggle the form if logged in
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/posts`,
        { ...newPost },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowCreatePost(false);
      setNewPost({ title: "", description: "", images: [] });
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/community/events`,
        { ...newEvent },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );

      setIsAddingNewEvent(false);
      setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset new event fields
      fetchEvents(); // Refresh events
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  if (selectedPost) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleBack}
            className="mb-4 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <span className="mr-2">←</span> Back to Community
          </button>
          <div className="border p-6 rounded-lg shadow-lg bg-white">
            <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
            <p className="mb-4 text-gray-700">{selectedPost.description}</p>
            {selectedPost.images?.length > 0 && (
              <img src={selectedPost.images[0]} alt="Post" className="w-full max-h-96 object-cover rounded-lg mb-4" />
            )}
            <button className="text-blue-500 mb-6 hover:text-blue-700 transition-colors" onClick={() => likePost(selectedPost._id)}>
              👍 {selectedPost.likes?.length || 0}
            </button>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <div className="mb-4">
                {loadingComments ? (
                  <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment._id} className="bg-gray-50 p-4 rounded-lg mb-2">
                      <p>{comment.text}</p>
                      <small className="text-gray-500">
                        By: {comment.createdBy.name} • 
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border p-2 flex-grow rounded"
                  placeholder="Add a comment..."
                />
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => commentOnPost(selectedPost._id)}>
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedEvent) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleBack}
            className="mb-4 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <span className="mr-2">←</span> Back to Community
          </button>
          <div className="border p-6 rounded-lg shadow-lg bg-white">
            <h1 className="text-3xl font-bold mb-4">{selectedEvent.title}</h1>
            <p className="mb-4 text-gray-700">{selectedEvent.description}</p>
            <div className="mb-4">
              <p><strong>📅 Date:</strong> {new Date(selectedEvent.date).toDateString()}</p>
              <p><strong>📍 Location:</strong> {selectedEvent.location}</p>
            </div>
            {selectedEvent.images?.length > 0 && (
              <img src={selectedEvent.images[0]} alt="Event" className="w-full max-h-96 object-cover rounded-lg mb-4" />
            )}
            <button className="text-green-500 mb-6 hover:text-green-700 transition-colors" onClick={() => attendEvent(selectedEvent._id)}>
              ✅ Attend ({selectedEvent.attendees?.length || 0})
            </button>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <div className="mb-4">
                {loadingComments ? (
                  <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment._id} className="bg-gray-50 p-4 rounded-lg mb-2">
                      <p>{comment.text}</p>
                      <small className="text-gray-500">
                        By: {comment.createdBy.name} • 
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border p-2 flex-grow rounded"
                  placeholder="Add a comment..."
                />
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  onClick={() => commentOnEvent(selectedEvent._id)}>
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Both Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Community 👥
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleAddPostClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              {showCreatePost ? 'Cancel' : '+ New Post'}
            </button>
            <button
              onClick={handleAddEventClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              {isAddingNewEvent ? 'Cancel' : '+ New Event'}
            </button>
          </div>
        </div>

        {/* Create Forms */}
        {showCreatePost && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                className="w-full p-2 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPost.images}
                onChange={(e) => setNewPost({ ...newPost, images: [e.target.value] })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                Post
              </button>
            </form>
          </div>
        )}

        {isAddingNewEvent && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Event</h2>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full p-2 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Submit Event
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Posts */}
            {posts.map(post => (
              <div 
                key={post._id} 
                onClick={() => handleSelectPost(post)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>👍 {post.likes?.length || 0} likes</span>
                    <span>💬 {post.comments?.length || 0} comments</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Events */}
            {events.map(event => (
              <div 
                key={event._id} 
                onClick={() => handleSelectEvent(event)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <p>📅 {new Date(event.date).toDateString()}</p>
                    <p>📍 {event.location}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>✅ {event.attendees?.length || 0} attending</span>
                    <span>💬 {event.comments?.length || 0} comments</span>
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

export default Community;
