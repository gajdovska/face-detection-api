const bcrypt = require("bcrypt");
const saltRounds = 10;
const handleRegister=(req,res,db,bcrypt)=>{
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json("incorrect form submission")
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
              })
              .then(user => {
                res.json(
                  user[0]
                ); /*go vrakja samo prviot objekt deka toa ni e samo 
    eden vnesen user preku register odedenas */
              })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
    .catch(err=>res.json(err)); // kje morame ovaka
}
module.exports={
    handleRegister:handleRegister
}