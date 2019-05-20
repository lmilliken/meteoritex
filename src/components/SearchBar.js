import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    padding: '8px 8px',
    margin: '20px auto',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clear: {
    color: '#DCDCDC',
    cursor: 'pointer'
  }
};

class CustomizedInputBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSubmit() {
    this.props.handleSearch(this.state.searchTerm);
    // console.log('term: ', this.state.searchTerm);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleClear() {
    this.setState({ searchTerm: '' });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder='Enter search terms'
          onChange={this.handleChange}
          value={this.state.searchTerm}
        />
        <ClearIcon className={classes.clear} onClick={this.handleClear} />
        <Button variant='contained' color='primary' onClick={this.handleSubmit}>
          Search
        </Button>
      </Paper>
    );
  }
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputBase);
