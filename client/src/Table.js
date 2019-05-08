import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const UPDATE_USER = gql`
  mutation updateUser($uuid: String!, $input: updateUserInput!) {
    updateUser(uuid: $uuid, input: $input) {
      name
      age
      uuid
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($uuid: String!) {
    deleteUser(uuid: $uuid) {
      name
      age
      uuid
    }
  }
`;

export default class Table extends Component {
  state = {
    userData: {},
    name: "",
    age: "",
    nameChange: false,
    ageChange: false
  };

  getUserDetails = (e, user) => {
    e.preventDefault();
    this.setState({ userData: user });
  };

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "age") {
      this.setState({ [name]: value, ageChange: true });
    } else {
      this.setState({ [name]: value, nameChange: true });
    }
  };

  handleSubmit = (e, uuid, updateUser) => {
    e.preventDefault();
    let userData = {
      name: this.state.nameChange ? this.state.name : this.state.userData.name,
      age: this.state.ageChange ? this.state.age : this.state.userData.age
    };

    const payload = {};
    payload.name = userData.name;
    payload.age = userData.age;
    payload.uuid = uuid;

    updateUser({
      variables: { uuid: uuid, input: payload }
    }).then(res => {
      console.log("data saved successfully", res.data);
      this.setState({
        name: "",
        age: "",
        nameChange: false,
        ageChange: false
      });
    }, console.error);
  };

  handleDelete = (e, uuid, deleteUser) => {
    e.preventDefault();
    deleteUser({
      variables: { uuid: uuid }
    }).then(res => {
      console.log("data saved successfully", res.data);
      window.location.reload(true);
    }, console.error);
  };

  handleRefresh = e => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    var user = this.props.user;
    return (
      <div>
        <ul className="breadcrumb">
          {user ? (
            <div>
              <h3 className="text-center text-danger">Users</h3>
              <div className="wrapper">
                <span>Showing {user ? user.length : 0} Users</span>
              </div>
              <br />
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <b>Name</b>
                    </th>
                    <th>
                      <b>Age</b>
                    </th>
                    <th style={{ width: "10%" }}>
                      <b>Edit/Delete</b>
                    </th>
                  </tr>
                </thead>
                {Object.keys(user).length === 0 &&
                user.constructor === Object ? null : (
                  <tbody>
                    {user.map((user, u) => {
                      return (
                        <tr key={u}>
                          <td>{u}</td>
                          <td>{user.name}</td>
                          <td>{user.age}</td>
                          <td
                            className="fa fa-pencil fa-lg"
                            data-toggle="modal"
                            data-target="#mymodal"
                            data-dismiss="modal"
                            name="edit"
                            onClick={e => this.getUserDetails(e, user)}
                          />
                          <td
                            className="fa fa-trash fa-lg"
                            data-toggle="modal"
                            data-target="#deletemodal"
                            data-dismiss="modal"
                            onClick={e => this.getUserDetails(e, user)}
                          />
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          ) : null}

          <div className="modal fade" id="mymodal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="text-center">UserDetails</h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="form-group col-xs-push-1 col-md-10">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          value={
                            this.state.nameChange
                              ? this.state.name
                                ? this.state.name
                                : ""
                              : this.state.userData.name
                              ? this.state.userData.name
                              : ""
                          }
                          className="form-control"
                          name="name"
                          id="name"
                          onChange={e => this.handleInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-xs-push-1 col-md-10">
                        <label htmlFor="age">Age</label>
                        <input
                          type="text"
                          value={
                            this.state.ageChange
                              ? this.state.age
                                ? this.state.age
                                : ""
                              : this.state.userData.age
                              ? this.state.userData.age
                              : ""
                          }
                          className="form-control"
                          name="age"
                          id="age"
                          onChange={e => this.handleInputChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                  <Mutation mutation={UPDATE_USER}>
                    {(updateUser, { loading, error }) => {
                      if (loading) {
                        return <div>Loading</div>;
                      }
                      if (error) {
                        return <div>Error</div>;
                      }
                      return (
                        <div className="modal-footer">
                          <button
                            className="btn btn-warning"
                            data-dismiss="modal"
                            data-toggle="modal"
                            data-target="#savemodal"
                            onClick={e =>
                              this.handleSubmit(
                                e,
                                this.state.userData.uuid,
                                updateUser
                              )
                            }
                          >
                            Save
                          </button>
                        </div>
                      );
                    }}
                  </Mutation>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="savemodal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={e => this.handleRefresh(e)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h3>Welcome</h3>
                </div>
                <div className="modal-body">
                  <p>
                    Registration of '{this.state.userData.name}' is successful
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="deletemodal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h3>Welcome</h3>
                </div>
                <div className="modal-body">
                  <p>
                    Do you want to delete the user '{this.state.userData.name}'
                    ?{" "}
                  </p>
                </div>
                <Mutation mutation={DELETE_USER}>
                  {(deleteUser, { loading, error }) => {
                    if (loading) {
                      return <div>Loading</div>;
                    }
                    if (error) {
                      return <div>Error</div>;
                    }
                    return (
                      <div className="modal-footer">
                        <button
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={e =>
                            this.handleDelete(
                              e,
                              this.state.userData.uuid,
                              deleteUser
                            )
                          }
                        >
                          Confirm
                        </button>
                      </div>
                    );
                  }}
                </Mutation>
              </div>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
