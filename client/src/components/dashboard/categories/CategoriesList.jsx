import React from "react";
import axios from "axios";
import "./CategoriesList.scss";
// import * as ReactBootStrap from "react-bootstrap";
// import { Button, Modal } from "react-bootstrap";
export default class CategoriesList extends React.Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    axios.get("http://localhost:3001/categories").then((res) => {
      this.setState({ categories: res.data });
    });
  }
  createCategory() {
    axios
      .post("http://localhost:3001/categories", {
        categoryName: "Test Category",
      })
      .then(function (response) {
        console.log(response);
      });
  }
  render() {
    return (
      <div>
        <h1>Categories</h1>
      </div>
    );
  }
}
