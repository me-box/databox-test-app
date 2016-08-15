module.exports = {
	
	secret: 'asdaksgdsahgdhsagsfddafdsdqhjsgdjhsg',
	
	github: {
		CLIENT_ID: 'd09ad0a19d1c72a67136',
    	CLIENT_SECRET: 'fa821c9abbedda742d366cdfff8ad3a00a694b65',
		CALLBACK: "http://databoxtest.upintheclouds.org/auth/github/callback",
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