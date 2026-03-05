import Blog from "../models/blog.js";

export const addBlog = async(req, res)=>{
try{
    const {title, category, description} = req.body
    if(!title){
        console.log("title is required");
    }else{
        const newBlog = new Blog({
            title, category, description
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

// export const getBlog  = async (req,res)=>{
//     try{
//         const listBlog = await Blog.find()
//         res.status(200).json({
//             status: true,
//             message: "success",
//             data: listBlog
//         })
//     }catch(err){
//         console.log(err);
        
//     }
// }


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
    //   .populate("user", "name email")
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
