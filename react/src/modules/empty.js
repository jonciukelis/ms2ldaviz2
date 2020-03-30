//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';


export default class DocsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <header className={"vertical-center d-flex justify-content-center"}>
                <h1>
                    Import a file or press Example to get started!
                </h1>
            </header>
        );
    }
}