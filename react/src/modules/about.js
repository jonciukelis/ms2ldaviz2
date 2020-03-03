//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';


export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <p>Developer: Domantas Jonas Sakalys</p>
                <p>Original website could be found here: <a href="http://www.ms2lda.org">www.ms2lda.org</a></p>
            </div>
        );
    }
}