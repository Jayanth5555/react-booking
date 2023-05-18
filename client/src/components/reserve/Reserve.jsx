import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, checked, useContext } from 'react'
import './Reserve.css'
import useFetch from '../../hooks/useFetch.js'
import axios from 'axios'
import { SearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'

const Reserve = (setOpen, hotelId) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const [pr, setpr] = useState("");
    const { data, loading, error } = useFetch(`hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext);
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let list = []
        while (data <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    };
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime()));
        return !isFound

    }


    const handleSelect = (e) => {
        const selected = e.traget.checked;
        const value = e.traget.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value] :
                selectedRooms.fliter((item) => item !== value))
    }

    // console.log(selectedRooms)

    
  const navigate = useNavigate();
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`/room/availability/${roomId}`, {
                    dates: alldates,
                });
                //navigate(`/book/${selectedRooms}`)
                navigate(`/hotels/room/book/${selectedRooms}`, { state: { selectedRooms, hotelId } })
                return res.data;

            })


            );
            console.log(pr);

            

            setOpen(false);

            // navigate("/")
        } catch (err) {

        }
    }
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>select your rooms:</span>
                {
                    data.map(item => (
                        <div className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDsec">{item.dsec}</div>
                                <div className="rmax">Max people:<b>{item.maxPeople}</b></div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">

                                {item.roomNumbers.map((roomNumber) => (
                                    <div className="room">
                                        <label>{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelect}
                                            disabled={!isAvailable(roomNumber)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                <button onClick={handleClick} className="rButton">Reserve</button>
            </div>
        </div>
    )
}

export default Reserve
