const router = require("express").Router();
const Post = require("../model/Post");

router.get("/", (req, res) => {
  Post.find()
    .sort({ createdAt: "desc" })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/create", (req, res) => {
  const post = new Post({
    body: req.body.body,
    userId: req.body.userId,
    name: req.body.name,
  });
  post
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/comment/:id", (req, res) => {
  const id = req.params.id;
  const commentsObj = {
    name: req.body.name,
    userId: req.body.userId,
    comment: req.body.comment,
  };
  Post.findOneAndUpdate(
    { _id: id },
    { $push: { comments: commentsObj } },
    { useFindAndModify: false }
  )
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/like/:id", (req, res) => {
  const id = req.params.id;
  const updateLike = (id, userId) => {
    Post.findOneAndUpdate(
      { _id: id },
      { $push: { likes: userId } },
      { useFindAndModify: false }
    )
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  };

  Post.findOne({ _id: id, dislikes: req.body.userId })
    .then((result) => {
      result
        ? Post.updateOne(
            { _id: id },
            { $pullAll: { dislikes: [req.body.userId] } }
          )
            .then((result) => updateLike(id, req.body.userId))
            .catch((err) => res.send(err))
        : updateLike(id, req.body.userId);
    })
    .catch((err) => res.send(err));
});

router.post("/dislike/:id", (req, res) => {
  const id = req.params.id;
  const updateDislike = (id, userId) => {
    Post.findOneAndUpdate(
      { _id: id },
      { $push: { dislikes: userId } },
      { useFindAndModify: false }
    )
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  };

  Post.findOne({ _id: id, likes: req.body.userId })
    .then((result) => {
      result
        ? Post.updateOne(
            { _id: id },
            { $pullAll: { likes: [req.body.userId] } }
          )
            .then((result) => updateDislike(id, req.body.userId))
            .catch((err) => res.send(err))
        : updateDislike(id, req.body.userId);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
