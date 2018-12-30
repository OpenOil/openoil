import React, { Component } from "react";
import { Container, Col, Row, Input, Button } from "reactstrap";
import { ImageCell, TextCell } from "./helpers/cells";
import { Table, Column, Cell } from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.css";

const Datetime = require("react-datetime");

// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getData } from "../redux/actions/dataActions";

// Validation
import isEmpty from "./validation/is-empty";

class ArrayWrapper {
  constructor(array) {
    this._array = array;
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    return this._array[index];
  }
}

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(this._indexMap[index]);
  }
}

class _Data extends Component {
  constructor() {
    super();

    this.state = {
      errors: {},
      data: new DataListWrapper([], new ArrayWrapper([])),
      filteredData: new DataListWrapper([], new ArrayWrapper([])),
      api: "",
      operator_current: "",
      date_start_year: "",
      date_start_month: "",
      date_end_year: "",
      date_end_month: ""
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      // If authenticated, go fetch the initial data and load into the store
      this.props.getData();
    }
  }

  componentWillReceiveProps(nextProps) {
    // On Prop reload (after Redux actions fire), set the current state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.data) {
      //console.log("Here in nextProps", nextProps.data);
      this.setState({
        data: nextProps.data,
        filteredData: nextProps.data
      });
    }
  }

  _onFilterChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _onSubmit = e => {
    e.preventDefault();

    if (
      isEmpty(this.state.api) &&
      isEmpty(this.state.operator_current) &&
      isEmpty(this.state.date_start_year) &&
      isEmpty(this.state.date_start_month) &&
      isEmpty(this.state.date_end_year) &&
      isEmpty(this.state.date_end_month)
    ) {
      //console.log("Resetting...", this.state.data);
      this.setState({
        filteredData: this.state.data
      });
    } else {
      var size = this.state.data.getSize();
      var filteredIndexes = [];
      for (var index = 0; index < size; index++) {
        var { api, operator_current, date } = this.state.data.getObjectAt(
          index
        );

        // Split date into Month, Day, Year and remove leading 0s on Month
        var newDate = date.split("/");
        newDate[0] = newDate[0].replace("0", "");

        if (
          (api.toLowerCase().indexOf(this.state.api.toLowerCase()) !== -1 ||
            isEmpty(this.state.api)) &&
          (operator_current
            .toLowerCase()
            .indexOf(this.state.operator_current.toLowerCase()) !== -1 ||
            isEmpty(this.state.operator_current)) &&
          (newDate[2] >= this.state.date_start_year ||
            isEmpty(this.state.date_start_year)) &&
          (newDate[0] >= this.state.date_start_month ||
            isEmpty(this.state.date_start_month)) &&
          (newDate[2] <= this.state.date_end_year ||
            isEmpty(this.state.date_end_year)) &&
          (newDate[0] <= this.state.date_end_month ||
            isEmpty(this.state.date_end_month))
        ) {
          filteredIndexes.push(index);
        }
      }

      //console.log("Filtering...", filteredIndexes, this.state.data);
      /*
        "this.state.data" is going to be a DataListWrapper object for performance reasons
        the ArrayWrapper set during Redux mapStateToProps allows the recursion with GetObjectAt 
        by adding that method to basic arrays for performance
      */
      this.setState({
        filteredData: new DataListWrapper(filteredIndexes, this.state.data)
      });
    }
  };

  render() {
    return (
      <Container>
        <form onSubmit={this._onSubmit}>
          <Row>
            <Col md="3">
              <Input
                name="api"
                onChange={this._onFilterChange}
                placeholder="API"
              />
            </Col>
            <Col md="2">
              <Input
                name="date_start_year"
                onChange={this._onFilterChange}
                type="number"
                placeholder="Start Year"
              />
            </Col>
            <Col md="2">
              <Input
                name="date_end_year"
                onChange={this._onFilterChange}
                type="number"
                placeholder="End Year"
              />
            </Col>
            <Col md="5">
              <Button typ="submit" color="primary" className="px-4">
                Filter
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="3">
              <Input
                name="operator_current"
                onChange={this._onFilterChange}
                placeholder="Current Operator"
              />
            </Col>
            <Col md="2">
              <Input
                name="date_start_month"
                onChange={this._onFilterChange}
                type="number"
                placeholder="Start Month"
              />
            </Col>
            <Col md="2">
              <Input
                name="date_end_month"
                onChange={this._onFilterChange}
                type="number"
                placeholder="End Month"
              />
            </Col>
          </Row>
        </form>
        <br />
        <Row>
          <Table
            rowHeight={50}
            rowsCount={this.state.filteredData.getSize()}
            width={1016}
            height={500}
            headerHeight={50}
            {...this.props}
          >
            <Column
              columnKey="state"
              header={<Cell>State</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={50}
            />
            <Column
              columnKey="api"
              header={<Cell>API</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={130}
            />
            <Column
              columnKey="name"
              header={<Cell>Well Name</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={150}
            />
            <Column
              columnKey="operator_current"
              header={<Cell>Current Operator</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={200}
            />
            <Column
              columnKey="date"
              header={<Cell>Production Date</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={130}
            />
            <Column
              columnKey="days"
              header={<Cell>Days Producing</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={130}
            />
            <Column
              columnKey="oil"
              header={<Cell>Oil</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={70}
            />
            <Column
              columnKey="gas"
              header={<Cell>Gas</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={70}
            />
            <Column
              columnKey="water"
              header={<Cell>Water</Cell>}
              cell={<TextCell data={this.state.filteredData} />}
              width={70}
            />
          </Table>
        </Row>
      </Container>
    );
  }
}

_Data.propTypes = {
  getData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  var size = state.data.rows.length;
  var indexes = [];
  for (var index = 0; index < size; index++) {
    indexes.push(index);
  }

  //console.log("In mapStateToProps...", state.data.rows);

  return {
    auth: state.auth,
    errors: state.errors,
    data: new DataListWrapper(indexes, new ArrayWrapper(state.data.rows))
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(_Data);
