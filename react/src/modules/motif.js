//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'


export default class MotifPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Docs assosiated with Motif</Card.Header>
              <ListGroup>
                {this.props.docs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showDoc(key)}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Features assosiated with Motif</Card.Header>
              <ListGroup>
                {this.props.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
          </div>
        );
      }
}