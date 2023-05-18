import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./header.css"
import { faBed, faBookJournalWhills, faBuilding, faBuildingCircleCheck, faBuildingColumns, faBuildingFlag, faCalendarDays, faCar, faHotel, faHouseUser, faPercent, faPerson, faPlane, faTaxi, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from "react-date-range"
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
// import { Hotelsimage } from "../../Hotelsimage"
const Header = ({type}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate()
    const {user} = useContext(AuthContext);
    

    const handleOption = (name, opration) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: opration === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    }
  
    const {dispatch} = useContext(SearchContext) 

    const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
     navigate("/hotels",{state:{ destination, dates , options}})
    }
    return (
        <div className="header">
            {/* <img src='../../Hotelsimage/image (10).jpeg'/> */}
            <div className={type ==="list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerlist">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faHouseUser} />
                        <span>Home</span>
                    </div>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faHotel} />
                        <span>Hotel</span>
                    </div>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faUmbrellaBeach} />
                        <span>Attractions beach</span>
                    </div>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faPercent} />
                        <span>offers</span>
                    </div>
                </div>
                { type !=="list" &&
                <>
                <h1 className="headerTitle">A 5 Star hotel booking</h1>
                <p className="headerDesc"> Travel be a comfortable to jounary a Luxury </p>
                {!user &&  <button className="headerBtn">sign in / Register</button>}
                
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text"
                            placeholder='where are you going'
                            className='headerSearchInput'
                            onChange={e=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>
                            {`${format(dates[0].startDate, "mm/dd/yyyy")} to ${format(dates[0].endDate, "mm/dd/yyyy")} `}</span>
                        {openDate &&
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates} className="date"
                                minDate={new Date()}
                             />
                        }
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} childen . ${options.room} room`}</span>
                        { openOptions  && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className='optionCounterButton' onClick={() => handleOption("children", "d")} >-</button>
                                    <span className="optionCounterNumber">{options.children} </span>
                                    <button className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                    <button className='headerBtn' onClick={handleSearch}>search</button>
                   </div>
                </div></>}
            </div>
        </div>
       );
};

export default Header;
