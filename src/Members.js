import React from "react";
import PublicMembers from "./PublicMembers";

class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        members: []
    }
  }

  componentDidUpdate () {
    fetch(this.props.memberUrl)
    .then(result => result.json())
    .then(data => (
        this.setState({
          members: data
        })
    ))
  }

  render() {
    return (
      <React.Fragment>
        <div id="org-info" className="info">
          <h3>About organization</h3>
          <img src={this.props.avatar} alt="org-logo" />
          <table>
            <tbody>
              {
                this.props.organizationInfo.map(org => (
                  <tr key={Math.random()}>
                    <td key={Math.random()} style={{color: "blue"}}>{org[0]}</td>
                    <td key={Math.random()}>{org[1]}</td>
                  </tr>         
                ))
              }
            </tbody>
          </table>
        </div>
        <div id="members" className="info">
          <h3>List of members</h3>
            {
              this.state.members.map((member) => (
                <div className="member-info" key={Math.random()}>
                  <img src={member.avatar_url} alt={member.login}/>
                  <table>
                    <tbody>
                      {
                        Object.entries(member).map(el =>
                          <tr key={Math.random()}>
                            <td key={Math.random()} style={{color: "blue"}}>{el[0]}</td>
                            <td key={Math.random()}>{el[1]}</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              ))
            }
        </div>
        <PublicMembers outsideCollaborators={this.props.organizationInfo.filter(el => el[0] === "public_members_url").map(el => el[1].slice(0, -9))} />
      </React.Fragment>
        )
  }
}

export default Members
