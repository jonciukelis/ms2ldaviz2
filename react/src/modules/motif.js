//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem';

//Table import
import Table from './table.js'

export default class MotifPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          motifkey: this.props.motifkey,
          info: this.props.lda.topic_metadata[this.props.motifkey],
          features: this.props.features,
          docs: this.props.docs,
          lda: this.props.lda, 
          options: this.props.options
        }
    }

    //FOR REFERANCE

    // let options = {
    //   docs: [],
    //   motifs: [],
    //   thresholds: {
    //     overlap: 0, //Overlap scores
    //     propability: 0 //Theta
    //   }
    // }

    //<Table data={data} columns={this.state.columns} onClick={(key)=>{this.props.showMotif(key)}}/>

    // const data = []
    //     for (let key of Object.keys(this.state.searchData)) {
    //         if (this.state.searchData[key].includes(this.state.searchtemp)){
    //             data.push({key: key,...this.state.lda.topic_metadata[key]})
    //         }
    //     }
    // let columns = []
    // columns.push({Header: 'Key', accessor: 'key'})
    // for (let key of Object.keys(props.lda.topic_metadata[Object.keys(props.lda.topic_metadata)[0]])) {
    //     if(props.options.motifs[key])
    //     columns.push({Header: key, accessor: key})
    // }

    // showMotif(key) {
    //   console.log("showmotif: " + key)
    //   let features = []
    //   let docs = []
    //   for (let a of Object.keys(this.state.lda.beta[key])) { features.push(a) }
    //   for (let a of Object.keys(this.state.lda.theta)) {
    //     for (let b of Object.keys(this.state.lda.theta[a])) {
    //       if (b === key) {
    //         if (!docs.includes(a)) {
    //           docs.push(a)
    //         }
    //       }
    //     }
    //   }
    //   this.setState({
    //     modal: true,
    //     modalName: (<h1>Motif page of {key}</h1>),
    //     showmotif: true,
    //     showdoc: false,
    //     features: features,
    //     motifs: [],
    //     docs: docs,
    //     motifkey: key,
    //   })
    // }


    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Info about the Motif: </Card.Header>
              <ListGroupItem><pre>{JSON.stringify(this.state.info, null, 2)}</pre></ListGroupItem>
            </Card>
            <br />
            <Card body>
              <Card.Header>Docs assosiated with Motif</Card.Header>
              <ListGroup>
                {this.state.docs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showDoc(key)}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Features assosiated with Motif</Card.Header>
              <ListGroup>
                {this.state.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
          </div>
        );
      }
}