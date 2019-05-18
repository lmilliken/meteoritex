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

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import axios from 'axios';
import util from 'util';
//pagination stuff
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First Page'
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous Page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Next Page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Last Page'
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

// let counter = 0;
// function createData(name, calories, fat) {
//   counter += 1;
//   return { id: counter, name, calories, fat };
// }

//table cell stuff
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
// marginTop: theme.spacing.unit * 3,

const styles = theme => ({
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
      meteorites: [],
      page: 0,
      rowsPerPage: 25
    };
  }

  async componentDidMount() {
    const meteorites = await axios.get(
      'https://data.nasa.gov/resource/gh4g-9sfh.json'
    );
    // console.log('table props: ' + meteorites);
    await this.setState({ meteorites: meteorites.data });
    //console.log('table rows: ' + util.inspect(this.state.meteorites));
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  render() {
    // console.log('table rows: ' + this.props.classes.root);
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.state.meteorites.length - page * rowsPerPage);
    // console.log(this.state.meteorites[0]);
    return (
      <Paper className={classes.root}>
        {/* {props.meteorites[0]}  */}
        <div className={classes.tableWrapper}>
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
              {this.state.meteorites.length > 0 &&
                this.state.meteorites
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
                      <CustomTableCell align='right'>
                        {row.mass}
                      </CustomTableCell>
                      <CustomTableCell align='right'>
                        {row.fall}
                      </CustomTableCell>
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
                    this.state.meteorites.length
                      ? this.state.meteorites.length
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
        </div>
      </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
