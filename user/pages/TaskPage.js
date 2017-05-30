import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask, getUser } from '../actions';
import Task from '../components/Task/Task';

class TaskPage extends Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    push: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    children: React.PropTypes.any,
  };
  componentDidMount() {
    this.props.getUser(this.props.data.data[0].id);
  }
  deleteTask() {
    this.props.push('/');
    this.props.deleteTask(this.props.currentTask.id);
  }
  render() {
    if (this.props.data) {
      return (
        <div className={'page task-page'}>
          <div className="inside-wr">
            <div className="header-wr">
              <div className="header">
                <div className="header-fiq">
                  <span>? FIQ</span>
                </div>
                <div className="header-title">
                  <h4>Header</h4>
                </div>
                <div className="header-contact">
                  <span>contact us <i className="fa fa-envelope-o" aria-hidden="true" /></span>
                </div>
              </div>
            </div>
            <div className="task-wr">
              <div className="task-header">
                <Link to="/">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                  <span>Back to board</span>
                </Link>
              </div>
              <Task
                item={this.props.data.data[0]}
                onDelete={::this.deleteTask}
              />

            </div>
            <div className="footer-task">
              <div className="footer-wr">
                <div className="send-btn">
                  <span>Send me to email</span>
                </div>
                <div className="proc-btn">
                  <span>Proceed to Request</span>
                </div>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>

      );
    }

    return null;
  }
}

export default connect(
  /*(state, ownProps) => {
    return {
      currentTask: state.data.find(task => {
        return task.id === parseFloat(ownProps.params.taskId);
      }),
    };
  },*/
  (state, ownProps) => {
    return { data: state.data };
  },
  { deleteTask, getUser, push }
)(TaskPage);
