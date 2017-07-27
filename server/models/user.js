import mongoose from 'mongoose';
import config from '../config';
mongoose.connect(config.mongo.url);

module.exports = mongoose.model('User',{
    username: String,
    githubId: String,
   	email: String,
    accessToken: String,
});