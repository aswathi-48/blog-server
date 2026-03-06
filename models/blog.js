import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    image: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
