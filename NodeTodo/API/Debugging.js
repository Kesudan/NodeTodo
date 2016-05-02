var Debugging = function (app, parser) {

    // Handle 404
    app.use(function (req, res) {
        res.status(404).send('Sorry cant find that!');
    });
    
    // Handle 500
    app.use(function (error, req, res, next) {
        res.status(500).send('500: Internal Server Error', 500);
    });
};

module.exports = Debugging;
