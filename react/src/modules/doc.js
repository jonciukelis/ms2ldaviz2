//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem';


export default class DocPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Info about the Doc: </Card.Header>
              <ListGroupItem><pre>{JSON.stringify(this.props.info, null, 2)}</pre></ListGroupItem>
            </Card>
            <br />
            <Card body>
              <Card.Header>Motifs assosiated with Doc</Card.Header>
              <ListGroup>
                {this.props.motifs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showMotif(key)}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Features in the Doc</Card.Header>
              <ListGroup>
                {this.props.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
          </div>
        );
      }
}