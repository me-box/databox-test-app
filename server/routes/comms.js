import express from 'express';

const router = express.Router();
  
router.get('/channelID', function(req, res) {
		console.log("got cookies", req.cookies);

		if (req.cookies && req.cookies.username){
			res.send({channelID:req.cookies.username});
		} 
		res.status(500).send({channelID:"", error:"can't find this user"});
 		//res.send({channelID:req.user.username}); 		
	}
);

module.exports = router;