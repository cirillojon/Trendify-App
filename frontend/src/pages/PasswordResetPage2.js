import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../images/logoWhite.png';
import * as validator from 'validator';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

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

function displayMessage(infoMessage, flag){
    if(flag === 1){
      infoMessage.classList.remove('bg-green-600'); 
      infoMessage.classList.add('bg-red-600'); 
      infoMessage.classList.remove('hidden');
    }
    else {
      infoMessage.classList.remove('bg-red-600'); 
      infoMessage.classList.add('bg-green-600'); 
      infoMessage.classList.remove('hidden'); 
    }
  
    return;
  }

const PasswordResetPage2 = () =>
{
    const [open, setOpen] = useState(false)

    // handle toggle 
    const toggle = () =>{
        setOpen(!open)
    }

    const {userID, passwordResetToken} = useParams();

    const [message,setMessage] = useState('');
  
    var password, confirmPassword;
    const attemptResetPassword = async (event) => {
        event.preventDefault();
        let infoMessage = document.getElementById("error");
        
    console.log("resetToken: " + passwordResetToken);
        if(password.value === "" ||  confirmPassword.value === ""){
            displayMessage(infoMessage, 1)
            setMessage('Please complete all the required fields');
            return;
        }
        if(password.value !== confirmPassword.value){
            displayMessage(infoMessage, 1) 
            setMessage('Passwords do not match');
            return;
        }
    
        if(!validator.isStrongPassword(password.value)){
            displayMessage(infoMessage, 1)
            setMessage('Your password is weak. Please enter a strong password.');
            return;
        }
        
        var obj = {userID:userID, passwordToken:passwordResetToken, newPassword:password.value};
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {    
            const response = await fetch(buildPath("api/passwordReset"),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.error === "User does not exist")
            {
                displayMessage(infoMessage, 1)
                setMessage('User does not exist.');
            }
            else if(res.error === "Same as old password")
            {
                displayMessage(infoMessage, 1)
                setMessage('Password must not be the same as your old password');
            }
            else if(res.error === "Reset password token expired")
            {
                displayMessage(infoMessage, 1)
                setMessage('Your reset password token has expired. Please request a new reset password.');
            }
            else if (res.error === "")
            {
                displayMessage(infoMessage, 2)
                setMessage('Your password has been successfully updated.');
            }
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
    
      };

    return(
        <div class="font-poppins">
        <div class = "min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-[#20072e] bg-gray-900">
            <img select draggable="false" class="flex items-center mb-4 pb-4 " style={{ width: 250}} src={logo} alt="Trendify"></img>   
            <div class="w-full bg-[#1f2937] rounded-lg shadow border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">


            <h1 class="text-xl font-bold leading-tight tracking-regular md:text-2xl text-white">
                Reset your password
            </h1>
            <p class="mb-4 text-md font-light leading-tight tracking-regular md:text-2xl text-white">
                Your new password should be different from your old password.
            </p>
            
            <div class="hidden mb-4 flex items-center bg-red-600 text-white text-sm font-regular px-4 py-3" role="alert" id = "error">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <span id ="loginResult">{message}</span>
            </div>

            <form>
            <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                  <div class = 'flex mb-4'>
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
              <div>
                  <label 
                    for="password" 
                    class="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                  <div class = 'flex'>
                    <input 
                      type={(open === false)? 'password' :'text'}
                      name="confirmPassword" 
                      id="confirmPassword" 
                      placeholder="Enter your password again" 
                      class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                      required="" 
                      ref={(c) => confirmPassword = c}></input>
                      <div className='text-xl text-gray-500 flex -ml-7 mt-2.5'> {
                        (open === false)? <AiFillEye onClick={toggle}/>:
                        <AiFillEyeInvisible onClick={toggle}/>}
                      </div>  
                  </div>
              </div>
                <button type="submit" class="w-full text-white bg-[#8239af] hover:bg-[#713299] focus:ring-4 focus:outline-none focus:ring-[#8f4db7] font-medium rounded-full text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 mt-4" onClick={attemptResetPassword}>Reset your password</button>
            </form>
                <div class="border-t-2 border-gray-600 flex items-center content-center">
                    <p class="mt-3 text-center text-sm font-normal text-gray-400 mr-1 ml-auto">Ready to sign in?</p>
                    <a href="/" class="mr-auto text-sm font-medium text-primary-600 no-underline hover:underline">Click here.</a>
                </div>

            </div>
            </div>
        </div>
        </div>
    );
};

export default PasswordResetPage2;
