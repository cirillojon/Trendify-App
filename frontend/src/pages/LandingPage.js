import React from 'react'
import '../App.css'


import Body from '../components/landing.body'
import Header from '../components/landing.header'
import Footer from '../components/landing.footer'
import Github from '../components/landing.github'



const LandingPage = () =>
{
    return(
        <div class = "font-poppins bg-[#20072e] min-h-screen">
            <Header />
            <Body />
            <Footer />
            <Github />
        </div>
    );
};

export default LandingPage;