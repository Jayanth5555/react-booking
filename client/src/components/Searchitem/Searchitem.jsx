import React from 'react'
import "./searchitem.css"
import {Link} from "react-router-dom"
const Searchitem = ({item}) => {
  return (
    <div className='searchItem' >
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
         <span className="siDistance">{item.distance}</span> 
         <span className="siTaxiOp">free airport taxi</span>
         <span className="siSubtitle">
            Studio Apartment With Air conditioning
         </span>
         <span className="siFeatures">
          {item.desc}
         </span>
         <span className="siCancelOp">Free cancellation</span>
         <span className="siCancelOpSubtitle">
            you can cancel later , so lock in this great price today!
         </span>
        </div>
        <div className="siDetails">
        {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
         </div>}
         <div className="diDetailTexts">
            <span className="siPrice">{item.cheapestPrice}/-</span><br/>
               <span className="siTaxOp">Includes taxes and fees</span>
               <Link to={`/hotels/${item._id}`}>
             <button className='siCheckButton'>See availabilitty</button>    
             </Link>   
         </div>

        </div>
    </div>
  )
}

export default Searchitem
