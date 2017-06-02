import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { deleteTask, getUser, sendMail } from '../actions';
// import MAIL_REG from '../constants/regExp';
import TaskView from '../components/Task/TaskView';
import TextField from '../components/TextField/TextField';

class TaskPage extends Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    user: React.PropTypes.object,
    push: React.PropTypes.func,
    getUser: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    sendMail: React.PropTypes.func,
    children: React.PropTypes.any,
    data: React.PropTypes.object,
    application: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      openPopup: false,
      validation: {
        mail: (value) => {
          const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return mail.test(value);
        },
      },
      touched: {
        mail: false,
      },
      errorMessages: {
        mail: 'Mail is required (need real email)',
      },
    };
  }
  sendMail() {
    const userId = this.props.user.id;
    const clientMail = this.state.mail;
    this.props.sendMail(userId, clientMail);
  }
  deleteTask() {
    this.props.push('/');
    this.props.deleteTask(this.props.currentTask.id);
  }
  handleInputChange(target, e) {
    this.updateValue(target, e.target.value.toString());
  }
  updateValue(target, value) {
    this.setState({
      ...this.state.values,
      [target]: value,
    });
  }
  handleInputBlur(target) {
    this.setState({
      touched: {
        ...this.state.touched,
        [target]: true,
      },
    });
  }
  showError(target) {
    if (this.state.touched[target]) {
      if (!this.state.validation[target](this.state[target])) {
        return this.state.errorMessages[target];
      }
    }
    return null;
  }
  handlePopup() {
    this.setState({ openPopup: !this.state.openPopup });
  }
  renderHeader() {
    return (
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
    );
  }
  renderFooter() {
    return (
      <div className="footer-task">
        <div className="footer-wr">
          <div
            className="send-btn"
            onClick={::this.handlePopup}
          >
            <span>Send me to email</span>
          </div>
          <div className="proc-btn">
            <span>Proceed to Request</span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const base = (this.props.application === 'admin') ? 'admin' : '';
    return (
      <div className={`page task-page ${this.props.application}-task`}>
        <div className="inside-wr">
          {this.renderHeader()}
          {
            this.props.user && (
              <div className="task-wr">
                <div className="task-header">
                  <Link className="left-part" to={`/${base}`}>
                    <i className="fa fa-angle-left" aria-hidden="true" />
                    <span>Back to board</span>
                  </Link>
                  <div className="right-part">
                    <div className="header-center-wr">
                      <div className="image-wr">
                        <img src={this.props.user.image} alt="" />
                      </div>
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
            )
          }
          {
            !this.props.user && (
              <div className="">
                <p>Not found cv</p>
              </div>
            )
          }
          <div className={`bg-popup ${this.state.openPopup ? '' : 'hidden'}`} />
          <div className={`popup-send-mail ${this.state.openPopup ? '' : 'hidden'}`}>
            <p className="header-send">
              <span>Enter your email</span>
            </p>
            <div className="body-send">
              <div className={`input-wr ${this.props.sended === 'OK' ? 'sended' : 'error'}`}>
                <TextField
                  classNameBox={'input-wr'}
                  placeholder={'Enter mail'}
                  value={this.state.mail}
                  fieldName="mail"
                  onChange={::this.handleInputChange}
                  onBlur={::this.handleInputBlur}
                  errorText={this.showError('mail')}
                />
              </div>
              <div className="send-btn-wr">
                <div className="cancel-btn" onClick={::this.handlePopup}>
                  <span>Cancel</span>
                </div>
                <div
                  className="send-btn"
                  onClick={::this.sendMail}
                >
                  <span>Send</span>
                </div>
              </div>
            </div>
          </div>
          {this.props.children}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
   // return null;
}

export default connect(
  (state, ownProps) => {
    if (state.data && state.data.data && state.data.data.length > 0) {
      const user = state.data.data.find(u => u.id === parseInt(ownProps.params.taskId, 10));
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
  { deleteTask, getUser, sendMail, push }
)(TaskPage);
