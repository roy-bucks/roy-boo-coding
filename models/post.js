const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    title: {type: String}, 
    description: {type: String}, 
    postid: {type: String},
    commentor: {type: String},
    personality: {type: String},
    likes: {type: Array},
    UpdatedAt: {type: Date},
    CreatedAt: {type: Date}
});

module.exports = model('postCollection', userSchema);
