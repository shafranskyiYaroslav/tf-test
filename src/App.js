import React from "react";
import Organization from "./Organization";
import User from "./User"
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
    organization: "",
    organizationsList: [],
    organizationsNamesList: [],
    user: "",
    userInfo: [],
    usersData: [],
    isUserHidden: true,
    isOrganizationHidden: true
    }
  }

  componentDidMount() {
    fetch("https://api.github.com/organizations")
    .then(result => result.json())
    .then(
      data => {
        this.setState({
          organizationsList: data
        })
      },
      error => {
        alert("Wrong name!")
      }
    )
    fetch("https://api.github.com/users")
    .then(result => result.json())
    .then(data => this.setState({
      usersData: data
    }))
  }

  searchChange = (event) => {
    this.setState({
      organization: event.target.value
    })
  }

  searchSubmit = (event) => {
    event.preventDefault();
    this.setState( prevState => {
      return({
        isUserHidden: true,
        isOrganizationHidden: false,
        organizationsNamesList: prevState.organizationsList
        .filter(el => el.login.indexOf(this.state.organization.toLowerCase()) !== -1)
        .map(el => el.login)
        })
      }
    )
  }

  userChange = (event) => {
    this.setState({
      user: event.target.value
    })
  }

  userSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return ({
        isUserHidden: false,
        isOrganizationHidden: true,
        userInfo: prevState.usersData.filter(el => el.login === prevState.user)[0],
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form id="search-form" onSubmit={this.searchSubmit} >
            <input
            id="organization-search"
            name="organization"
            value={this.state.organization}
            placeholder="Input the  name of organization"
            onChange={this.searchChange} />
          </form>
          <form id="user-form" onSubmit={this.userSubmit} >
            <input
            id="user-search"
            name="user"
            value={this.state.user}
            placeholder="Input the username"
            onChange={this.userChange} />
          </form>
        </header>
        <User
        style={(this.state.isUserHidden) ? {display: "none"} : {display: "flex"}}
        avatar={this.state.userInfo.avatar_url}
        userInfo={this.state.userInfo} />
        <Organization
        style={(this.state.isOrganizationHidden) ? {display: "none"} : {display: "flex"}}
        organizationsNamesList={this.state.organizationsNamesList}
        organizationsList={this.state.organizationsList} />
      </div>
    )
  }
}

export default App;
