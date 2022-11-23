const UserCollection = require('../models/profile');

const profile = {
    create: async (req, res)=>{

        const userData = req.body;
        if(userData){

            const query = {
                name: userData.name, 
                description: userData.description, 
                mbti: userData.mbti,
                enneagram: userData.enneagram,
                variant: userData.variant,
                tritype: userData.tritype,
                socionics: userData.socionics,
                sloan: userData.sloan,
                psyche: userData.psyche,
                image: userData.image,
                UpdatedAt: new Date(),
                CreatedAt: new Date()
            }

            const save = await new UserCollection(query).save()
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
                message: "Missing parameters"
            })
        }
    }, 

    get: async (req,res)=>{

        const users = await  UserCollection.find({})
            .then((res)=>{
                console.log(res);
                return res;
            })
            .catch((err)=>{
                console.log("err: ", err)
                return false;
            })        
        if(users.length){
            res.send({
                status: 200, 
                data: users
            })
        }
        else{
            res.send({
                status: 500, 
                message: "Something went wrong"
            })
        } 
    }, 

    view: async (req, res ) =>{
        
        const userId = req.params.userid;
        const user = await  UserCollection.find({_id: userId})
            .then((res)=>{
                console.log(res);
                return res;
            })
            .catch((err)=>{
                console.log("err: ", err)
                return false;
            })     
            console.log("user: ", user); 

        if(user.length){
            res.render('profile_template', {
                profile: user[0],
            });
        }
        else{
            res.send({
                status: 500, 
                message: "Something went wrong"
            })
        } 
    }
}


module.exports = profile; 