import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask, getUser } from '../actions';
import TaskView from '../components/Task/TaskView';
// import TextField from '../components/TextField/TextField';

class TaskPage extends Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    push: React.PropTypes.func,
    getUser: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    children: React.PropTypes.any,
    data: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      valueSend: '',
    };
  }

  componentDidMount() {
    // this.props.getUser(this.props.data.data[0].id);
  }

  deleteTask() {
    this.props.push('/');
    this.props.deleteTask(this.props.currentTask.id);
  }

  handleInputChange(target, e) {
    console.log(e.target.value);
    this.setState({
      valueSend: e.target.value,
    });
  }

  render() {
    const base = (this.props.application === 'admin') ? 'admin' : '';
    // console.log(isAdminPanel)
    if (this.props.user) {
      return (
        <div className={`page task-page ${this.props.application}-task`}>
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
                <Link className="left-part" to={`/${base}`}>
                  <i className="fa fa-angle-left" aria-hidden="true" />
                  <span>Back to board</span>
                </Link>
                <div className="right-part">
                  <div className="header-center-wr">
                    <img src="" alt="" />
                    <div className="center-info">
                      <p className="name">Yura Kolesnicov</p>
                      <p className="info-position">interviewed by Mobilunity on 04.05.16</p>
                    </div>
                  </div>
                  <div className="cost-info">
                    <p className="cost">{`$${this.props.user.cost}/month`}</p>
                    <p className="cost-desc">this cost is all</p>
                  </div>
                  <div className="proc-btn">
                    <span>Proceed to Request</span>
                  </div>
                </div>
              </div>
              <TaskView
                item={this.props.user}
                onDelete={::this.deleteTask}
              />
            </div>
            <div className="bg-popup hidden" />
            <div className="popup-send-mail hidden">
              <p className="header-send">
                <span>Enter your email</span>
              </p>
              <div className="body-send">
                <div className="input-wr">
                  <input
                    placeholder=""
                    /* value={this.state.valueSend}
                     onChange={(e) => this.setState({ valueSend: e.target.value })}*/
                  />
                </div>
                <div className="send-btn-wr">
                  <div className="cancel-btn">
                    <span>Cancel</span>
                  </div>
                  <div className="send-btn">
                    <span>Send</span>
                  </div>
                </div>
              </div>
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
  /* (state, ownProps) => {
   return {
   currentTask: state.data.find(task => {
   return task.id === parseFloat(ownProps.params.taskId);
   }),
   };
   },*/
  (state, ownProps) => {
    if (state.data && state.data.data && state.data.data.length > 0) {
      const user = state.data.data.find(u => u.id === parseInt(ownProps.params.taskId));

      if (user) {
        return {
          user,
          application: state.data.application,
        };
      }

      return {};
    }

    return {};
  },
  { deleteTask, getUser, push }
)(TaskPage);
