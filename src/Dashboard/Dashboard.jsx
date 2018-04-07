import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Button } from '../_components';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
          <div  style={{width:'500px', padding:'50px'}}>
            <h1>Hi {user.firstName}!</h1>
            <p>Team Dashboard</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
            <table cellSpacing={'25px'}>
              <tbody>
                <tr>
                  <th width={'90px'}>Props</th>
                  <th width={'90px'}>Enabled</th>
                  <th width={'90px'}>Disabled</th>
                </tr>
                <tr>
                  <td>Primary</td>
                  <td><Button primary>DEFAULT</Button></td>
                  <td><Button primary disabled>DISABLED</Button></td>
                </tr>
                <tr>
                <td>Primary Small</td>
                  <td><Button primary small>DEFAULT</Button></td>
                  <td><Button primary small disabled>DISABLED</Button></td>
                </tr>
                <tr>
                  <td>Secondary</td>
                  <td><Button secondary>DEFAULT</Button></td>
                  <td><Button secondary disabled>DISABLED</Button></td>
                </tr>
                <tr>
                <td>Secondary Small</td>
                  <td><Button secondary small>DEFAULT</Button></td>
                  <td><Button secondary small disabled>DISABLED</Button></td>
                </tr>
              </tbody>
            </table>
          </div> 
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };