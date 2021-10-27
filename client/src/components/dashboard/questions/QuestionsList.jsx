import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionsList.scss";
import { Link } from "react-router-dom";
// import editImageSrc from "../../../assets/edit.png";
// import deleteImageSrc from "../../../assets/delete.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
// import * as ReactBootStrap from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "mongoose";
// export default class QuestionsList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       access_token: localStorage.getItem("token"),
//       rowId: "",
//       questions: [],
//       numberOfQuestions: "",
//       numberOfCategories: "",
//       categories: [],
//       columns: [
//         // {
//         //   dataField: "_id",
//         //   text: "ID",
//         // },
//         {
//           dataField: "description",
//           text: "Question",
//           sort: true,
//           filter: textFilter(),
//         },
//         {
//           dataField: "update",
//           text: "Update",
//           editable: false,
//           formatter: (cellContent, row) => {
//             this.setState({ rowId: row._id });
//             return (
//               <button
//                 className="btn btn-primary btn-xs"
//                 // onClick={() => console.log("updated", row._id)}
//                 onClick={() => this.handleModalUpdate(row._id)}
//               >
//                 Edit
//               </button>
//             );
//           },
//         },
//         {
//           dataField: "delete",
//           text: "Delete",
//           editable: false,
//           formatter: (cellContent, row) => {
//             this.setState({ rowId: row._id });
//             return (
//               <button
//                 className="btn btn-danger btn-xs"
//                 // onClick={() => console.log("deleted", row._id)}
//                 onClick={() => this.handleModalDelete(row._id)}
//               >
//                 Delete
//               </button>
//             );
//           },
//         },
//       ],
//       showHideDelete: false,
//       showHideUpdate: false,
//       toUpdate: {
//         _id: "",
//         categoryId: "",
//         option_one: "",
//         correct: -1,
//         option_two: "",
//         option_three: "",
//         option_four: "",
//         description: "",
//       },
//       isLoading: false,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }
//   handleChange2(event) {
//     this.setState({
//       toUpdate: {
//         ...this.state.toUpdate,
//         [event.target.name]: event.target.value,
//       },
//     });
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     const {
//       toUpdate: {
//         option_one,
//         correct,
//         option_two,
//         option_three,
//         option_four,
//         description,
//         _id,
//         categoryId,
//       },
//     } = this.state;

//     const valuesTochange = {
//       description,
//       alternatives: [
//         { text: option_one, isCorrect: false },
//         { text: option_two, isCorrect: false },
//         { text: option_three, isCorrect: false },
//         { text: option_four, isCorrect: false },
//       ],
//       _id,
//       categoryId,
//     };
//     valuesTochange.alternatives[correct].isCorrect = true;
//     await axios
//       .put(
//         `http://localhost:3001/questions/${this.state.rowId}`,
//         valuesTochange,
//         {
//           headers: {
//             Authorization: `Bearer ${this.state.access_token}`,
//           },
//         }
//       )
//       .then((res) => {
//         this.getQuestions();
//         this.setState({ showHideUpdate: !this.state.showHideUpdate });
//         toast.success("Question has been updated!");
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });

//     // this.props.history.push("/questions");
//   }
//   handleModalDelete(id) {
//     this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
//     console.log(id);
//   }
//   handleModalUpdate(id) {
//     this.setState({ showHideUpdate: !this.state.showHideUpdate, rowId: id });
//     axios
//       .get(`http://localhost:3001/questions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         const { description, categoryId, alternatives } = res.data;
//         this.setState({
//           toUpdate: {
//             description,
//             option_one: alternatives[0].text,
//             correct: alternatives.findIndex((item) => item.isCorrect),
//             option_two: alternatives[1].text,
//             option_three: alternatives[2].text,
//             option_four: alternatives[3].text,
//             _id: id,
//             categoryId,
//           },
//         });
//         this.getCategoryById();
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getQuestions() {
//     this.setState({ isLoading: true });
//     axios
//       .get(`http://localhost:3001/questions`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         const questions = res.data;
//         this.setState({ questions });
//         const numberOfQuestions = res.data.length;
//         this.setState({ numberOfQuestions, isLoading: false });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   deleteRow(id) {
//     console.log("ID", id);
//     axios
//       .delete(`http://localhost:3001/questions/${this.state.rowId}`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         this.handleModalDelete();
//         this.getQuestions();
//         toast.warning("Question has been deleted!");
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getCategoryById() {
//     axios
//       .get(
//         `http://localhost:3001/categories/${this.state.toUpdate.categoryId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${this.state.access_token}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//         // const { toUpdate } = this.state;
//         this.setState({
//           categoryId: res.data._id,
//         });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   getCategories() {
//     axios
//       .get(`http://localhost:3001/categories`, {
//         headers: {
//           Authorization: `Bearer ${this.state.access_token}`,
//         },
//       })
//       .then((res) => {
//         const numberOfCategories = res.data.length;
//         this.setState({ categories: res.data, numberOfCategories });
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }
//   componentDidMount() {
//     this.getQuestions();
//     this.getCategories();
//   }

//   render() {
//     const { isLoading, questions } = this.state;
//     // console.log(this.state.toUpdate.correct);
//     if (isLoading || questions.length > 0) {
//       return (
//         <div>
//           <div className="row mt-4 pt-4">
//             <div className="col">
//               <div className="row bd-box shadow-sm">
//                 <div className="col-md-8">
//                   <h2>Number of questions</h2>
//                 </div>
//                 <div className="col-md-4 num-bx">
//                   <h1>{this.state.numberOfQuestions}</h1>
//                   <span>
//                     <Link to={"/create-question"} className="nav-link">
//                       Create question
//                     </Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="col">
//               <div className="row bd-box shadow-sm">
//                 <div className="col-md-8">
//                   <h2>Number of categories</h2>
//                 </div>
//                 <div className="col-md-4 num-bx">
//                   <h1>{this.state.numberOfCategories}</h1>
//                   <span>
//                     <Link to={"/categories"} className="nav-link">
//                       Categories
//                     </Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row mt-3">
//             {isLoading ? (
//               <div className="mt-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <span className="text-primary ml-3">Loading questions...</span>
//               </div>
//             ) : (
//               <div>
//                 <div>
//                   <h3>List of questions</h3>
//                   <BootstrapTable
//                     keyField="_id"
//                     data={this.state.questions}
//                     columns={this.state.columns}
//                     pagination={paginationFactory()}
//                     filter={filterFactory()}
//                   />
//                 </div>
//                 <Modal show={this.state.showHideDelete}>
//                   <Modal.Header
//                     closeButton
//                     onClick={() => this.handleModalDelete()}
//                   >
//                     <Modal.Title>Are you sure?</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     Do you really want to delete this question? This process
//                     cannot be undone.
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button
//                       variant="secondary"
//                       onClick={() => this.handleModalDelete()}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => this.deleteRow(this.state.rowId)}
//                     >
//                       Delete
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>

//                 <Modal show={this.state.showHideUpdate}>
//                   <form onSubmit={(e) => this.handleSubmit(e)}>
//                     <Modal.Header
//                       closeButton
//                       onClick={() => this.handleModalUpdate()}
//                     >
//                       <Modal.Title>Edit question</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <label className="d-flex flex-column align-items-start">
//                         Description:
//                         <input
//                           type="text"
//                           name="description"
//                           value={this.state.toUpdate.description}
//                           className="form-control"
//                           onChange={this.handleChange2}
//                         />
//                       </label>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           First option:
//                           <input
//                             type="text"
//                             name="option_one"
//                             value={this.state.toUpdate.option_one}
//                             className="form-control"
//                             onChange={this.handleChange2}
//                           />
//                         </label>
//                         <input
//                           type="radio"
//                           name="correct"
//                           value="0"
//                           checked={+this.state.toUpdate.correct === 0}
//                           className="form-check-input update-question"
//                           onChange={this.handleChange2}
//                         />
//                       </div>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           Second option:
//                           <input
//                             type="text"
//                             name="option_two"
//                             value={this.state.toUpdate.option_two}
//                             className="form-control"
//                             onChange={this.handleChange2}
//                           />
//                         </label>
//                         <input
//                           type="radio"
//                           name="correct"
//                           value="1"
//                           checked={+this.state.toUpdate.correct === 1}
//                           className="form-check-input update-question"
//                           onChange={this.handleChange2}
//                         />
//                       </div>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           Third option:
//                           <input
//                             type="text"
//                             name="option_three"
//                             value={this.state.toUpdate.option_three}
//                             className="form-control"
//                             onChange={this.handleChange2}
//                           />
//                         </label>
//                         <input
//                           type="radio"
//                           name="correct"
//                           value="2"
//                           checked={+this.state.toUpdate.correct === 2}
//                           className="form-check-input update-question"
//                           onChange={this.handleChange2}
//                         />
//                       </div>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           Forth option:
//                           <input
//                             type="text"
//                             name="option_four"
//                             value={this.state.toUpdate.option_four}
//                             className="form-control"
//                             onChange={this.handleChange2}
//                           />
//                         </label>
//                         <input
//                           type="radio"
//                           name="correct"
//                           value="3"
//                           checked={+this.state.toUpdate.correct === 3}
//                           className="form-check-input update-question"
//                           onChange={this.handleChange2}
//                         />
//                       </div>
//                       <div className="d-flex align-items-center">
//                         <label className="d-flex flex-column align-items-start">
//                           Category:
//                           <select
//                             className="form-select"
//                             name="categoryId"
//                             aria-label="Default select example"
//                             value={this.state.toUpdate.categoryId}
//                             onChange={this.handleChange2}
//                           >
//                             <option disabled selected>
//                               Select one category
//                             </option>
//                             {this.state.categories.map((ctg) => (
//                               <option value={ctg._id} key={ctg._id}>
//                                 {ctg.categoryName}
//                               </option>
//                             ))}
//                           </select>
//                         </label>
//                       </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                       <Button
//                         variant="secondary"
//                         onClick={() => this.handleModalUpdate()}
//                       >
//                         Cancel
//                       </Button>
//                       <Button type="submit" value="submit" variant="primary">
//                         Update
//                       </Button>
//                     </Modal.Footer>
//                   </form>
//                 </Modal>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     } else if (questions.length <= 0) {
//       return (
//         <div>
//           <div className="row mt-4 pt-4">
//             <div className="col">
//               <div className="row bd-box shadow-sm">
//                 <div className="col-md-8">
//                   <h2>Number of questions</h2>
//                 </div>
//                 <div className="col-md-4 num-bx">
//                   <h1>{this.state.numberOfQuestions}</h1>
//                   <span>
//                     <Link to={"/create-question"} className="nav-link">
//                       Create question
//                     </Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="col">
//               <div className="row bd-box shadow-sm">
//                 <div className="col-md-8">
//                   <h2>Number of categories</h2>
//                 </div>
//                 <div className="col-md-4 num-bx">
//                   <h1>{this.state.numberOfCategories}</h1>
//                   <span>
//                     <Link to={"/categories"} className="nav-link">
//                       Categories
//                     </Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-4">
//             <div>
//               {/* {isLoading && (
//                   <div className="mt-4">
//                   <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <span className="text-primary ml-3">Loading questions...</span>
//                   </div>
//                 )} */}
//               <span className="text-primary">
//                 No questions found on the database...
//               </span>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// }

const QuestionsList = (props) => {
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("token")
  );
  const [rowId, setRowId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [numberOfCategories, setNumberOfCategories] = useState("");
  const [categories, setCategories] = useState([]);
  const [columns, setColumns] = useState([
    // {
    //   dataField: "_id",
    //   text: "ID",
    // },
    {
      dataField: "description",
      text: "Question",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "update",
      text: "Update",
      editable: false,
      formatter: (cellContent, row) => {
        // this.setState({ rowId: row._id });
        setRowId(row._id);
        return (
          <button
            className="btn btn-primary btn-xs"
            // onClick={() => console.log("updated", row._id)}
            onClick={() => handleModalUpdate(row._id)}
          >
            Edit
          </button>
        );
      },
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
  const [showHideUpdate, setShowHideUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toUpdate, setToUpdate] = useState([
    {
      _id: "",
      categoryId: "",
      option_one: "",
      correct: -1,
      option_two: "",
      option_three: "",
      option_four: "",
      description: "",
    },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const {
    //   toUpdate: {
    //     option_one,
    //     correct,
    //     option_two,
    //     option_three,
    //     option_four,
    //     description,
    //     _id,
    //     categoryId,
    //   },
    // } = this.state;

    const valuesTochange = {
      description: toUpdate.description,
      alternatives: [
        { text: toUpdate.option_one, isCorrect: false },
        { text: toUpdate.option_two, isCorrect: false },
        { text: toUpdate.option_three, isCorrect: false },
        { text: toUpdate.option_four, isCorrect: false },
      ],
      _id: toUpdate._id,
      categoryId,
    };
    valuesTochange.alternatives[toUpdate.correct].isCorrect = true;
    await axios
      .put(`http://localhost:3001/questions/${rowId}`, valuesTochange, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setShowHideUpdate(!showHideUpdate);
        console.log("res.data", res.data);
        const updatedQuestions = [...questions];
        const questionToUpdate = updatedQuestions.find(
          (question) => question._id === res.data._id
        );
        questionToUpdate.alternatives = res.data.alternatives;
        questionToUpdate.categoryId = res.data.categoryId;
        questionToUpdate.description = res.data.description;
        setQuestions(updatedQuestions);
        // getQuestions();
        // this.setState({ showHideUpdate: !this.state.showHideUpdate });
        toast.success("Question has been updated!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // this.props.history.push("/questions");
  };
  const handleModalDelete = (id) => {
    // this.setState({ showHideDelete: !this.state.showHideDelete, rowId: id });
    setShowHideDelete(!showHideDelete);
    setRowId(id);
    console.log(id);
  };
  const handleModalUpdate = async (id) => {
    // this.setState({ showHideUpdate: !this.state.showHideUpdate, rowId: id });
    setShowHideUpdate(!showHideUpdate);
    setRowId(id);
    await axios
      .get(`http://localhost:3001/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        const { description, categoryId, alternatives } = res.data;
        getCategoryById(categoryId);
        setToUpdate({
          description,
          option_one: alternatives[0].text,
          correct: alternatives.findIndex((item) => item.isCorrect),
          option_two: alternatives[1].text,
          option_three: alternatives[2].text,
          option_four: alternatives[3].text,
          _id: id,
          categoryId,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getQuestions = () => {
    // this.setState({ isLoading: true });
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/questions`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        const questions = res.data;
        // this.setState({ questions });
        setQuestions(questions);
        const numberOfQuestions = res.data.length;
        // this.setState({ numberOfQuestions, isLoading: false });
        setNumberOfQuestions(numberOfQuestions);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const deleteRow = (id) => {
    console.log("ID", id);
    axios
      .delete(`http://localhost:3001/questions/${rowId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        handleModalDelete();
        const index = questions.findIndex((question) => question._id === id);
        setQuestions([
          ...questions.slice(0, index),
          ...questions.slice(index + 1),
        ]);
        const questionsLength = questions.length;
        setNumberOfQuestions(questionsLength);
        // getQuestions();
        toast.warning("Question has been deleted!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getCategoryById = (id) => {
    axios
      .get(`http://localhost:3001/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // const { toUpdate } = this.state;
        // this.setState({
        //   categoryId: res.data._id,
        // });
        setCategoryId(res.data._id);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const getCategories = () => {
    axios
      .get(`http://localhost:3001/categories`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        const numberOfCategories = res.data.length;
        // this.setState({ categories: res.data, numberOfCategories });
        setCategories(res.data);
        setNumberOfCategories(numberOfCategories);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  //   componentDidMount() {
  //     this.getQuestions();
  //     this.getCategories();
  //   }
  useEffect(() => {
    getQuestions();
    getCategories();
  }, []);

  if (isLoading || questions.length > 0) {
    return (
      <div>
        <div className="row mt-4 pt-4">
          <div className="col">
            <div className="row bd-box shadow-sm">
              <div className="col-md-8">
                <h2>Number of questions</h2>
              </div>
              <div className="col-md-4 num-bx">
                <h1>{questions.length}</h1>
                <span>
                  <Link to={"/create-question"} className="nav-link">
                    Create question
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row bd-box shadow-sm">
              <div className="col-md-8">
                <h2>Number of categories</h2>
              </div>
              <div className="col-md-4 num-bx">
                <h1>{numberOfCategories}</h1>
                <span>
                  <Link to={"/categories"} className="nav-link">
                    Categories
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {isLoading ? (
            <div className="mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="text-primary ml-3">Loading questions...</span>
            </div>
          ) : (
            <div>
              <div>
                <h3>List of questions</h3>
                <BootstrapTable
                  keyField="_id"
                  data={questions}
                  columns={columns}
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                />
              </div>
              <Modal show={showHideDelete}>
                <Modal.Header onClick={() => handleModalDelete()}>
                  <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Do you really want to delete this question? This process
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

              <Modal show={showHideUpdate}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Modal.Header onClick={() => handleModalUpdate()}>
                    <Modal.Title>Edit question</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <label className="d-flex flex-column align-items-start">
                      Description:
                      <input
                        type="text"
                        name="description"
                        value={toUpdate.description}
                        className="form-control"
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            description: e.target.value,
                          })
                        }
                      />
                    </label>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        First option:
                        <input
                          type="text"
                          name="option_one"
                          value={toUpdate.option_one}
                          className="form-control"
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              option_one: e.target.value,
                            })
                          }
                        />
                      </label>
                      <input
                        type="radio"
                        name="correct"
                        value="0"
                        checked={+toUpdate.correct === 0}
                        className="form-check-input update-question"
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            correct: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        Second option:
                        <input
                          type="text"
                          name="option_two"
                          value={toUpdate.option_two}
                          className="form-control"
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              option_two: e.target.value,
                            })
                          }
                        />
                      </label>
                      <input
                        type="radio"
                        name="correct"
                        value="1"
                        checked={+toUpdate.correct === 1}
                        className="form-check-input update-question"
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            correct: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        Third option:
                        <input
                          type="text"
                          name="option_three"
                          value={toUpdate.option_three}
                          className="form-control"
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              option_three: e.target.value,
                            })
                          }
                        />
                      </label>
                      <input
                        type="radio"
                        name="correct"
                        value="2"
                        checked={+toUpdate.correct === 2}
                        className="form-check-input update-question"
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            correct: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        Forth option:
                        <input
                          type="text"
                          name="option_four"
                          value={toUpdate.option_four}
                          className="form-control"
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              option_four: e.target.value,
                            })
                          }
                        />
                      </label>
                      <input
                        type="radio"
                        name="correct"
                        value="3"
                        checked={+toUpdate.correct === 3}
                        className="form-check-input update-question"
                        onChange={(e) =>
                          setToUpdate({
                            ...toUpdate,
                            correct: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <label className="d-flex flex-column align-items-start">
                        Category:
                        <select
                          className="form-select"
                          name="categoryId"
                          aria-label="Default select example"
                          value={toUpdate.categoryId}
                          onChange={(e) =>
                            setToUpdate({
                              ...toUpdate,
                              categoryId: e.target.value,
                            })
                          }
                        >
                          <option disabled selected>
                            Select one category
                          </option>
                          {categories.map((ctg) => (
                            <option value={ctg._id} key={ctg._id}>
                              {ctg.categoryName}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => handleModalUpdate()}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" value="submit" variant="primary">
                      Update
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          )}
        </div>
      </div>
    );
  } else if (questions.length <= 0) {
    return (
      <div>
        <div className="row mt-4 pt-4">
          <div className="col">
            <div className="row bd-box shadow-sm">
              <div className="col-md-8">
                <h2>Number of questions</h2>
              </div>
              <div className="col-md-4 num-bx">
                <h1>{numberOfQuestions}</h1>
                <span>
                  <Link to={"/create-question"} className="nav-link">
                    Create question
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row bd-box shadow-sm">
              <div className="col-md-8">
                <h2>Number of categories</h2>
              </div>
              <div className="col-md-4 num-bx">
                <h1>{numberOfCategories}</h1>
                <span>
                  <Link to={"/categories"} className="nav-link">
                    Categories
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            {/* {isLoading && (
                <div className="mt-4">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                <span className="text-primary ml-3">Loading questions...</span>
                </div>
              )} */}
            <span className="text-primary">
              No questions found on the database...
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default QuestionsList;
