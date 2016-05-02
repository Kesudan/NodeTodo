var API = function (app, parser) {

    // API/Login
    // API/ToDo

    console.log("API Called");
    
    //Handle empty data on API post call
    app.post("/api", parser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
    });
    //Route login API
    app.post('/api/Login', parser, Login);
    

    //Route ToDo functions (Update/Save/Delete)
    var ToDoHandling = require('./ToDo');
    var ToDoRouting;
    
     app.all('/api/ToDo', parser, function (req, res, next) {
        //Pass request and response to object
        ToDoRouting = new ToDoHandling(req, res);
        next();
    });
    app.route('/api/Todo')
          .get(parser, function (req, res) {
            //Get
            ToDoRouting.GetToDo(); 
        })
          .post(parser, function (req, res) {
            //Save
            ToDoRouting.SaveToDo();
        })
          .put(parser, function (req, res) {
            //Required?
            ToDoRouting.UpdateToDo();
        })
          .delete(parser, function (req, res) {
            ToDoRouting.DeleteToDo();
    });
    app.delete('api/Todo/:id', function (req, res) {
        ToDoRouting.DeleteToDo();
    });
    


};

var Login = function (req, res) {
    if (!req.body.username || !req.body.password) { res.status(500).send('Something broke!'); return; }
    
    //var mongoose = require("mongoose");
    var mongooseSchema = require("./MongooseSchema")
    var userModel = mongooseSchema.userModel;
    
    userModel.findOne({ Username: req.body.username, Password: req.body.password }, function (err, user) {
        //If error or no user exists then return
        if (err) console.error(err);
        if (!user) { res.status(400).send('Bad captain!'); return; }
        
        //Convert user to object
        var userDoc = user.toObject();
        //Log username
        console.log(userDoc.Username);
        //Send 200 OK
        res.status(200).send('Received, captain!'); return;
    });


};



module.exports = API;

