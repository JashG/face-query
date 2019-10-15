import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./Filter.css";

class SearchBar extends React.Component {
  state = {};

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Filter Results
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">All</Dropdown.Item>
          <Dropdown.Item href="#/action-2">CBS News</Dropdown.Item>
          <Dropdown.Item href="#/action-3">CBS Sports</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default SearchBar;
