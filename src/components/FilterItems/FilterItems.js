import React from "react";
import { Form } from "react-bootstrap";

export const FilterItems = ({ changeHandler, searchValue }) => {
  return (
    <div className="mb-2">
      <Form.Control
        type="search"
        value={searchValue}
        placeholder="Search"
        onChange={changeHandler}
      />
    </div>
  );
};
