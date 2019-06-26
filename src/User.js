import React from "react";

class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <React.Fragment>
        <div id="user-info" style={this.props.style} className="info">
          <h3>About user</h3>
          <img src={this.props.avatar} alt={this.props.userInfo.login} />
          <table>
            <tbody>
              {
                Object.entries(this.props.userInfo).map(el => (
                  <tr key={Math.random()}>
                    <td style={{color: "blue"}} key={Math.random()}>{el[0]}</td>
                    <td key={Math.random()}>{el[1]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default User
        