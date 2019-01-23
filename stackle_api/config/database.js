module.exports = {
    url: process.env.LOCAL_DB || "mongodb://localhost:27017/main",
    testurl: "mongodb://localhost:27017/node-test",
    alturl: "mongodb://ordinary:H3ll0w0rld@ds149201.mlab.com:49201/stackle",
    option: function(version) {
        var opt;
        if (version < '5') {
            opt = {
                useMongoClient: true
                 
            };
        }
        else
        {
            opt=
            {
                useNewUrlParser: true
            }
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