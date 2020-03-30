//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


export default class GenerateLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            given_link: "http://...",
            generated_link: "",
        }
    }

    //Encode given url
    generate_experiment_link(url) {
        url = url.target.value
        let enc = encodeURIComponent(url)
        let url2 = window.location.href + '?fetch_project=' + enc
        this.setState({
            given_link: url,
            generated_link: url2,
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formForLink">
                        <Form.Label>External Link Url</Form.Label>
                        <Form.Control
                            placeholder={this.state.given_link}
                            onChange={(e) => this.generate_experiment_link(e)}
                        />
                        <Form.Text className="text-muted">
                            Link to json file donwload hosted externally.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formForGLink">
                        <Form.Label>Link for quick access</Form.Label>
                        <Form.Control
                            value={this.state.generated_link}
                            readOnly
                        />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}