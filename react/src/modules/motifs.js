//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl';

//Other imports
import debounce from 'lodash.debounce';


export default class MotifsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchtemp: "",
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
                    <h1>Showing Motifs</h1>
                    <FormControl onChange={e => this.searchFilter(e)} type="text" placeholder="Search" className="mr-sm-2" />
                </Card.Header>
                <ListGroup>{Object.keys(this.props.lda.beta).map((key, index) => {
                    if (key.includes(this.state.search))
                        return (<ListGroup.Item action key={index} onClick={() => this.props.showMotif(key)}>{key}</ListGroup.Item>)
                    else return null
                })}</ListGroup>
            </Card>
        );
    }
}