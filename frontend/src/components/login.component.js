import React, { useState } from 'react'
import {Link} from 'react-router-dom'

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

function Login() {

  var email;
  var password;

  const [message,setMessage] = useState('');

  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {login:email.value,password:password.value};
      var js = JSON.stringify(obj);
      let extendSearch = document.getElementById("error");
      console.log(obj)

      try
      {    
          const response = await fetch(buildPath("api/login"),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
              var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('Great Success!');
          }
          extendSearch.classList.remove('hidden');
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
  };

  return (
    <div class="mx-auto px-6 flex flex-col items-center">
      <div class="md:w-6/12 lg:w-3/12 mt-5">
        <p class="font-regular text-center text-xl mb-3 -mt-3">To continue please sign in.</p>
        
        <div class="hidden mb-4 flex items-center bg-red-600 text-white text-sm font-regular px-4 py-3" role="alert" id = "error">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
          <span id ="loginResult">{message}</span>
        </div>

        <form action="" onSubmit={doLogin}>
          <div class="">
            <label class="-mt-2 text-black font-bold  text-sm" for="email">Email address</label>
            <input class="
              input border border-black
              rounded-md
              block
              px-3
              py-2.5
              w-full
              mt-2
              mb-6
              placeholder-gray-600
            " type="email" name="email" placeholder="Email address" id="email"  
            ref={(c) => email = c}/>
          </div>

          <div class="">
            <label class="text-black font-bold  text-sm" for="password">Password</label>
            <input class="
              border border-black
              rounded-md
              block
              px-3
              py-2.5
              w-full
              mt-2
              mb-6
              placeholder-gray-600
              " type="password" name="password" placeholder="Password" id="password" 
              ref={(c) => password = c}/>
          </div>
        </form>
        
        
        <div class="border-b mb-4">
          <button onClick={doLogin} class="
                  w-full
                  bg-[#ab5edd] 
                  hover:bg-[#a247db] 
                  text-white
                  uppercase
                  font-bold
                  text-sm
                  leading-loose
                  tracking-widest
                  p-2
                  rounded-full
                  my-4
                ">
            Sign in
          </button>
        </div>

        <div>
          <p class="font-bold text-center">Don't have account?</p>
          <Link to='/signup'>
            <button class="
                w-full
                border-2 border-gray-600
                hover:bg-gray-600
                hover:text-white
                text-gray-500
                uppercase
                font-bold
                text-sm
                leading-loose
                tracking-widest
                p-2
                rounded-full
                my-1
              "
              type = "button" >
              Sign up for trendify
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
  
export default Login;
