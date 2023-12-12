const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next)=>{

    try {
        //extract token 
        //split token
        //verify token
        //set req.userId = user.id
        let token = req.headers.authorization;
        if(token){  //if we have token or if someone sends token
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        }
        else{       //if we don't have token or if someone doesn't sends token
            return res.status(401).json({message : "Unautorized User point 1"});
        }

        next();
    } catch (error) {
        console.log(error); 
        res.status(401).json({message : "Unautorized User point 2"});

    }
}
module.exports = auth;
