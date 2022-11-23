module.exports = (app) => {
    const profile = require("./profile.route");
    const post = require("./post.route");


    app.use("/api/profile", profile); 
    app.use("/api/post", post)
 }