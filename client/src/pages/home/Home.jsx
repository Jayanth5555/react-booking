import React from 'react'
import Footer from '../../components/footer/Footer';
import FeaturdProperty from '../../components/featurdProperty/FeaturdProperty'
import Featurd from '../../components/featurd/Featurd';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertyList/PropertyList';
import "./home.css";
import MailList from '../../components/mailList/MailList'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <img src="'../../Hotelsimage/image (17).jpeg'" alt=""/>
      <Featurd/>
      </div>
      <div className="homeTitle">
        <h2>Browse by property type</h2>
        <PropertyList/>
      </div>
      <div className="homeTitle">
      <h2>Browse by property type</h2>
       <FeaturdProperty/>
      </div>
      <MailList/>
      <Footer/>
    </div>
  )
}

export default Home
