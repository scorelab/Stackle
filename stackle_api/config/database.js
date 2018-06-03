module.exports = {
	url : process.env.LOCAL_DB || "mongodb://localhost",
	alturl : "mongodb://ordinary:H3ll0w0rld@ds149201.mlab.com:49201/stackle",
};

/*
To start local mongodb server use following command:
LINUX: sudo service mongod start
WINDOWS: mongod
For More: https://github.com/scorelab/Stackle#installing-mongodb
*/