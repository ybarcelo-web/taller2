const Tweet = require('./../../models/tweets');
const getTweets = (req, res) =>{
    Tweet
    .find({})
    .populate('user', 'username')
    .populate('comments.user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getTweet = (req, res) => {
    const id = req.params.id;
    Tweet
    .find({_id : id})
    .populate('user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newTweet = (req, res) => {
    const tweet = {
        content: req.body.content,
        user: req.body.user
    };
    if(tweet.content && tweet.user){
        const object = new Tweet(tweet);
        object.save()
        .then((response)=>{
            res.status(201).send(response);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};
const deleteTweet = (req, res) => {
    // res.send("Borrar usuario");
    const idTw = req.params.id;
    Tweet.findByIdAndDelete({_id : idTw})
    .then((response)=>{
        res.status(200).send("Eliminado!");
    })
    .catch((err)=>{
        res.status(500).send(err);
    }) 
 };
const newComment = (req, res) => {
    const tweet = req.body.tweet;
    const comment = {
        comment: req.body.comment,
        user: req.body.user
    };
    Tweet.updateOne({_id :tweet}, {$addToSet: {comments : comment}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
};
const getLastsTweets = (req, res) => {
    const limite = parseInt(req.params.nf);
    Tweet.find().sort({createdAt: 'desc'}).limit(limite).exec()//.limit(count).exec()
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
};
const getCommentsCount = (req, res) => {
    const id = req.params.id;
    Tweet.find({_id: id},{"comments": 1})
    //Tweet.aggregate({$project: { NumberOfElements: { $size:"comments" }}})
    .then((response)=>{
        res.status(200).send(response.comments);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
};
const usuariosMasTweets = (req, res) => {
	
	const cantidad = parseInt(req.params.count); 
	
	if(cantidad > 0){
		Tweet.aggregate(
			[
				{
					$group: {
						_id : "$user",
						count: { $sum: 1 }
					}
				},
				{ 
					$sort: { 
						count: -1 
					} 
				},
				{ $limit : cantidad }
			],function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.json(result);
				}
			}
		);
	}else{
		res.status(500).send('Coloque un limite valido');
	}
		
};
module.exports = {getTweets, getTweet, newTweet, deleteTweet, newComment, getLastsTweets, getCommentsCount, usuariosMasTweets};