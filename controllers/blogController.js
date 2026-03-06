import Blog from "../models/blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body

    // Check if file exists in request (multer)
    // IMPORTANT: Path should be what's served by static middleware
    // If static middleware serves 'uploads' at '/uploads', 
    // and blog.image is 'uploads/file.png', URL is 'host/uploads/file.png'
    let imagePath = undefined;
    if (req.file) {
      // We save it as 'uploads/filename' because index.js serves the 'uploads' folder content at '/uploads' prefix
      // Wait, NO. If index.js does: app.use('/uploads', static('uploads'))
      // Then localhost:3000/uploads/file.png looks for 'uploads/file.png' on disk.
      // So we save just 'uploads/' + filename.
      imagePath = `uploads/${req.file.filename}`;
    }

    if (!title || !description || !category) {
      return res.status(400).json({
        status: false,
        success: false,
        message: "All fields are required"
      })
    } else {
      const newBlog = new Blog({
        title,
        category,
        description,
        image: imagePath,
        user: req.userDetails.userId,
      })
      const saveBlog = await newBlog.save()
      res.status(200).json({
        status: true,
        success: true,
        message: "Blog created successfully",
        data: saveBlog,
        blog: saveBlog
      })
    }
  } catch (err) {
    console.error("Add Blog Error:", err);
    res.status(500).json({ status: false, success: false, message: "Internal server error" })
  }
}

// ... rest of the file stays same logic but I will rewrite to ensure 'image' field consistency
export const getBlog = async (req, res) => {
  try {
    const { title, category } = req.query;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };

    const listBlog = await Blog.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      success: true,
      message: "Blogs fetched successfully",
      blogs: listBlog,
      data: listBlog,
    });
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ status: false, success: false, message: "Server error" });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) return res.status(400).json({ status: false, success: false, message: "id is required" });

    const blog = await Blog.findById(id).populate("user", "name email");
    if (!blog) return res.status(404).json({ status: false, success: false, message: "blog not found" });

    res.status(200).json({
      status: true,
      success: true,
      message: "blog fetched successfully",
      blog: blog,
      data: blog,
    });
  } catch (err) {
    console.error("Get Single Blog Error:", err);
    res.status(500).json({ status: false, success: false, message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.query.id || req.body.id;
    const { title, description, category } = req.body;

    if (!id) return res.status(400).json({ status: false, success: false, message: "Blog ID is required" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: false, success: false, message: "Blog not found" });

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (req.file) updateData.image = `uploads/${req.file.filename}`;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
      blog: updatedBlog
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ status: false, success: false, message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) return res.status(400).json({ status: false, success: false, message: "blog ID is required" });

    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) return res.status(404).json({ status: false, success: false, message: "blog not found" });

    res.status(200).json({
      status: true,
      success: true,
      message: "deleted",
      data: deleteBlog
    })
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ status: false, success: false, message: "Internal server error" });
  }
};
