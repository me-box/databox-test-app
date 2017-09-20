import express from 'express';

const router = express.Router();
  
router.get('/channelID', function(req, res) {
		if (req.cookies && req.cookies.username){
			res.send({channelID:req.cookies.username});
			return;
		} 
		res.status(500).send({channelID:"", error:"can't find this user"});
 		//res.send({channelID:req.user.username}); 		
	}
);

module.exports = router;