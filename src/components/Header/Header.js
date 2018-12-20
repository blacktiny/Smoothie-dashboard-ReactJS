import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SVG from "react-inlinesvg";

import "./Header.scss";
import { logoutUser } from "../../actions/user";
import { EMLINK } from "constants";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bDropdownOpend: false,
      bDropdownClicked: false,
      bDropdownStyle: " dropdown-closed",
      onMenuClicked: this.props.onClick,
      login: this.props.auth.login
    };
  }

  componentDidMount () {
    window.addEventListener('click', this._onWindowClick);
    window.addEventListener('touchstart', this._onWindowClick);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this._onWindowClick);
    window.removeEventListener('touchstart', this._onWindowClick);
  }

  _onWindowClick = (event) => {
    const { bDropdownOpend, bDropdownClicked } = this.state;
    if (bDropdownClicked) {
      this.setState({ bDropdownClicked: false });
    } else if (bDropdownOpend) {
      this.setState({ bDropdownOpend: false, bDropdownStyle: " dropdown-closed" });
    }
  }

  doLogout = () => {
    this.props.dispatch(logoutUser());
  };

  onDropdownClicked = () => {
    const { bDropdownOpend } = this.state;
    this.setState({ bDropdownOpend: !bDropdownOpend, bDropdownClicked: true });
    if (!bDropdownOpend) {
      this.setState({ bDropdownStyle: " dropdown-opened" });
    } else {
      this.setState({ bDropdownStyle: " dropdown-closed" });
    }
  };

  getUserName = (email) => {
    var userName = "";
    var index = email.indexOf('@');
    if (index > 15) {
      userName = email.slice(0, 15) + "...";
    } else {
      userName = email.slice(0, index);
    }
    return userName;
  }

  render() {
    const { login, bDropdownStyle } = this.state;
    var userName = this.getUserName(login);

    return (
      <div className="navbar">
        <div className="navbar-menu">
          <button className="btn-menu" onClick={this.state.onMenuClicked}>
            <SVG
              src={require("../../assets/images/navbar-mobile-menu-icon.svg")}
            />
          </button>
        </div>
        <div className="navbar-search">
          <SVG
            className="navbar-search-icon"
            src={require("../../assets/images/navbar-search-icon.svg")}
          />
          <div className="navbar-search-input">
            <input
              className="input-field"
              type="text"
              placeholder="Search growth experiment"
            />
          </div>
        </div>
        <div className="navbar-btn-section">
          <div className="btn-settings-section">
            <button className="btn-settings">
              <img
                src={require("../../assets/images/navbar-settings-icon.png")}
                alt=""
              />
            </button>
          </div>
          <div className="dropdown">
            <div className="dropdown-trigger" onClick={() => this.onDropdownClicked()}>
              <button className="btn-user">V</button>
            </div>
            <div className={"dropdown-content" + bDropdownStyle}>
              <div className="dropdown-content__identify">
                Signed in as <br /> <b>{userName}</b>
              </div>
              <div className="dropdown-content__divider" />
              <button className="btn-logout" onClick={() => this.doLogout()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(Header));
// export default connect()(Header);
