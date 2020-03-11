import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Label, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import './App.css';

class App extends Component {
  state = {
    name: 'coco',
    receiptId: 1,
    price1: 100,
    price2: 55,
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <Label style={{}}>hello!</Label>
        <Button inverted color='red'>
          Red
      </Button>
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
