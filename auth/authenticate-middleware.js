/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   if(req.session && req.session.loggedIn){
//     next();
//   } else {
//     res.status(401).json({ you: 'shall not pass!' });
//   }  
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = "Chanyeol";

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again." });
  }
};