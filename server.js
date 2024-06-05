import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const app=express()
app.use(express.json())

const feed = [
    {
        role:"admin",
        text:"hello admin"
    },

    {
        role:"user",
        text:"hello user"
    }
]

app.listen(3000,()=>console.log("App Listening at 3000"))

app.post('/login',(req,res)=>{
    const user = {
        email:req.body.email,
        role:req.body.role
    }
    const accessToken = jwt.sign(user,'eb1fae772f9b301da004f83b9684abcd9b914f59884d4b9f719c9ae525ddd3fcab9ae5e61e87fef77f0f2a11c2608eb479ddc0d086cf3be2e293dd24ad83e54')
    return res.send(accessToken)
})

app.get('/profile',authenticateToken(['admin','user']),(req,res)=>{
    console.log("reached")
    return res.status(200).json(feed.filter(post=>post.role===req.user.role))
})

function authenticateToken(requiredRole) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.status(401).send({ message: "No authorization" });

        jwt.verify(token, 'eb1fae772f9b301da004f83b9684abcd9b914f59884d4b9f719c9ae525ddd3fcab9ae5e61e87fef77f0f2a11c2608eb479ddc0d086cf3be2e293dd24ad83e54', 
        (err, user) => {
            if (err) return res.status(403).send(err);

            if (user) {
                const role = user.role;
                if (!requiredRole.includes(role)) {
                    return res.status(403).json({ message: "You don't have access for this webpage, contact admin" });
                } else {
                    req.user = user;
                    next();
                }
            }
        });
    }
}


