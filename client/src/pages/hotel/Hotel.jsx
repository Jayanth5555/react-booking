import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Reserve from '../../components/reserve/Reserve'
import "./hotel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { userNavigate } from "react"
const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`)
  const { user } = useContext(AuthContext);
  const navigate = userNavigate()


  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.cell(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = (dayDifference(dates[0].endDate, dates[0].startDate))
  if (days == 0) {
    days = days + 1
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // const photos = [
  //   {
  //     src: "https://assets.sandsresortsmacao.cn/content/venetianmacao/hotel/suite/2020/premio-royale/vm_premio-royale-suite_gallery_750x510_2.jpg"
  //   },
  //   {
  //     src: "https://th.bing.com/th/id/OIP.0AWLlDtjfsr8jVUlWbMg0QHaE8?pid=ImgDet&w=1050&h=700&rs=1"
  //   },
  //   {
  //     src: "https://th.bing.com/th/id/OIP.gqMMCI4QBgiJmkCdEF0QmAHaFM?pid=ImgDet&w=768&h=538&rs=1"
  //   },
  //   {
  //     src: "https://i.dailymail.co.uk/i/pix/2014/08/06/article-2716876-204C912C00000578-777_636x382.jpg "
  //   },
  //   {
  //     src: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/60/2016/11/04084047/Superior-Room-King-Bed-1024x593.jpg"
  //   },
  //   {
  //     src: "https://th.bing.com/th/id/OIP.3jHMr5s3etyza1TDfxoCzQHaEJ?pid=ImgDet&w=760&h=425&rs=1"
  //   },
  //   {
  //     // src : "https://d1x3cbuht6sy0f.cloudfront.net/sales/22851/89d92ac1_391d_4dc6_8df9_5b4a7f9479d9.jpg"
  //   },
  // ]

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true);
  }
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSliderNumber(newSlideNumber)
  }
  const handleClick = () => {
    if (user) {
      setOpenModel(true);

    } else {
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("loading") : (<div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close " onClick={() => setOpen(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>Excellent  Loction - {data.distance} from center</span>
          <span className='hotelPriceHighlight'> Book a stay over {data.cheapestPrice}/- at this property and get a free airport text</span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper">
                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}

              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>perfect for a{days}-night stay!</h1>
              <span>Location in the real of Hyderbad, this property has an excellent location score of 9.8!</span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} {" "})
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
    </div>
  )
}

export default Hotel
