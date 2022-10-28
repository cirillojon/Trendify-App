const TOKEN_KEY = 'token_data';

exports.storeToken = function (tok) {
  
  try {
    localStorage.setItem(TOKEN_KEY, tok.accessToken);
  } catch(e) {
    console.log(e.message);
  }
}

exports.removeToken = function () {
  
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch(e) {
    console.log(e.message);
  }
}

exports.isLoggedIn = function() {
  return localStorage.getItem(TOKEN_KEY);
}

exports.retrieveToken = function () {

  var ud;

  try {
    ud = localStorage.getItem(TOKEN_KEY);
  } catch(e) {
    console.log(e.message);
  }
  
  return ud;
}