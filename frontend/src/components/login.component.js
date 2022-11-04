import React, { useState, useRef } from 'react'
import logo from '../images/logoWhite.png';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import jwtDecode from 'jwt-decode'
import { useLocation, useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

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
  }
  return call;
}

function Login() {
  const [open, setOpen] = useState(false)

  // handle toggle a
  const toggle = () =>{
      setOpen(!open)
  }

  var email;
  var password;

  const [message, setMessage] = useState('');

  // Redirect after login
  const navigate = useNavigate();
  const location = useLocation();
  
  const captchaRef = useRef(null);
  const doLogin = async event => 
  {
      event.preventDefault();

      var storage = require("../tokenStorage.js");
      var obj = {login:email.value,password:password.value};
      var js = JSON.stringify(obj);
      let extendSearch = document.getElementById("error");

      if(password.value === "" || email.value === ""){
        extendSearch.classList.remove('hidden'); 
        setMessage('Please complete all the required fields');
        return;
      }

      const token = await captchaRef.current.executeAsync();
      captchaRef.current.reset();
      console.log("token: " + token)

      var config = apiCall("api/verify-human", {token});

      // Check first if the user is human using reCaptcha
      axios(config).then(function (response) {
        var res = response.data;
        if (res.user === "robot") {
          extendSearch.classList.remove('hidden'); 
          setMessage('You are not human, robots are not allowed here. Get lost!');
        } 
        }).catch(function (error) {
          console.log(error);
      });

      try
      {    
          const response = await fetch(buildPath("api/login"),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if(res.error === "No account belongs to that email" || res.error === "Invalid password" )
          {
            extendSearch.classList.remove('hidden');  
            setMessage('User/Password combination incorrect.');
          }
          else if(res.error === "Account is not verified, please check email for verification email")
          {
            extendSearch.classList.remove('hidden');  
            setMessage('Account is not verified, please check your email for the verification link');
          }
          else
          {
            storage.storeToken(res.ret);

            var ud = jwtDecode(storage.retrieveToken(), {
              complete: true
            });
  
            var user = {
              name: ud.Name,
              userId: res.ret.id
            };
  
            localStorage.setItem("user_data", JSON.stringify(user));
  
            if (location.state && location.state.from) {
              navigate(location.state.from)
              //console.log("LOGIN");
            } else {
              navigate("/landing");
              //console.log("LANDING");
            }
          }
          
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
  };

  return (
    <div class = "min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-[#20072e] bg-gray-900">
        <img select draggable="false" class="flex items-center mb-4 pb-4 " style={{ width: 250}} src={logo} alt="Trendify"></img>   
        <div class="w-full bg-[#1f2937] rounded-lg shadow border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-regular md:text-2xl text-white">
                Sign in to your account
            </h1>
            <div class="hidden mb-4 flex items-center bg-red-600 text-white text-sm font-regular px-4 py-3" role="alert" id = "error">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <span id ="loginResult">{message}</span>
            </div>

            <form class="space-y-4 md:space-y-6" onSubmit={doLogin}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-white">Email address</label>
                  <input type="" name="email" id="email" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Email address" required="" ref={(c) => email = c}></input>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                  <div class = 'flex'>
                    <input 
                      type={(open === false)? 'password' :'text'}
                      //type="password" 
                      name="password" 
                      id="password" 
                      placeholder="Password" 
                      class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                      required="" ref={(c) => password = c}></input>
                      <div className='text-xl text-gray-500 flex -ml-7 mt-2.5'> {
                        (open === false)? <AiFillEye onClick={toggle}/>:
                        <AiFillEyeInvisible onClick={toggle}/>}
                      </div>  
                  </div>

              </div>


              <div class="flex items-center justify-between">
                  <a href="/resetpage" class="text-sm font-medium text-sky-300 hover:text-sky-500 no-underline hover:underline text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" class="w-full text-white bg-[#8239af] hover:bg-[#713299] focus:ring-4 focus:outline-none focus:ring-[#8f4db7] font-medium rounded-full text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 duration-300" onClick={doLogin}>Sign in to your account</button>
              <div class="border-t-2 border-gray-600">
                <p class="mt-3 text-center text-sm font-normal text-gray-400 mr-1 text-center">Don't have account?&nbsp;
                <a href="/signup" class="text-sky-300 hover:text-sky-500 no-underline hover:underline">Sign up</a>
                </p>
                
              </div>
              <p class="mt-2 -mb-1 text-xs text-gray-400">This site is protected by reCAPTCHA and the <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noopener noreferrer" class="no-underline hover:underline text-sky-300 hover:text-sky-500">Google Privacy Policy</a> and <a href="https://policies.google.com/terms?hl=en" target="_blank" rel="noopener noreferrer" class="no-underline hover:underline text-sky-300 hover:text-sky-500">Terms of Service</a> apply.</p>          
            </form>
          </div>
        </div>
        <ReCAPTCHA
          sitekey= "6LeUVcUiAAAAACHBI-FVwAqopfU09sH73VTeB34G"
          size = "invisible"
          ref={captchaRef}
        />,
    </div>
  );
};
  
export default Login;
