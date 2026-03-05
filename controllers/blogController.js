import Blog from "../models/blog.js";

export const addBlog = async(req, res)=>{
try{
    const {title, category, description} = req.body
    if(!title){
        console.log("title is required");
    }else{
        const newBlog = new Blog({
            title, category, description, user: req.userDetails.userId,
        })
        const saveBlog = await newBlog.save()
        res.status(200).json({
            status: true,
            message: "success",
            data: saveBlog
        })
    }
}catch(err){
    console.log(err);
    
}
}

// getBlog
export const getBlog = async (req, res) => {
  try {
    const { title, category } = req.query;

    const filter= {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const listBlog = await Blog.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Blogs fetched successfully",
      data: listBlog,
    });
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      console.log("id is required");
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      console.log("blog not found");
    } else {
      res.status(200).json({
        status: false,
        message: "blog fetched successfully",
        data: blog,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id, title, description, category } = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Blog ID is required",
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "blog ID is required" });
    }
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res
        .status(404)
        .json({ status: false, message: "blog not found" });
    }else{
        res.status(200).json({
            status: true,
            message: "deleted",
            data: deleteBlog
        })
    }
  } catch (err) {
    console.log(err);
  }
};
