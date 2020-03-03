//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'


export default class MotifPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options
        }
    }
    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Docs View options</Card.Header>
              <ListGroup>
              {/* action onClick={() => this.props.showDoc(key)} */}
                {this.state.options.motifs.map(key => {return (
                    <Form.Check 
                    type={"checkbox"}
                    id={"default-checkbox"}
                    label={key[0]}
                    value={key[1]}
                    />
                )})}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Motif View options</Card.Header>
              <ListGroup>
                {this.state.options.motifs.map(key => {return (
                    <Form.Check 
                    type={"checkbox"}
                    id={"default-checkbox"}
                    label={key[0]}
                    value={key[1]}
                    />
                )})}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Thresholds</Card.Header>
              <ListGroup>
                {this.state.options.thresholds.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
          </div>
        );
      }
}