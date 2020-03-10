//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
//import ListGroupItem from 'react-bootstrap/ListGroupItem';


export default class DocPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dockey: this.props.dockey,
          info: this.props.lda.doc_metadata[this.props.dockey],
          features: this.props.features,
          motifs: this.props.motifs,
          lda: this.props.lda
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

    // showDoc(key) {
    //   console.log("showdoc: " + key)
    //   let features = []
    //   let motifs = []
    //   for (let a of Object.keys(this.state.lda.phi[key])) { features.push(a) }
    //   for (let a of Object.keys(this.state.lda.phi[key])) {
    //     for (let b of Object.keys(this.state.lda.phi[key][a]))
    //       if (!motifs.includes(b)) {
    //         motifs.push(b)
    //       }
    //   }
    //   this.setState({
    //     modal: true,
    //     modalName: (<h1>Docs page of {key}</h1>),
    //     showdoc: true,
    //     showmotif: false,
    //     features: features,
    //     motifs: motifs,
    //     dockey: key,
    //   })
    // }


    render() {
        return (
          <div>
            <Card body>
              <Card.Header>Info about the Doc: </Card.Header>
              <ListGroup>
                {Object.keys(this.state.info).map( key => { return (
                  <ListGroup.Item key={key}>
                    <span>{key}</span>
                    <input
                      value={this.state.info[key]}
                      onChange={() => {}}
                    />
                  </ListGroup.Item>
                )})}
              </ListGroup>
              {/* <ListGroupItem><pre>{JSON.stringify(this.state.info, null, 2)}</pre></ListGroupItem> */}
            </Card>
            <br />
            <Card body>
              <Card.Header>Motifs assosiated with Doc</Card.Header>
              <ListGroup>
                {this.state.motifs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showMotif(key)}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Features in the Doc</Card.Header>
              <ListGroup>
                {this.state.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })}
              </ListGroup>
            </Card>
          </div>
        );
      }
}