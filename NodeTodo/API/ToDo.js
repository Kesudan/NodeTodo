var mongooseSchema = require("./MongooseSchema");
var todoModel = mongooseSchema.todoModel;

var Validate = function (err, data) {
    if (err) {
        res.status(400).send(err); 
        return false;
    }
    if (!data) {
        res.status(400).send("No data returned for request"); 
        return false;
    };

    return true;
};

module.exports = function (req, res) {
    var todo = {
        GetToDo: function(callback) {
            todoModel.find({}, function (err, todos) {
                if (!Validate(err, todo)) return;

                res.send(todos);
            });
        },
        UpdateToDo: function (callback) {
            todoModel.findById(req.body.ID, function (err, todo) {
                if (!Validate(err, todo)) return;

                var todoDoc = todo.toObject();
                todo.Description = req.body.Description;
                todo.Date = req.body.Date;
                todo.Complete = req.body.Complete;
                todo.File = req.body.File;
                todo.save();

                res.status(200).send('Received, captain!'); return;
            });
        },
        DeleteToDo: function (callback) {
            todoModel.findByIdAndRemove(req.body.ID, function (err) {
                if (!Validate(err, todo)) return;

                res.status(200).send('Received, captain!'); return;
            });

        },
        SaveToDo: function (callback) {
            todoModel.create(req.body, function (err, todo) {
                if (!Validate(err, todo)) return;

                var todoDoc = todo.toObject();
                res.status(200).send('Received, captain!'); return;
            });
        },
    }

    return todo;
}



//module.exports = function (req, res) {
//    var tasks = {
//        profile: function (cb) {
//            userService.getUser(function (er, user) {
//                if (er) return cb(er)
//                cb(null, user.profile)
//            })
//        },
//        promos: function (cb) {
//            promoService.getPromos(req.body.keyword, function (er, promos) {
//                if (er) return cb(er)
//                cb(null, promos)
//            })
//        },
//        results: function (cb) {
//            searchService.getSearches(req.body.keyword, function (er, results) {
//                if (er) return cb(er)
//                cb(null, results)
//            })
//        }
//    }
    
//    async(tasks, function respond(er, data) {
//        if (er) return res.status(500).json({ message: "Failed to get user/promos/searches" })
//        res.json(data)
//    })
//}