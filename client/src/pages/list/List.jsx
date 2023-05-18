import React, { useState } from 'react'
import './list.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import Searchitem from '../../components/Searchitem/Searchitem'
import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [Min, setMin] = useState(undefined);
  const [Max, setMax] = useState(undefined);
  
  const { data, loading, error, reFetch}=useFetch(`/hotels?city=${destination}&min=${Min ||0}&max=${Max || 999}`);
  const handleClick =()=>{
    reFetch();
  }
  
  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="listContainer">
        <div className="listWarapper">
          <div className="listSearch">
            <h1 className="lsTitle">search </h1>
            <div className="lsItem">
              <label >Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} 
                to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />)}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">min Price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">max Price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMax(e.target.value)}className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children
                  </span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onChange = {handleClick}>Search</button>
          </div>
          
          <div className="listResult">
            {loading ? ("loading"):(<>
            {data.map((item)=>(
                 <Searchitem item={item} key={item._id}/> 
            ))}
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
