import React from "react";
import axios from "axios";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = {
    query: ""
  }

  handleSearch = () => {
    this.props.loading();

    axios.get("http://localhost:7000/searchcelebrity?celebrity=" + this.state.query).then(response => {
      if (response && response.data) {
        this.props.callback(response.data);
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <input className="search-input" type="search" value={this.state.query} placeholder="Enter person..."
               onChange={(val) => {this.setState({query: val.target.value})}} maxLength="50"/>
        <button className="btn-front-page" type="submit" onClick={this.handleSearch}>Search</button>
      </React.Fragment>
    )
  }
}

export default SearchBar;