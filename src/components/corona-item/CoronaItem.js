import React from 'react'

export const CoronaItem = ({item}) => {
    return (
        <tr key={item.country}>
            <td style={{width:"200px"}}>{item.country}</td>
            <td className='text-center'>{item.cases}</td>
            <td className={`text-center ${item.todayCases?'bg-warning font-weight-bolder text-dark':''}`}>
                {item.todayCases?"+"+item.todayCases:null}
            </td>
            <td className={`text-center ${item.todayDeaths?'bg-danger font-weight-bolder':""}`}>
                {item.todayDeaths? '+' + item.todayDeaths: null}
            </td>
            <td className='text-center'>{item.recovered}</td>
            <td className='text-center'>{item.deaths}</td>
            <td className='text-center'>{item.critical}</td>
        </tr>
    )
}
