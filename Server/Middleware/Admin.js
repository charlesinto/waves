
const Admin = (req, res, next)=> {
    return req.user.role === 0 ? res.status(406).send({message:'Unauthorized user, contact admin'})
                                 : next()
}

export { Admin };