const UsersController = require('../controllers/users_controller');
const PostsController = require('../controllers/posts_controller');
const InquireController = require('../controllers/inquire_controller');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  app.post('/add', UsersController.create);

  app.get('/login/:email/:password', UsersController.login);

  app.get('/all', PostsController.getAll);

  app.get('/getOne/:email', UsersController.getOne)

  app.use(jwtAuth);

  app.post('/addPost', PostsController.addPost);

  app.post('/addInquiry', InquireController.addInquiry);

  app.get('/getInquiriesForUser', InquireController.getInquiriesForUser);

  app.get('/getPostInquiriesForUser', InquireController.getPostInquiriesForUser);

  app.patch('/denyInquiry', InquireController.denyInquiry);

  app.patch('/confirmInquiry', InquireController.confirmInquiry);



};



function jwtAuth(req, res, next){
  //send as a query parameter!
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'mysuperduperbackend', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}
