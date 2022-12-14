import React, { Component } from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../action";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const id = this.props.match.params.id;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div> Loading....</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <video style={{ width: "100%" }} controls ref={this.videoRef}></video>
        <h1 style={{ display: "block" }}>{title}</h1>
        <h5 style={{ display: "block" }}>{description}</h5>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
