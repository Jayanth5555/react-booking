import React from 'react'
import useFetch from '../../hooks/useFetch'
import "./featured.css"

const Featured = () => {

const {data,loading,error} = useFetch("/hotels/countByCity?cities=hyderbad,mumbai,Banglore");

  return (
    <div className="featured">
    { loading ? ("Loading please wait") : (<> <div className="featuredItem">
          <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_15BPlbzyI3dmLUm9n_sbtmHEFD-UPzkOA&usqp=CAU" alt="" 
                className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hyderabad</h1>
          <h2> {data[0]}Properties</h2>
        </div>
      </div>

      <div className="featuredItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzk9_B3pc-H1-UluOx9t2RbJolPP44SAylw&usqp=CAU" alt="" 
                className="featuredImg" />
        <div className="featuredTitles">
        <h1>Mumbai</h1>
        <h2> {data[1]} Properties</h2>
        </div>
      </div>

      <div className="featuredItem">
          <img src="https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/05/shrutisuman13-wikicommons.jpg" alt="" 
                className="featuredImg" />
        <div className="featuredTitles">
        <h1>Banglore</h1>
         <h2> {data[2]}Properties</h2>
        </div>
      </div> </>)}
    </div>
  )
}

export default Featured
