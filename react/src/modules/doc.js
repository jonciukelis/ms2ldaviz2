//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//Table import
import Table from './table.js'

//Chart import
import MassChart from './mass_chart.js'

export default class DocPage extends React.Component {
    constructor(props) {
        super(props);
        let key = props.dockey
        let lda = props.lda
        
        let features = []
        let featuresc = [{Header: 'Key', accessor: 'key'}, {Header: 'Intensity', accessor: a => Number(a.inten), sortMethod: (a, b) => Number(a)-Number(b)}]
        
        for (let a of Object.keys(lda.corpus[key]))
          features.push({key: a, inten: lda.corpus[key][a]})

        let motifs = []

        let motifsc = [
          {Header: 'Key', accessor: 'key'},
          {Header: 'Probability', accessor: a => Number(a.prob).toFixed(5), sortMethod: (a, b) => Number(a)-Number(b)},
          {Header: 'Overlap', accessor: a => Number(a.over).toFixed(7), sortMethod: (a, b) => Number(a)-Number(b)},
        ]

        for (let a of Object.keys(lda.theta[key])) {
          if(lda.theta[key][a]>props.options.thresholds.probability && lda.overlap_scores[key][a]>props.options.thresholds.overlap)
            motifs.push({
              key: a,
              prob: lda.theta[key][a],
              over: lda.overlap_scores[key][a]
            })
        }

        //props.data = {peaks: [[],[],[]], losses: [[],[],[]],}
        let chartData = {peaks: [], losses: []}
        let chart2Data = {peaks: [], losses: []}
        for (let a of Object.keys(lda.corpus[key])){
          if(a.includes('fragment')){
            chartData.peaks.push([Number(a.split('_')[1]), lda.corpus[key][a]])
          }
          else {
            chart2Data.losses.push([Number(a.split('_')[1]), lda.corpus[key][a]])
          }
        }
        let fragments = false
        let losses = false
        if(chartData.peaks.length !== 0)fragments = true;
        if(chart2Data.losses.length !== 0)losses = true;

        console.log(chartData)

        this.state = {
          fragments: fragments,
          losses: losses,
          chartData: chartData,
          chart2Data: chart2Data,
          dockey: key,
          info: lda.doc_metadata[key],
          features: features,
          motifs: motifs,
          featuresc: featuresc,
          motifsc: motifsc,
          lda: lda
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
    infoChange(e, name){
      let info = this.state.info
      info[name] = e.target.value

      this.setState({
        info: info
      })
    }
    isReadOnly(key){
      let immutable = ['parentmass']
      if(immutable.includes(key))
        return true
      else
        return false
    }
    william(data) {
      var url = "/mass_spec_project/index.html"
      var popUpObj = window.open(url, "Popup","toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=1400,height=850,left = 0,top = 0");
      popUpObj.addEventListener('load', ()=>{popUpObj.peakArray = []; setTimeout(()=>{popUpObj.clearPlot(); setTimeout(()=>{popUpObj.getData(data)},500)},500);}, false);     
    } 

    render() {
        return (
          <div>
            <Card body>
            <Button onClick={()=>{this.william(this.state.chartData)}}>Link to mass_spec</Button>
            </Card>
            <br/>
            {this.state.fragments?
            <Card body>
            <Card.Header>Fragments in Doc</Card.Header>
              <MassChart data={this.state.chartData}></MassChart>
            </Card>: null}
            <br/>
            {this.state.losses?
            <Card body>
            <Card.Header>Losses in Doc</Card.Header>
              <MassChart data={this.state.chart2Data}></MassChart>
            </Card>: null}
            <br/>
            <Card body>
              <Card.Header>Info about the Doc: </Card.Header>
              <ListGroup>
                {Object.keys(this.state.info).map( key => { return (
                  <ListGroup.Item>
                  <Form.Group
                        as={Row}
                        key={key}
                        >
                        <Form.Label column sm="4">{key}</Form.Label>
                        <Col sm="5">
                          <Form.Control
                          value={null === this.state.info[key] ? "" : this.state.info[key]}
                          readOnly={this.isReadOnly(key)}
                          onChange={(e, name = key) => {this.infoChange(e,name)}}
                        />
                        </Col>
                  </Form.Group>
                  </ListGroup.Item>
                )})}
              </ListGroup>
              {/* <ListGroupItem><pre>{JSON.stringify(this.state.info, null, 2)}</pre></ListGroupItem> */}
            </Card>
            <br />
            <Card body>
              <Card.Header>Motifs assosiated with Doc</Card.Header>
              <ListGroup>
                {/* {this.state.motifs.map(key => { return (<ListGroup.Item key={key} action onClick={() => this.props.showMotif(key)}>{key}</ListGroup.Item>) })} */}
                <Table data={this.state.motifs} columns={this.state.motifsc} onClick={(key)=>{this.props.showMotif(key)}}/>
              </ListGroup>
            </Card>
            <br />
            <Card body>
              <Card.Header>Features in the Doc</Card.Header>
              <ListGroup>
                {/* {this.state.features.map(key => { return (<ListGroup.Item key={key}>{key}</ListGroup.Item>) })} */}
                <Table data={this.state.features} columns={this.state.featuresc} onClick={()=>{}}/>
              </ListGroup>
            </Card>
          </div>
        );
      }
}