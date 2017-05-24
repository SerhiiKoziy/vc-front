import React, { Component } from 'react';
import { deleteTask, updateTask, getUsers } from '../actions';
import { connect } from 'react-redux';
import CreateTask from '../components/Task/CreateTask';
import Task from '../components/Task/Task';
import Box from '../components/Task/Box';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
    };
  }

  static propTypes = {
    deleteTask: React.PropTypes.func,
    updateTask: React.PropTypes.func,
    data: React.PropTypes.array,
  };
  deleteTask(taskId) {
    this.props.deleteTask(taskId);
  }

  renderTask(item, i) {
    return (
      <Task item={item} key={i} onDelete={this.deleteTask.bind(this, item.id)} />
    );
  }
  renderDustbins() {
    return this.props.data.map((item, i) => {
      return (
        <Task item={item} key={i} onDelete={this.deleteTask.bind(this, item.id)} />
      );
    });
  }

  render() {
    return (
      <div className={'page start-page columns'}>
        <div className="dashboard-wr">
          <div className="builder-task">
            <CreateTask />
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
    deleteTask, updateTask,
  }
)(DashBoard);

export default ConnectedComponent;
