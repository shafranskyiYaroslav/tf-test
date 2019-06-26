import React from "react";
import Members from "./Members"

class Organisation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organizationInfo: []
    }
  }

  searchClick = (event) => {
    event.target = event.target.closest("li");
    const item = event.target.textContent;
    this.setState({
      organizationInfo: Object.entries(this.props.organizationsList.filter(el => el.login === item)[0])
    })
  }

  render() {
    return(
      <div id="organization-div" style={this.props.style}>
        <ul id="organization-list">
          <h3>Search results</h3>
            {
              this.props.organizationsNamesList.map(org => (
                <li key={org} onClick={this.searchClick} >{org}</li>
              ))
            }
        </ul>
        <Members
        organizationInfo={this.state.organizationInfo}
        avatar={this.state.organizationInfo.filter(el => el[0] === "avatar_url").map(el => el[1])}
        memberUrl={this.state.organizationInfo.filter(el => el[0] === "members_url").map(el => el[1].slice(0, -9))} />
      </div>
    )
  }
}

export default Organisation
