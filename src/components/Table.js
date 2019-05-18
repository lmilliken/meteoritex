import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function CustomizedTable(props) {
  const { classes } = props;

  console.log(props.meteorites[0]);

  return (
    <Paper className={classes.root}>
      {/* {props.meteorites[0]}  */}
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
          {props.meteorites.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component='th' scope='row'>
                {row.name}
              </CustomTableCell>
              <CustomTableCell align='right'>{row.id}</CustomTableCell>
              <CustomTableCell align='right'>{row.nametype}</CustomTableCell>
              <CustomTableCell align='right'>{row.recclass}</CustomTableCell>
              <CustomTableCell align='right'>{row.mass}</CustomTableCell>
              <CustomTableCell align='right'>{row.fall}</CustomTableCell>
              <CustomTableCell align='right'>
                {new Date(row.year).getFullYear()}
              </CustomTableCell>
              <CustomTableCell align='right'>{row.reclat}</CustomTableCell>
              <CustomTableCell align='right'>{row.reclong}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
