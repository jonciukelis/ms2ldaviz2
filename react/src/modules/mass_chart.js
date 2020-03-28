import React from 'react';
import './App.css';

import createPlotlyComponent from 'react-plotlyjs';

import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class MassChart extends React.Component {
  constructor(props) {
    super(props);
    
    //props.data = {peaks: [[],[],[]], losses: [[],[],[]],}
    //Appears just in docs!
    

    let featureNames = []
    let featureValues = []
    let lossNames = []
    let lossValues = []
    for(let a of props.data.peaks){
        featureNames.push(a[0])
        featureValues.push(a[1])
    }
    for(let a of props.data.losses){
        lossNames.push(a[0])
        lossValues.push(a[1])
    }
    this.state = {
        featureNames: featureNames,
        featureValues: featureValues,
        lossNames: lossNames,
        lossValues: lossValues,
    };
  }

  render() {
    let data = [
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: this.state.featureNames,     // more about "x": #bar-x
        y: this.state.featureValues,     // more about "x": #bar-x
        name: 'features' // #bar-name
      },
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: this.state.lossNames,     // more about "x": #bar-x
        y: this.state.lossValues,     // more about "x": #bar-x
        name: 'losses' // #bar-name
      }
    ];
    let layout = {                     // all "layout" attributes: #layout
      title: 'Mass Spectrometry Plot',  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: 'm/z'         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      yaxis: {
          title: 'Intensity'
      },
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (
      <PlotlyComponent className="Chart" data={data} layout={layout} config={config}/>
    );
  }
}

export default MassChart;