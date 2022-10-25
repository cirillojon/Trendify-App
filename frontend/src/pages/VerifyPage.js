import axios from "axios";
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LandingPage from './LandingPage'


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

        return (
          <h1>Invalid user or email token!</h1>
        );
        
      } else {
        console.log("4");
      }
  
      }).catch(function (error) {
        console.log(error);
      });

  }, []);

  return (
    <>
      <LandingPage />
    </>
  );
};

export default VerifyPage;