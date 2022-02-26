const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        userId: String,
        name: String,
        comment: String,
      },
      {
        timestamps: true,
      },
    ],
    likes: [String],
    dislikes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
