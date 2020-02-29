const Clarifai=require('clarifai');
const app = new Clarifai.App({
  apiKey: "5dc3934b1fa041e388b82a3329fcdce3"
});

const handleApiCall=(req,res)=>{
app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
    res.json(data);
}
).catch(err=>res.status(400).json('enable to work with api'))
}
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries=>{
            res.json(entries[0])
        }) 
        .catch(err=>res.status(400).json('Enable to get entries'))
}
module.exports={
    handleImage,
    handleApiCall
}