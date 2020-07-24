const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');

const getAll = (req, res) =>{
    User.find({}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then((response)=>{
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            //res.sendStatus(500);
            res.status(500).send(err);
        })
    }else{
        res.sendStatus(500);
    }
};
const updateUser = (req, res) => {
    //res.send("Actualizar usuario");
    const idUser = req.params.id;
    const user = User.findByIdAndUpdate({_id : idUser},{$set:{
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    }}).then((response)=>{
        res.status(200).send("Actualizado!");
    })
    .catch((err)=>{
        res.sendStatus(500);
    })  
};

const deleteUser = (req, res) => {
    // res.send("Borrar usuario");
    const idUser = req.params.id;
    User.findByIdAndDelete({_id : idUser})
    .then((response)=>{
        res.status(200).send("Eliminado!");
    })
    .catch((err)=>{
        res.sendStatus(500);
    }) 
 };
 
const countTweets = (req, res) => {
    const id = req.params.id;    
      Tweet.count({ user: id })
      .then((response)=>{
        res.json("Número de tweets: " + response);
      })
      .catch((err)=>{
        res.sendStatus(500);
     })
};
const listTweets = (req, res) => {
    const id = req.params.id;
    Tweet.find({_id : id}, ["user", "content"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};

module.exports = {getAll, getUser, newUser, updateUser, deleteUser, countTweets, listTweets};