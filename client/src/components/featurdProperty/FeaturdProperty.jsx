// import { CircularProgress } from "@material-ui/core"
import useFetch from "../../hooks/useFetch"
import "./featurdproperty.css"

const FeaturedProperties=()=>{
    const {data,loading,error}=useFetch("/hotels?featured=true")
    // &limit=4&min=10&max=200")

    return(
        <div className="fp">
            {loading ?(loading ) :<>
            {data.map(item=>(
                
            <div className="fpItem"  key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpCity">{item.type}</span>
                <span className="fpCity">{item.desc}</span>
                <span className="fpPrice">Starting from Rs {item.cheapestPrice}/-</span>
                {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>

                </div>}
                
            </div>  ))}  </> }
            
            
            

        </div>
        
    )
}
export default FeaturedProperties

