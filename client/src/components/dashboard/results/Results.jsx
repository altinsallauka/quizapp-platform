import React from "react";
import axios from "axios";
import "./Results.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem("token"),
      results: [],
      columns: [
        // {
        //   dataField: "_id",
        //   text: "ID",
        // },
        {
          dataField: "studentName",
          text: "Student Name",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "score",
          text: "Points 0-10",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "delete",
          text: "Delete",
          editable: false,
          formatter: (cellContent, row) => {
            this.setState({ rowId: row._id });
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => console.log("deleted", row._id)}
                onClick={() => this.handleModalDelete(row._id)}
              >
                Delete
              </button>
            );
          },
        },
      ],
    };
  }
  handleModalDelete(id) {
    this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
    console.log(id);
  }
  deleteRow(id) {
    console.log("ID", id);
    axios
      .delete(`http://localhost:3001/results/${this.state.rowId}`, {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      })
      .then((res) => {
        this.handleModalDelete();
        this.getResults();
        toast.warning("Result has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  getResults() {
    axios
      .get("http://localhost:3001/results", {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      })
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  componentDidMount() {
    this.getResults();
  }
  render() {
    const { isLoading, results } = this.state;
    if (results.length <= 0) {
      return (
        <div className="mt-4">
          <div>
            {isLoading && (
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
            <span className="text-primary">
              No results found on the database...
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col mt-4 results-table">
            <h1>Quiz results</h1>
            <BootstrapTable
              keyField="_id"
              data={this.state.results}
              columns={this.state.columns}
              pagination={paginationFactory()}
              filter={filterFactory()}
            />
            <Modal show={this.state.showHideDelete}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalDelete()}
              >
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do you really want to delete this quiz result? This process
                cannot be undone.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.handleModalDelete()}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.deleteRow(this.state.rowId)}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    }
  }
}
