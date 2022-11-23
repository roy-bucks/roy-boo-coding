const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {type: String}, 
    description: {type: String}, 
    mbti: {type: String},
    enneagram: {type: String},
    variant: {type: String},
    tritype: {type: Number},
    socionics: {type: String},
    sloan: {type: String},
    psyche: {type: String},
    image: {type: String},
    UpdatedAt: {type: Date},
    CreatedAt: {type: Date}
});

module.exports = model('UserCollection', userSchema);
