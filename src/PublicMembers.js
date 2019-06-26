import React from "react"

class PublicMembers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        publicMembers: []
    }
  }

  componentDidUpdate () {
    fetch(this.props.outsideCollaborators)
      .then(result => result.json())
      .then(data => (
        this.setState({
          publicMembers: data
        })
    ))
  }

  render() {
    return(
      <div id="outside-collaborators" className="info">
        <h3>Outside collaborators</h3>
        {
          this.state.publicMembers.map((member) => (
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
    )
  }
}

export default PublicMembers
