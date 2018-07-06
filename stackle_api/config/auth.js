
authConfig =  {

	//TODO change client ID and secret key and callback url in production Environment
	clientId: 'c23afb23347c52f6c3e5',
	secret: '6bee728b708beebdf52a1894242efaaf1873315c',
	callback: 'http://localhost:8080/auth/github/callback',
	sessionSecret: 'This is a demo secret key used by session. Change it during production.'
};

module.exports = authConfig;