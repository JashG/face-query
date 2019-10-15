import React from "react";
import "./Video.css";

class Video extends React.Component {
  render() {
    return(
      <div className="video-container">
        <div>
          <iframe width="560" height="315" src={this.props.link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        
      </div>
    );
  }
}

export default Video;