import React from 'react'
import '../App.css'


import Body from '../components/landing.body'
import Header from '../components/landing.header'
import Footer from '../components/landing.footer'
import Team from '../components/landing.team'
import Github from '../components/landing.github'



const LandingPage = () =>
{
    return(
        <div class = "font-poppins">
            <Header />
            <Body />
            <Team />
            <Footer />
            <Github />
        </div>
    );
};

export default LandingPage;