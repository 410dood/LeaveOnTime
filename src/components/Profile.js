import React, { Component } from 'react';
// import '../App.css';
// import Navigation from './Navigation';
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

axios


class Profile extends Component {
  render() {
    return (
      <div className="App img2">
        <Container className="nomargin">
          {/* <Row>
            <Col>
            <Navigation />
            </Col>
          </Row> */}
        </Container>
        <Container>
          <Row>
            <Col>
              <h4>Hello, enter or update your home address below</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form className="homeform">
                <Row className="justify-content-center">
                  <FormGroup>
                    <h3 className="home">Home</h3>
                  </FormGroup>
                </Row>
                <Row className="justify-content-center">
                  <FormGroup>
                    <Col sm="12">
                      <Input
                        className="locwide"
                        type="address"
                        name="address"
                        id="address"
                        placeholder="Street address"
                      />
                    </Col>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <Col sm={{ size: 12, order: 2, offset: 1 }}>
                      <Input
                        type="city"
                        name="city"
                        id="city"
                        placeholder="City"
                      />
                    </Col>
                  </FormGroup>
                  <Col sm={{ size: 5, order: 2, offset: 0 }}>
                    <FormGroup>
                      <Input type="select" name="state" id="stateSelect">
                        <option>State</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Askansas</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Connecticut</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Idaho</option>
                        <option>Illinois</option>
                        <option>Indiana</option>
                        <option>Iowa</option>
                        <option>Kansas</option>
                        <option>Kentucky</option>
                        <option>Louisiana</option>
                        <option>Maine</option>
                        <option>Maryland</option>
                        <option>Massachusetts</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Mississippi</option>
                        <option>Missouri</option>
                        <option>Montana</option>
                        <option>Nebraska</option>
                        <option>Nevada</option>
                        <option>New Hampshire</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                        <option>North Carolina</option>
                        <option>North Dakota</option>
                        <option>Ohio</option>
                        <option>Oklahoma</option>
                        <option>Oregon</option>
                        <option>Pennsylvania</option>
                        <option>Rhode Island</option>
                        <option>South Carolina</option>
                        <option>South Dakota</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Utah</option>
                        <option>Vermont</option>
                        <option>Virginia</option>
                        <option>Washington</option>
                        <option>West Virginia</option>
                        <option>Wisconsin</option>
                        <option>Wyoming</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <FormGroup>
                    <Col sm={{ size: 7, offset: 3 }}>
                      <Input
                        type="zip"
                        name="zip"
                        id="zip"
                        placeholder="Zip Code"
                      />
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="justify-content-center">
                  <FormGroup check row>
                    <Col sm={{ size: 10 }}>
                      <Button className="Dbut">Submit</Button>                  </Col>
                  </FormGroup>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container className="foot">
          <Row>
            <Col>
              <footer>
                © 2018 BDABRK. All rights reserved.
              </footer>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;