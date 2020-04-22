import React from "react";
import classes from "./Dropdown.module.css";

export const DropDown = ({changeRowQuantity}) => {
  return (
      <div className={classes.Dropdown}>
         <select  
            className={`form-control form-control-sm ${classes.SELECT}`} 
            onChange = {e => changeRowQuantity(e.target.value)}
         >
            <optgroup label="Size of rows">
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
            <option>60</option>
            <option>70</option>
            <option>80</option>
            <option>90</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
            <option>212</option>
            </optgroup>
        </select>
    </div>
  );
};
