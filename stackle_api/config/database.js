module.exports = {
    url: process.env.LOCAL_DB || "mongodb://localhost/main",
    testurl: "mongodb://localhost/node-test",
    alturl: "mongodb://ordinary:H3ll0w0rld@ds149201.mlab.com:49201/stackle",
    option: function(version) {
        var opt;
        if (version < '5') {
            opt = {
                useMongoClient: true
            };
        }
        return opt;
    }
};

/*
To start local mongodb server use following command:
LINUX: sudo service mongod start
WINDOWS: mongod
For More: https://github.com/scorelab/Stackle#installing-mongodb
*/