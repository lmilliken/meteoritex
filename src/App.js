import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import AppBar from './components/AppBar';
import SearchBar from './components/SearchBar';
import Table from './components/Table';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    // const meteorites = await axios.get(
    //   'https://data.nasa.gov/resource/gh4g-9sfh.json'
    // );
    // await this.setState({ meteorites: meteorites.data });
    // console.log('length: ' + typeof meteorites.data);
  }

  handleSearch(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    return (
      <div className='App'>
        <AppBar />
        <SearchBar handleSearch={this.handleSearch} />
        <Table searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}
