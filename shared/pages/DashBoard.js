import React, { Component } from 'react';
import { deleteUser, getUsers } from '../actions';
import { connect } from 'react-redux';
import CreateCV from '../components/CV/CreateCV';
import PreViewCv from '../components/CV/PreViewCv';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
    };
  }
  static propTypes = {
    deleteUser: React.PropTypes.func,
    getUsers: React.PropTypes.func,
    data: React.PropTypes.object,
  };
  deleteUser(userId) {
    this.props.deleteUser(userId);
  }
  renderDustbins() {
    const { data, application } = this.props.data;
    if (data) {
      return this.props.data.data.map((item, i) => {
        return (
          <PreViewCv
            item={item}
            key={i}
            isAdminPanel={application}
            onDelete={(e) => { this.deleteUser(item.id, e); }}
          />
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div className={'page start-page columns'}>
        <div className="dashboard-wr">
          <div className="builder-task">
            <CreateCV />
          </div>
          <div className="inside-wr">
            <div className="lists-wr">
              {this.renderDustbins()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => {
    return { data: state.data };
  },
  {
    deleteUser, getUsers,
  }
)(DashBoard);

export default ConnectedComponent;
