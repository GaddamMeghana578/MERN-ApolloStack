import React from "react";
import { gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";
import ToDo from "./ToDo.js";
const GET_USER = gql`
  query {
    users {
      name
      age
      uuid
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $age: Int!, $uuid: String!) {
    addUser(name: $name, age: $age, uuid: $uuid) {
      name
      age
      uuid
    }
  }
`;

export default class App extends React.Component {
  state = {
    user: [],
    userDetails: {},
    submitted: false
  };

  handleSubmit = (user, addUser) => {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });

    addUser({
      variables: { name: user.name, age: user.age, uuid: uuid }
    }).then(res => {
      console.log("data saved successfully", res.data);
      this.setState({
        user: [...this.state.user, res.data.addUser],
        submitted: true
      });
    }, console.error);
  };

  render() {
    return (
      <Query query={GET_USER} fetchPolicy="network-only">
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <div>Loading</div>;
          }
          if (error) {
            return <div>Error</div>;
          }
          if (this.state.submitted === true) {
            refetch();
          }
          return (
            <Mutation mutation={ADD_USER}>
              {(addUser, { loading, error }) => {
                if (loading) {
                  return <div>Loading</div>;
                }
                if (error) {
                  return <div>Error</div>;
                }
                return (
                  <div>
                    <ul>
                      {data.users.map(({ name, age, uuid }) => (
                        <li key={uuid}>
                          {name} - {age}
                        </li>
                      ))}
                    </ul>
                    <ToDo handleSubmit={this.handleSubmit} addUser={addUser} />
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
