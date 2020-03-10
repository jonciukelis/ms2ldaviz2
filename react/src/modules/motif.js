//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
//import ListGroupItem from 'react-bootstrap/ListGroupItem';

//Table import
import Table from './table.js'

export default class MotifPage extends React.Component {
  constructor(props) {
    super(props);
    let key = props.motifkey
    let lda = props.lda
    
    
    let features = []
    let featuresc = [{Header: 'Key', accessor: 'key'}, {Header: 'Probability', accessor: 'prob'}]
    for (let a of Object.keys(lda.beta[key]))
      features.push({key: a, prob: lda.beta[key][a]})


    let docs = []
    let docsc = [
      {Header: 'Key', accessor: 'key'},
      {Header: 'Probability', accessor: a => Number(a.prob).toFixed(5), sortMethod: (a, b) => Number(a)-Number(b)},
      {Header: 'Overlap', accessor: a => Number(a.over).toFixed(7), sortMethod: (a, b) => Number(a)-Number(b)},
    ]
    
    for (let a of Object.keys(lda.theta)) {
      for (let b of Object.keys(lda.theta[a])) {
        if (b === key) {
          if (!docs.includes(a)) {
            if(lda.overlap_scores[a][b]>props.options.thresholds.overlap && lda.theta[a][b]>props.options.thresholds.probability)
            docs.push({
              key: a,
              prob: lda.theta[a][b],
              over: lda.overlap_scores[a][b],
            })
          }
        }
      }
    }


    this.state = {
      motifkey: key,
      info: lda.topic_metadata[key],
      features: features,
      featuresc: featuresc,
      docs: docs,
      docsc: docsc,
      lda: lda,
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
  infoChange(e, name){
    let info = this.state.info
    info[name] = e.target.value

    this.setState({
      info: info
    })
  }
  isReadOnly(key){
    let immutable = []
    if(immutable.includes(key))
      return true
    else
      return false
  }


  render() {
    return (
      <div>
        <Card body>
          <Card.Header>Info about the Motif: </Card.Header>
          <ListGroup>
            {Object.keys(this.state.info).map(key => {
              return (
                <ListGroup.Item key={key}>
                  <span>{key}</span>
                  <input
                    value={null === this.state.info[key] ? "" : this.state.info[key]}
                    readOnly={this.isReadOnly(key)}
                    onChange={(e, name = key) => {this.infoChange(e,name)}}
                  />
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          {/* <ListGroupItem><pre>{JSON.stringify(this.state.info, null, 2)}</pre></ListGroupItem> */}
        </Card>
        <br />
        <Card body>
          <Card.Header>Docs assosiated with Motif</Card.Header>
          <ListGroup>
            <Table data={this.state.docs} columns={this.state.docsc} onClick={(key)=>{this.props.showDoc(key)}}/>
            {/* {this.state.docs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showDoc(key)}>{key}</ListGroup.Item>) })} */}
          </ListGroup>
        </Card>
        <br />
        <Card body>
          <Card.Header>Features assosiated with Motif</Card.Header>
          <ListGroup>
            <Table data={this.state.features} columns={this.state.featuresc} onClick={()=>{}}/>
            {/* {this.state.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })} */}
          </ListGroup>
        </Card>
      </div>
    );
  }
}