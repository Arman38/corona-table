import React from "react";
import { Table } from "react-bootstrap";
import { CoronaItem } from "../corona-item/CoronaItem";
import classes from "./CoronaItems.module.css";
import { CoronaFooteritems } from "../corona-footer-items/CoronaFooterItems";

export const CoronaItems = ({ data, filterHeader, allData, tHeaders }) => {
  let theaders = tHeaders.map(({ text, label, sorted }) => {
    let fontClasses = [classes.FONTICON];
    if (sorted === "lower") {
      fontClasses.push(`fa fa-caret-down`);
    }
    if (sorted === "higher") {
      fontClasses.push(`fa fa-caret-up`);
    }

    return (
      <th
        key={text}
        className={classes.THEADER}
        onClick={() => filterHeader(label, sorted)}
      >
        {text}
        <i className={fontClasses.join(" ")}></i>
      </th>
    );
  });

  let coronaItem = data.map((item) => {
    return <CoronaItem item={item} key={item.country} />;
  });

  return (
    <div>
      <Table
        responsive="sm"
        striped
        bordered
        hover
        variant="dark"
        className={classes.TABLE}
      >
        <thead>
          <tr>{theaders}</tr>
        </thead>
        <tbody>{coronaItem}</tbody>
        <tbody>
          <CoronaFooteritems allData={allData} />
        </tbody>
      </Table>
    </div>
  );
};
