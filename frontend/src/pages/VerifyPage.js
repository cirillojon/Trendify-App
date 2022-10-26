import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import VerifyFailedPage from '../pages/VerifyFailedPage'
import VerifySuccessfulPage from '../pages/VerifySuccessfulPage'

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
  const [invalidToken, setInvalidToken] = useState(false);

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
        setInvalidToken(true);

      } else {
        console.log("4");
        setInvalidToken(false);
      }
      
      }).catch(function (error) {
        console.log(error);
      });

  }, [config, invalidToken]);

  return (
    <>
    {
      (invalidToken === true) ? <VerifyFailedPage /> :  <VerifySuccessfulPage />
    }
    </>
  );
};

export default VerifyPage;