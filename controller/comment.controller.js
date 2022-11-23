const postCollection = require('../models/post');

const action = {

    //save post on schema
    post: async (req, res ) =>{
        const postData = req.body;
        if(postData){
            const save = await new postCollection({
                title: postData.title, 
                description: postData.description,
                postid: postData.postid,
                commentor: postData.commentor,
                personality: postData.personality, 
                UpdatedAt: new Date(), 
                CreatedAt: new Date()
            }).save()
                    .then((res)=>{
                        return true; 
                    })
                    .catch((err) =>{
                        console.log("err: ", err)
                        return false;
                    })
            console.log("save: ", save);

            if(save){
                res.send({
                    status: 200, 
                    message: "Successfuly saved"
                })
            }
            else{
                res.send({
                    status: 500, 
                    message: "Something went wrong"
                })
            }

        }
        else{
            res.send({
                status: 400, 
                message: "Invalid parameter"
            })
        }
    }, 
    filter: async (req, res)=>{

        const comments = await  postCollection.find({})
            .then((res)=>{
                console.log(res);
                return res;
            })
            .catch((err)=>{
                console.log("err: ", err)
                return false;
            })        
        if(comments.length){

            let temp = []; 
            //do filter search 
            (req.query.filter == 'all') ? temp = comments : false;
            for(let a=0; a<comments.length; a++){
                if(req.query.filter == comments[a].personality){
                    temp.push(comments[a]);
                }
            }

            //do sort search recent || best
            if (typeof req.query.sort != "undefined") {

                if(req.query.sort == 'best'){
                    temp.sort((a, b) => parseFloat(b.likes.length) - parseFloat(a.likes.length));
                }
                else if (req.query.sort == 'recent'){
                    temp.sort((a, b) => parseFloat(new Date(b.UpdatedAt)) - parseFloat(new Date(a.UpdatedAt)));
                }
            }

            res.send({
                status: 200, 
                data: temp
            })
        }
        else{
            res.send({
                status: 500, 
                message: "Something went wrong"
            })
        } 
    }, 
    likeUnlike: async (req, res)=>{
       console.log(req.body);
        const likes =  await postCollection.updateMany(
                    {_id: req.body.comment_id},
                    [{
                        $set: {
                        likes: {
                            $cond: [
                            { $in: [req.body.liker_id, "$likes"] },
                            {
                                $filter: {
                                input: "$likes",
                                cond: { $ne: ["$$this", req.body.liker_id] }
                                }
                            },
                            { $concatArrays: ["$likes", [req.body.liker_id]] }
                            ]
                        }
                        }
                    }]
                )
        if(likes.modifiedCount){
            res.send({
                status: 200, 
            })
        }
        else{
            res.send({
                status: 500, 
                message: "Something went wrong"
            })
        }
    }
}


module.exports = action;