import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SignUp extends Component {
  render() {
    return (
      <div class="mx-auto px-6 flex flex-col items-center">
        <div class="md:w-6/12 lg:w-3/12 mt-5">
          <p class="font-regular text-center text-xl mb-5">Sign up with your email address.</p>
          <form action="">
            <div class="">
              <label class="-mt-2 text-black font-bold   text-sm" for="email">What should we call you?</label>
              <input class="
                border border-sky-500
                rounded-md
                block
                px-3
                py-2.5
                w-full
                mt-2
                mb-6
                placeholder-gray-600
                    " type="email" name="email" placeholder="Name" id="email" />
            </div>

            <div class="">
              <label class="-mt-2 text-black font-bold   text-sm" for="email">What's your email?</label>
              <input class="
                border border-sky-500
                rounded-md
                block
                px-3
                py-2.5
                w-full
                mt-2
                mb-6
                placeholder-gray-600
                    " type="email" name="email" placeholder="Email address" id="email" />
            </div>

            <div class="">
              <label class="-mt-2 text-black font-bold   text-sm" for="email">Create a password</label>
              <input class="
                border border-sky-500
                rounded-md
                block
                px-3
                py-2.5
                w-full
                mt-2
                mb-6
                placeholder-gray-600
                    " type="email" name="email" placeholder="Password" id="email" />
            </div>

            <div class="">
              <label class="text-black font-bold text-sm" for="password">Confirm password</label>
              <input class="
                border border-sky-500
                rounded-md
                block
                px-3
                py-2.5
                w-full
                mt-2
                mb-6
                placeholder-gray-600
                    " type="password" name="password" placeholder="Enter your password again" id="password" />
            </div>
          </form>
          
          <div class="border-b mb-4">
            <button class="
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
              Sign Up
            </button>
          </div>

          <div>
            <p class="font-bold text-center">Already have an account?</p>
            <Link to='/login'>
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
                Log in to  trendify
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
