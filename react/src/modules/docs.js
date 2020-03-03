//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
// import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl';
//import Table from 'react-bootstrap/Table'

//Other imports
import debounce from 'lodash.debounce';

//Table import
import Table from './table.js'

export default class DocsPage extends React.Component {
    constructor(props) {
        super(props);
        //Searchable string
        let searchData = {}
        for (let key of Object.keys(props.lda.doc_metadata)) {
            searchData[key] = JSON.stringify(props.lda.doc_metadata[key])
        }
        //Top level keys
        let columns = []
        columns.push({Header: 'Name', accessor: 'name'})
        for (let key of Object.keys(props.lda.doc_metadata[Object.keys(props.lda.doc_metadata)[0]])) {
            columns.push({Header: key, accessor: key})
        }
        //Metadata
        let data = []
        for (let key of Object.keys(props.lda.doc_metadata)) {
            data.push({name: key,...props.lda.doc_metadata[key]})
        }
        this.state = {
            search: "",
            searchtemp: "",
            columns: columns,
            searchData: searchData,
            data: data
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
        return (
            <Card body className="mx-auto">
                <Card.Header>
                    <h1>Showing Docs</h1>
                    <FormControl
                        onChange={e => this.searchFilter(e)}
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                </Card.Header>
                <Table data={this.state.data} columns={this.state.columns} onClick={(key)=>{this.props.showDoc(key)}}/>
            </Card>
        );
    }
}