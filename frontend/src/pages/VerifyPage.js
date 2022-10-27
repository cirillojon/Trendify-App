import axios from "axios";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const app_name = 'trendify-project'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function apiCall(endpoint, json, method) {
  
    var call = {
        
      method: method ? method : "POST",
      url: buildPath(endpoint),
  
      headers: {
        "Content-Type": "application/json",
      },
  
      data: json
    };
  
    return call;
  }

const VerifyPage = () => {
  const { userID, uniqueEmailToken } = useParams();
  var obj = {
    userID: userID,
    uniqueEmailToken: uniqueEmailToken
  };

  console.log(obj);

  var config = apiCall("api/emailVerification", obj);

  useEffect(() => {

    axios(config).then(function (response) {

      console.log("1");

      var res = response.data;

      console.log("2");

      if (res.error) {

        console.log("3");
        window.location.href = '/verification-failed';

      } else {
        console.log("4");
        window.location.href = '/verification-successful';
      }
      
      }).catch(function (error) {
        console.log(error);
      });

  }, [config]);

  return
};

export default VerifyPage;