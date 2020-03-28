//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ImportJSON extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
        }
    }

    render() {
        return (
            <div>
                {!this.state.loading ?
                    <div>
                        <p>Import a JSON of an LDA file.</p>
                        <p>Please go to the Legacy option if you have a .dict file</p>
                        <input
                            type="file"
                            accept=".json"
                            onChange={(e) => {
                                this.props.onChange(e)
                                this.setState({
                                    loading: true,
                                })
                                }} />
                    </div>
                : <p>Loading, this takes a couple of seconds</p>}
            </div>
        );
    }
}