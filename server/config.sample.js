module.exports = {
	
	secret: 'alongsecret',
	
	github: {
		CLIENT_ID: '[your apps github client id]',
    		CLIENT_SECRET: '[your apps client secret]'
		CALLBACK: "http://[approot]/auth/github/callback",
		API: "https://api.github.com",
		RAW_URL: "https://raw.githubusercontent.com",
		URL: "https://github.com",
	},
	
   	 mongo: {
    		url : 'mongodb://localhost/testpassport',
    	},
    
    	redis: {
   		 host: '127.0.0.1',
        	 port: 6379,
    	}
}