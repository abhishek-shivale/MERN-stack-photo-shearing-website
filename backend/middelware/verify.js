import jwt from 'jsonwebtoken'
export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
    const verify = jwt.verify(authHeader,'secret',(err)=>{
       if(err){
        res.json({err})
       }else{
        next()
       }
    })
}else{
    res.json({msg:'try to login again'})
}
} 