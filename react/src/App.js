//React imports
import React from 'react';

//Style import
import './modules/App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
// import ListGroupItem from 'react-bootstrap/ListGroupItem';

//Other imports


//Component Classes

//Share experiment
import GenerateLink from './modules/generate.js';

//About page
import AboutPage from './modules/about.js';

//Import JSON page
import ImportJSON from './modules/import.js';

//Import Docs page
import DocPage from './modules/doc.js';

//Import Motifs page
import MotifPage from './modules/motif.js';

//Import Docs page
import DocsPage from './modules/docs.js';

//Import Motifs page
import MotifsPage from './modules/motifs.js';

//Import Motifs page
import EmptyPage from './modules/empty.js';

//Import Options page
import Options from './modules/options.js';

//Table testing
//import EmptyPage from './modules/table.js';


//Main app class
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalName: "",
      modalBody: "",
      imported: false,
      about: false,
      import: false,
      legacy: false,
      showdoc: false,
      showmotif: false,
      showgenerate: false,
      bydocs: false,
      bymotifs: false,
      dockey: "",
      motifkey: "",
      lda: {},
      features: [],
      motifs: [],
      docs: [],
      showOptions: false,
      options: {
        docs: [],
        motifs: [],
        thresholds: [],
      }
    };
    let url_string = window.location.href; // www.test.com?filename=test
    let url = new URL(url_string);
    let paramValue = decodeURIComponent(url.searchParams.get("fetch_project"));
    if (paramValue) { this.linkToState(paramValue); console.log(paramValue) }
  }

  //Site Modal management ====================================================================
  CenterModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  setModalShow(showstate) {
    if (showstate === false) {
      this.setState({
        modalName: "",
        about: false,
        import: false,
        legacy: false,
        showOptions: false,
        modal: false,
        showdoc: false,
        showmotif: false,
        showgenerate: false,
      })
    } else {
      this.setState({
        modal: true,
      })
    }
  }

  linkModal() {
    console.log("link1")
    this.setState({
      modalName: (<h1>Generate a sharable link</h1>),
      modal: true,
      showgenerate: true,
    })
  }

  importJSON() {
    console.log("import1")
    this.setState({
      modal: true,
      modalName: "Import",
      import: true,
    })
  }

  aboutModal() {
    console.log("about1")
    this.setState({
      modalName: (<h1>About</h1>),
      modal: true,
      about: true,
    })
  }

  optionsModal() {
    console.log("options1")
    this.setState({
      modalName: (<h1>Options</h1>),
      modal: true,
      showOptions: true,
    })
  }
  optionChange(options){
    this.setState({
      options: options,
    })
  }

  //Large unseperated modal functions
  showDoc(key) {
    console.log("showdoc: " + key)
    let features = []
    let motifs = []
    for (let a of Object.keys(this.state.lda.phi[key])) { features.push(a) }
    for (let a of Object.keys(this.state.lda.phi[key])) {
      for (let b of Object.keys(this.state.lda.phi[key][a]))
        if (!motifs.includes(b)) {
          motifs.push(b)
        }
    }
    this.setState({
      modal: true,
      modalName: (<h1>Docs page of {key}</h1>),
      showdoc: true,
      showmotif: false,
      features: features,
      motifs: motifs,
      dockey: key,
    })
  }

  showMotif(key) {
    console.log("showmotif: " + key)
    let features = []
    let docs = []
    for (let a of Object.keys(this.state.lda.beta[key])) { features.push(a) }
    for (let a of Object.keys(this.state.lda.theta)) {
      for (let b of Object.keys(this.state.lda.theta[a])) {
        if (b === key) {
          if (!docs.includes(a)) {
            docs.push(a)
          }
        }
      }
    }
    this.setState({
      modal: true,
      modalName: (<h1>Motif page of {key}</h1>),
      showmotif: true,
      showdoc: false,
      features: features,
      motifs: [],
      docs: docs,
    })
  }

  //Other functions
  exportJSON() {
    console.log("export1")
    var a = document.createElement('A');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(this.state.lda)]));
    a.download = "exportedLDA.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  example() {
    this.linkToState("../example/")
  }

  linkToState(url) {
    fetch(url, { mode: 'no-cors' })
      .then(response => response.text())
      .then(data => {
        this.setState({
          lda: JSON.parse(data),
          imported: true,
          bydocs: true,
          loading: false,
        })
      })
      .catch(error => console.error(error));
  }

  discardLDA() {
    console.log("discard")
    this.setState({
      imported: false,
      lda: "",
    })
  }

  fileJSON(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        lda: JSON.parse(event.target.result),
        imported: true,
        bydocs: true,
        loading: false,
      })
      this.setModalShow(false)
    };
    reader.readAsText(file)
  }

  byToggle(val) {
    this.setState({
      bydocs: val,
      bymotifs: !val,
    })
  }

  render() {
    return (
      <div className="MS2LDAviz2">
        <Navbar fixed="top" bg="light" expand="lg">
          <Navbar.Brand href="#home">MS2LDAviz2</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.state.imported ?
                < >
                  <Nav.Link onClick={() => this.exportJSON()}>Export</Nav.Link>
                  <NavDropdown title="Explore LDA" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => this.byToggle(true)}>By Docs</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => this.byToggle(false)}>By Mass2Motifs</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Store In-Browser</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={() => this.discardLDA()}>Discard</Nav.Link>
                  <Nav.Link onClick={() => this.optionsModal()}>Options</Nav.Link>
                </ > : < >
                  <Nav.Link onClick={() => this.importJSON()}>Import</Nav.Link>
                  <Nav.Link target="_blank" href={"../legacy/"} >Legacy</Nav.Link>
                </ >}
            </Nav>
            <Nav.Link onClick={() => this.linkModal()}>Share</Nav.Link>
            <Nav.Link onClick={() => this.example()}>Example</Nav.Link>
            <Nav.Link onClick={() => this.aboutModal()}>About</Nav.Link>
          </Navbar.Collapse>
        </Navbar>

        {!this.state.imported ? <EmptyPage/> : null }
        {this.state.imported && this.state.bydocs ? <DocsPage lda={this.state.lda} showDoc={(key) => this.showDoc(key)} /> : null}
        {this.state.imported && this.state.bymotifs ? <MotifsPage lda={this.state.lda} showMotif={(key) => this.showMotif(key)} /> : null}

        <this.CenterModal
          show={this.state.modal}
          onHide={() => this.setModalShow(false)}
          title={this.state.modalName}>
          {this.state.showgenerate ?
            <GenerateLink /> : null}
          {this.state.about ?
            <AboutPage /> : null}
          {this.state.import ?
            <ImportJSON onChange={e => this.fileJSON(e)} /> : null}
          {this.state.showOptions ?
            <Options options={this.state.options} optionChange={(options) => this.optionChange(options)} /> : null}
          {this.state.showdoc ?
            <DocPage info={this.state.lda.doc_metadata[this.state.dockey]} features={this.state.features} motifs={this.state.motifs} showMotif={(key) => this.showMotif(key)} /> : null}
          {this.state.showmotif ?
            <MotifPage features={this.state.features} docs={this.state.docs} showDoc={(key) => this.showDoc(key)} /> : null}
        </this.CenterModal>
      </div>
    );
  }
}

export default App;