const express = require('express');
const Post = require('../models/destinationAddress');
const router = express.Router();

////////CREATE////////////
router.post('/destination', (req, res) => {
    // console.log(typeof req.body);
    const destinationAddress = req.body;
    console.log(destinationAddress);
    const newDestinationAddress = new DestinationAddress({
        title: destinationAddress.title,
        author: postInfo.author,
        body: postInfo.body,
    });
    // console.log(newPost);
    newPost.save((err) => {
        if (err) return console.error(err);
    });


    ////////READ////////////
    router.get('/destination', (req, res) => {
        Post.find({}).sort({ _id: 'desc' }).exec((err, posts) => {
            res.send(posts);
        });
    });

    ////////UPDATE////////////
    router.put('/destination', (req, res) => {
        // console.log(req.body);
        const post = req.body.data[0];

        Post.findByIdAndUpdate(post._id, { title: post.title, body: post.body },
            { new: true }, (err, post) => {
                if (err) return console.log(err);
                console.log(post);
                // res.send(post);
            });
    });

    ////////DELETE////////////
    router.delete('/', (req, res) => {
        const posts = req.body;

        Post.remove({ _id: { $in: posts } }, (err) => {
            if (err) return console.log(err);
        }).then(() => {
            Post.find((err, posts) => {
                if (err) return console.err(err);

                res.send(posts);
            });
        });
    });


    module.exports = router;