import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Results.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
const Results = () => {
  const [access_token, setAccessToken] = useState(
    localStorage.getItem("token")
  );
  const [rowId, setRowId] = useState("");
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([
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
        // this.setState({ rowId: row._id });
        setRowId(row._id);
        return (
          <button
            className="btn btn-danger btn-xs"
            // onClick={() => console.log("deleted", row._id)}
            onClick={() => handleModalDelete(row._id)}
          >
            Delete
          </button>
        );
      },
    },
  ]);
  const [showHideDelete, setShowHideDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalDelete = (id) => {
    // this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
    setShowHideDelete(!showHideDelete);
    setRowId(id);
    console.log(id);
  };
  const deleteRow = (id) => {
    console.log("ID", id);
    axios
      .delete(`http://localhost:3001/results/${rowId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        handleModalDelete();
        getResults();
        toast.warning("Result has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getResults = () => {
    // this.setState({ isLoading: true });
    setIsLoading(true);
    axios
      .get("http://localhost:3001/results", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // this.setState({ results: res.data });
        setResults(res.data);
        setIsLoading(false);
        // this.setState({ isLoading: false });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getResults();
  }, []);

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
        {isLoading ? (
          <div className="mt-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span class="text-primary ml-3">Loading users...</span>
          </div>
        ) : (
          <div>
            <div className="col mt-4 results-table">
              <h1>Quiz results</h1>
              <BootstrapTable
                keyField="_id"
                data={results}
                columns={columns}
                pagination={paginationFactory()}
                filter={filterFactory()}
              />
              <Modal show={showHideDelete}>
                <Modal.Header closeButton onClick={() => handleModalDelete()}>
                  <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Do you really want to delete this quiz result? This process
                  cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleModalDelete()}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={() => deleteRow(rowId)}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Results;
