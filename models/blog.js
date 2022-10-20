const express = require("express");

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// model // variable should be singular of collection name in mongoDB
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
