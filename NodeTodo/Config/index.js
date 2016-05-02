var config = require("./config");

module.exports = {
    MongoConnectionString : "mongodb://" + config.username + ":" + config.password + "@ds062178.mlab.com:62178/devmongo"
}