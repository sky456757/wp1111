/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {tags.map((t)=>(<div className='tag' key={t}>{t}</div>))}
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag' key={price}>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        
        let day = ["Mon","Tue","Wed","Thr","Fri","Sat","Sun"]
        let mes = []
        day.forEach((d) => {
            if(time.hasOwnProperty(d))
                mes.push(time[d])
            else
                mes.push("Closed")
        })
        //alert(time["All"])
        let ti = time.hasOwnProperty("All") ? 
        (<div className='businessTime'>
            <div className='singleDay'>
                <div className='day'>Mon</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Tue</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Wed</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Thr</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Fri</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Sat</div>
                <div className='time'>{time["All"]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Sun</div>
                <div className='time'>{time["All"]}</div>
            </div>
         </div>
         ): 
         (<div className='businessTime'>
            <div className='singleDay'>
                <div className='day'>Mon</div>
                <div className='time'>{mes[0]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Tue</div>
                <div className='time'>{mes[1]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Wed</div>
                <div className='time'>{mes[2]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Thr</div>
                <div className='time'>{mes[3]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Fri</div>
                <div className='time'>{mes[4]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Sat</div>
                <div className='time'>{mes[5]}</div>
            </div>
            <div className='singleDay'>
                <div className='day'>Sun</div>
                <div className='time'>{mes[6]}</div>
            </div>
         </div>
         )
        return (
            ti
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information