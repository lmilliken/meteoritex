import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import TablePaginationActionsWrapped from './TablePagination';

//<CustomTableCell/> stuff
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#FFB300',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

//CustomizedTable
const tableStyles = theme => ({
  root: {
    width: '95%',
    margin: 'auto',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

class CustomizedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteoritesAll: [],
      meteoritesResult: [],
      searchTerm: props.searchTerm,
      page: 0,
      rowsPerPage: 25
    };
  }

  async componentDidMount() {
    const meteorites = await axios.get(
      'https://data.nasa.gov/resource/gh4g-9sfh.json'
    );

    await this.setState({
      meteoritesAll: meteorites.data,
      meteoritesResult: meteorites.data
    });
  }

  async componentWillReceiveProps(nextProps) {
    // console.log('component will receive props');
    // console.log('meteoritesResult: ', this.state.meteoritesResult);
    await this.setState({ searchTerm: nextProps.searchTerm });
    if (this.state.searchTerm === '') {
      this.setState({
        meteoritesResult: this.state.meteoritesAll
      });
    } else {
      const searchTerm = this.state.searchTerm.toLowerCase();
      const meteoritesResult = this.state.meteoritesAll.filter(m =>
        m.name.toLowerCase().includes(searchTerm)
      );

      this.setState({ meteoritesResult });
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        this.state.meteoritesResult.length - page * rowsPerPage
      );
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell align='right'>Id</CustomTableCell>
              <CustomTableCell align='right'>Name Type</CustomTableCell>
              <CustomTableCell align='right'>Rec Class</CustomTableCell>
              <CustomTableCell align='right'>Mass (g)</CustomTableCell>
              <CustomTableCell align='right'>Fall</CustomTableCell>
              <CustomTableCell align='right'>Year</CustomTableCell>
              <CustomTableCell align='right'>Latitude</CustomTableCell>
              <CustomTableCell align='right'>Longitude</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.meteoritesResult.length > 0 &&
              this.state.meteoritesResult
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component='th' scope='row'>
                      {row.name}
                    </CustomTableCell>
                    <CustomTableCell align='right'>{row.id}</CustomTableCell>
                    <CustomTableCell align='right'>
                      {row.nametype}
                    </CustomTableCell>
                    <CustomTableCell align='right'>
                      {row.recclass}
                    </CustomTableCell>
                    <CustomTableCell align='right'>{row.mass}</CustomTableCell>
                    <CustomTableCell align='right'>{row.fall}</CustomTableCell>
                    <CustomTableCell align='right'>
                      {new Date(row.year).getFullYear()}
                    </CustomTableCell>
                    <CustomTableCell align='right'>
                      {row.reclat}
                    </CustomTableCell>
                    <CustomTableCell align='right'>
                      {row.reclong}
                    </CustomTableCell>
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <CustomTableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                colSpan={9}
                count={
                  this.state.meteoritesResult.length
                    ? this.state.meteoritesResult.length
                    : 0
                }
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tableStyles)(CustomizedTable);
