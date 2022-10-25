const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function(name, id) {
  return _createToken(name, id);
}

_createToken = function(name, id) {

  try {

    const expiration = new Date();

    const user = {
      userID: id,
      Name: name,
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    ret = {
      accessToken: accessToken,
      name: name,
      id: id
    };

  } catch (e) {
    ret = { error: e.message };
  }

  return ret;
}

exports.isExpired = function(token) {

  var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) => {
    return err;
  });

  return isError;
}

exports.refresh = function(token) {

  var ud = jwt.decode(token, {
    complete: true
  });

  var userId = ud.payload.id;
  var name = ud.payload.Name;

  return _createToken(name, userId);
}