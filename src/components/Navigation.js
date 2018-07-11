import React from 'react';
import { Nav, NavItem, Row } from 'reactstrap';
import './App.css';
import { Link } from 'react-router-dom';
import * as routes from './constants/routes';
import SignOutButton from './Signout';

class Navigation extends React.Component {
  render() {
    return (
      <div className="nav">
        <Row className="justify-content-center">
          <p className="navtitle">Leave!</p>
          <Nav vertical>
            <NavItem className="navitem">
              <Link
              className="link"
              to={routes.DASHBOARD}>
              Dashboard</Link>
            </NavItem>
            <NavItem className="navitem">
              <Link 
              className="link"
              to={routes.PROFILE}
              >Profile</Link>
            </NavItem>
            <NavItem className="navitem navbottom">
              <Link 
              className="link"
              to={routes.DESTINATIONS}
              >Destinations</Link>
            </NavItem>
            <NavItem><SignOutButton /></NavItem>
          </Nav>
        </Row>
      </div>
    );
  }
}

export default Navigation;