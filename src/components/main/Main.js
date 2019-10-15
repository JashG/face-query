import React from "react";
import axios from "axios";
import SearchBar from "../search/SearchBar";
import Video from "../videos/Video";
import Filter from "../filter/Filter";
import "./Main.css";

class Main extends React.Component {
  state = {
    listOfVideos: [],
    isLoading: false
  };

  handleSearchQuery = data => {
    this.setState({ listOfVideos: {} });
    let list = [];
    let result = Object.keys(data)[0];
    let resultVideos = data[result];
    for (let video in resultVideos) {
      list.push(video);
    }

    console.log(list);
    this.fetchVideos(list);
  };

  fetchVideos = list => {
    let listofVideos = [];

    axios.get("http://localhost:7000/all").then(response => {
      if (response) {
        let allVideos = response.data;

        Object.keys(allVideos).forEach(videoName => {
          const videoNameFormatted = videoName.toLowerCase().replace(/_/g, "");
          if (list.includes(videoNameFormatted)) {
            const name = videoName.replace("_", " ");
            const link = allVideos[videoName][" link"].trim();
            listofVideos.push({
              name: name,
              link: link
            });
          }
        });
        this.setState({ listOfVideos: listofVideos, isLoading: false });
      }
    });
  };

  loadingCallback = () => {
    this.setState({ isLoading: true });
  };

  createLoadingComponent = () => {
    if (this.state.isLoading) {
      return <div class="loader" />;
    }
  };

  createVideoComponent = () => {
    if (this.state.listOfVideos.length && !this.state.isLoading) {
      let elements = [];
      this.state.listOfVideos.forEach(video => {
        console.log(video);

        let link = video.link.trim().replace("watch?v=", "embed/");
        console.log(link);
        elements.push(<Video name={video.name} link={link} />);
      });
      return (
        <div className="video-list-container">
          <h2>Video Search Results</h2>
          {elements}
        </div>
      );
    }
  };

  createFilterComponent = () => {
    if (this.state.listOfVideos.length) {
      return (
        <div class="filter-bar">
          <Filter />
        </div>
      );
    }
  };

  render() {
    const loadingComponent = this.createLoadingComponent();
    const videoComponent = this.createVideoComponent();
    const filter = this.createFilterComponent();

    return (
      <div>
        <div className="top-content">
          <p>
            Using AWS image and video recognition software, searching a person's
            name will return a list of videos in which they appear.
          </p>
          <h1>Search by Name</h1>
          <SearchBar
            callback={this.handleSearchQuery}
            loading={this.loadingCallback}
          />
        </div>
        <div>
          {filter}
          {loadingComponent}
          {videoComponent}
        </div>
      </div>
    );
  }
}

export default Main;
