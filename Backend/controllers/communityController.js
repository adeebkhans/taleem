const Post = require("../schema/postSchema");
const Event = require("../schema/eventSchema");
const Comment = require("../schema/commentSchema");

// 📌 Create a New Post
exports.createPost = async (req, res) => {
    try {
    //   console.log("User making post:", req.user); // Debugging line
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: No user data found" });
      }
  
      const { title, description, imageUrl } = req.body;
  
      const newPost = new Post({
        title,
        description,
        imageUrl,
        createdBy: req.user.id, 
      });
  
      await newPost.save();
      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error("Post Creation Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// 📌 Get All Posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy comments");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

// 📌 Like a Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const userIndex = post.likes.indexOf(req.user.id);
        if (userIndex === -1) post.likes.push(req.user.id);
        else post.likes.splice(userIndex, 1); // Unlike if already liked

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error });
    }
};

// 📌 Comment on a Post
exports.commentOnPost = async (req, res) => {
    try {
        const comment = await Comment.create({ ...req.body, createdBy: req.user.id, postId: req.params.id });
        await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error commenting", error });
    }
};

// 📌 Create an Event
exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

// 📌 Attend an Event
exports.attendEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const userIndex = event.attendees.indexOf(req.user.id);
        if (userIndex === -1) event.attendees.push(req.user.id);
        else event.attendees.splice(userIndex, 1); // Unattend if already attending

        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Error attending event", error });
    }
};


// 📌 Comment on an Event
exports.commentOnEvent = async (req, res) => {
    try {
        const comment = await Comment.create({ ...req.body, createdBy: req.user.id, eventId: req.params.id });
        await Event.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error commenting", error });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy comments");
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

// 📌 Get Event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("createdBy comments");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

// 📌 Delete an Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Optionally remove associated comments
        await Comment.deleteMany({ eventId: req.params.id });
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};

// 📌 Get Post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("createdBy comments");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
};

// 📌 Update a Post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
};

// 📌 Delete a Post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Optionally remove associated comments
        await Comment.deleteMany({ postId: req.params.id });
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
};

// 📌 Get Comments by Post ID
exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id })
            .populate('createdBy', 'name')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

// 📌 Get Comments by Event ID
exports.getCommentsByEventId = async (req, res) => {
    try {
        const comments = await Comment.find({ eventId: req.params.id })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};
