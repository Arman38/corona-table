import React from "react"
import classes from "./CoronaFooteritems.module.css"

export const CoronaFooteritems = ({allData:{cases,todayCases,todayDeaths,recovered,deaths,critical}}) => {
 
    return (
        <tr className={classes.FOOTERITEMSROW}>
            <td className="text-center">TOTAL:</td>
            <td>{cases}</td>
            <td style={{background:"#ffc400",color:"#343a40"}}>+{todayCases}</td>
            <td style={{background:"#d32f2f"}}>+{todayDeaths}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
            <td>{critical}</td>
        </tr>
    )
}