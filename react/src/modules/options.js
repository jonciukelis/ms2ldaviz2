//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FormGroup from 'react-bootstrap/FormGroup'


export default class MotifPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motifs: props.options.motifs,
            docs: props.options.docs,
            thresholds: props.options.thresholds
        }
    }
    docsChange(e, name, value){
      let docs = this.state.docs
      docs[name] = e.target.checked
      this.setState({
        docs: docs
      })
    }
    motifsChange(e, name, value){
      let motifs = this.state.motifs
      motifs[name] = e.target.checked
      this.setState({
        motifs: motifs
      })
    }
    thresholdsChange(e, name){
      let thresholds = this.state.thresholds
      thresholds[name] = e.target.value
      this.setState({
        thresholds: thresholds
      })
    }
    // componentWillUnmount(){
    //   let options = {
    //     motifs: this.state.motifs,
    //     docs: this.state.docs,
    //     thresholds: this.state.thresholds
    //   }
    //   this.props.optionChange(options)
    // }

    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Docs View options</Card.Header>
              <ListGroup>
              {/* action onClick={() => this.props.showDoc(key)} */}
                {Object.keys(this.state.docs).map(key => {return (
                  <ListGroup.Item>
                    <Form.Check 
                    type={"checkbox"}
                    id={"default-checkbox"}
                    key={key}
                    label={key}
                    checked={this.state.docs[key]}
                    onChange={(e, name = key) => {this.docsChange(e, name)}}
                    />
                  </ListGroup.Item>
                )})}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Motif View options</Card.Header>
              <ListGroup>
                {Object.keys(this.state.motifs).map(key => {return (
                  <ListGroup.Item>
                    <Form.Check 
                    type={"checkbox"}
                    id={"default-checkbox"}
                    key={key}
                    label={key}
                    checked={this.state.motifs[key]}
                    onChange={(e, name = key) => {this.motifsChange(e, name)}}
                    />
                  </ListGroup.Item>
                )})}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Thresholds</Card.Header>
              <ListGroup>
                {Object.keys(this.state.thresholds).map(key => {
                  return (
                  <ListGroup.Item>
                    <Form.Group
                      as={Row}
                      key={key}
                      >
                      <Form.Label column sm="4">{key}</Form.Label>
                      <Col sm="5">
                        <Form.Control
                        value={this.state.thresholds[key]}
                        onChange={(e, name = key) => {this.thresholdsChange(e, name)}}
                      />
                      </Col>
                  </Form.Group>
                </ListGroup.Item> )})}
              </ListGroup>
            </Card>
          </div>
        );
      }
}