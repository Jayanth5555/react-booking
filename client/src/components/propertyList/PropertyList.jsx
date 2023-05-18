import React from 'react'
import useFetch from '../../hooks/useFetch';
import './propertyList.css'
const PropertyList = () => {

    const { data, loading, error } = useFetch("/hotels/countByType");
    const images = [
        "https://www.tridenthotels.com/content/gallery/j1.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQioDbvXTXMmvxpSxkSFJFLyelHi1dkVkktyA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeMBHECr95tCM_eR9KljZ9Q8dIY3Qahwyubg&usqp=CAU",
        "https://lh3.googleusercontent.com/p/AF1QipMsr64vdBp-_r4YJ_l7ikDt6UAEfJ9gTQUtw_4k=w296-h202-n-k-rw-no-v1",
        "https://lh5.googleusercontent.com/p/AF1QipPF1rWf9ByLNy1mjrOe1I3s-peQxP-naDvst3l3=w253-h168-k-no"
    ];
    return (
        <div className="pList">
            {loading ? ("loading") : (
                <>
                    {data && images.map((img, i) => (
                        <div className="pListItem" key={i}>
                             <img
                                src={img}
                                alt=""
                                className="pListImg" />
                             <div className="pListTitle">
                                <h1>{data[i]?.type}</h1>
                                <h2>{data[i]?.count} {data[i]?.type}</h2>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default PropertyList
