import React from 'react';
import './App.css';

import createPlotlyComponent from 'react-plotlyjs';

import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class FreqChart extends React.Component {
    constructor(props) {
        super(props);

        let frag = []
        let inst = []
        let intenM = []
        let intenD = []

        //props.data = {thing: [inst, intenM, intenD]}

        for (let thing of Object.keys(props.data)) {
            frag.push(thing)
            inst.push(props.data[thing][0])
            intenM.push(props.data[thing][1])
            intenD.push(props.data[thing][2])
        }

        this.state = {
            frag: frag,
            inst: inst,
            intenM: intenM,
            intenD: intenD
        }
    }

    render() {
        let data = [
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: this.state.frag,   // more about "x": #bar-x
                y: this.state.inst,     // more about "x": #bar-x
                name: 'Instances in Motif Docs', // #bar-name
                marker: {
                    opacity: 0.7,
                }
            },
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: this.state.frag,     // more about "x": #bar-x
                y: this.state.intenD,     // more about "x": #bar-x
                name: 'Total Intensity', // #bar-name
                yaxis: 'y2',
                marker: {
                    opacity: 0.5,
                }
            },
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: this.state.frag,   // more about "x": #bar-x
                y: this.state.intenM,     // more about "x": #bar-x
                name: 'Motif Intensity', // #bar-name
                yaxis: 'y2',
                marker: {
                    opacity: 0.5,
                }
            },
        ];
        let layout = {                     // all "layout" attributes: #layout
            title: 'Feature Counts',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: 'feature'         // more about "layout.xaxis.title": #layout-xaxis-title
            },
            yaxis: { title: 'instances' },
            yaxis2: {
                title: 'intensity',
                overlaying: 'y',
                side: 'right'
            }
        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        return (
                <PlotlyComponent className="Chart" data={data} layout={layout} config={config} />
        );
    }
}

export default FreqChart;