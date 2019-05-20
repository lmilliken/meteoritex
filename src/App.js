import React, { Component } from 'react';

import './App.css';
import AppBar from './components/AppBar';
import SearchBar from './components/SearchBar';
import Table from './components/Table';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.handleSearch = this.handleSearch.bind(this);
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
