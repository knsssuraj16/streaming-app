import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../action";
class GoogleAuth extends React.Component {
  componentDidMount() {
    // window.gapi.load("clent:auth2", () => {
    //   window.gapi.auth2.init({
    //     clientId:
    //       "224585224633-jq789bskv66eh0g1edafs770c7fufn5i.apps.googleusercontent.com",
    //     scope: "email",
    //     plugin_name: "streamy",
    //   });
    // });

    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          clientId:
            "224585224633-jq789bskv66eh0g1edafs770c7fufn5i.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "stremy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onSingInClick = () => {
    console.log(this.auth);
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  renderAuthHelper() {
    // console.log(this.state.isSingedIn);
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSingInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthHelper()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
