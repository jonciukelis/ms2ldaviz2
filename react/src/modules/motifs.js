//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
// import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl';

//Other imports
import debounce from 'lodash.debounce';

//Table import
import Table from './table.js'


export default class MotifsPage extends React.Component {
    constructor(props) {
        super(props);
        //Searchable string
        let searchData = {}
        for (let key of Object.keys(props.lda.topic_metadata)) {
            searchData[key] = JSON.stringify(props.lda.topic_metadata[key])
        }
        
        this.state = {
            search: "",
            searchtemp: "",
            //columns: columns,
            searchData: searchData,
            lda: props.lda, 
            options: props.options
        }
        this.onChangeDebounced = debounce(this.onChangeDebounced, 500)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.searchtemp !== nextState.searchtemp) {
            return false;
        } else {
            return true;
        }
    }
    
    searchFilter(e) {
        this.setState({
            searchtemp: e.target.value
        })
        this.onChangeDebounced(e.target.value)
    }

    onChangeDebounced = (e) => {
        if (this.state.searchtemp === e)
        this.setState({
            search: this.state.searchtemp
        })
    }

    render() {
        //Top level keys
        const columns = []
        columns.push({Header: 'Key', accessor: 'key'})
        columns.push({Header: 'Degree', accessor: 'degree'})
        for (let key of Object.keys(this.state.lda.topic_metadata[Object.keys(this.state.lda.topic_metadata)[0]]))
            if(this.state.options.motifs[key])
                columns.push({Header: key, accessor: key})

        const data = []
        for (let key of Object.keys(this.state.searchData)) {
            if (this.state.searchData[key].includes(this.state.searchtemp)){
                //get degree
                let docs = []
                let degree = 0
                for (let a of Object.keys(this.state.lda.theta))
                    for (let b of Object.keys(this.state.lda.theta[a]))
                      if (b === key)
                        if (!docs.includes(a))
                          if(this.state.lda.overlap_scores[a][b]>this.state.options.thresholds.overlap && this.state.lda.theta[a][b]>this.state.options.thresholds.probability)
                            {degree += 1; docs.push(a)}

                data.push({key: key, degree: degree,...this.state.lda.topic_metadata[key]})
            }
        }

        return (
            <Card body className="mx-auto">
                <Card.Header>
                    <h1>Showing Motifs</h1>
                    <FormControl
                        onChange={e => this.searchFilter(e)}
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                </Card.Header>
                <Table data={data} columns={columns} onClick={(key)=>{this.props.showMotif(key)}}/>
            </Card>
        );
        // return (
        //     <Card body className="mx-auto">
        //         <Card.Header>
        //             <h1>Showing Motifs</h1>
        //             <FormControl onChange={e => this.searchFilter(e)} type="text" placeholder="Search" className="mr-sm-2" />
        //         </Card.Header>
        //         <ListGroup>{Object.keys(this.props.lda.beta).map((key, index) => {
        //             if (key.includes(this.state.search))
        //                 return (<ListGroup.Item action key={index} onClick={() => this.props.showMotif(key)}>{key}</ListGroup.Item>)
        //             else return null
        //         })}</ListGroup>
        //     </Card>
        // );
    }
}