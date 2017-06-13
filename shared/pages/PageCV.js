import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { getUser, sendMail, letterSent } from '../actions';
// import MAIL_REG from '../constants/regExp';
import ViewCv from '../components/CV/ViewCv';
import TextField from '../components/TextField/TextField';

class PageCV extends Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    user: React.PropTypes.object,
    push: React.PropTypes.func,
    letterSent: React.PropTypes.func,
    getUser: React.PropTypes.func,
    sendMail: React.PropTypes.func,
    children: React.PropTypes.any,
    data: React.PropTypes.object,
    application: React.PropTypes.string,
    sentText: React.PropTypes.string,
    sent: React.PropTypes.object,
    sending: React.PropTypes.bool,
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
      sending: false,
    };
  }
  sendMail() {
    const userId = this.props.user.id;
    const clientInfo = {
      mailClient: this.state.mail,
      nameClient: null,
      companyClient: null,
      countryClient: null,
      cityClient: null,
      descriptionClient: null,
    };
    this.props.sendMail(userId, clientInfo);
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
  isValidForm() {
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state[field]);
    });
    return (validations.length === 0);
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
    this.props.letterSent('');
    this.setState({ openPopup: !this.state.openPopup, mail: '' });
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
  renderPopup() {
    const { sending, sentText } = this.props;
    return (
      <div>
        <div className={`bg-popup ${this.state.openPopup ? '' : 'hidden'}`} />
        <div className={`popup-send-mail ${this.state.openPopup ? 'anim-popup' : 'hidden'}`}>
          {
            sending && sending === true && (
              <div className="preload">
                <img src="../assets/images/preloader.GIF" alt="preload" />
              </div>
            )
          }
          <p className="header-send">
            <span>Enter your email</span>
          </p>
          <div className="body-send">
            <div
              className={`input-wr `}
            >
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
            <div className="send-message">
              {
                (sentText && sentText === 'OK') && (
                  <p className="success-test">Your letter sent</p>
                )
              }
              {
                (sentText && sentText !== 'OK') && (
                  <p className="unsuccess-test">We have some problem</p>
                )
              }
            </div>
            <div className="send-btn-wr">
              <div className="cancel-btn" onClick={::this.handlePopup}>
                <span>Cancel</span>
              </div>
              <div
                className={`send-btn ${!this.isValidForm() ? 'disabled' : ''}`}
                onClick={!this.isValidForm() ? '' : ::this.sendMail}
              >
                <span>Send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  goToMainSendMail() {
    this.props.push('/SendPage');
  }
  renderFooter() {
    return (
      <div className="footer-task">
        <div className="footer-wr">
          <div
            className="send-btn"
            onClick={this.props.user ? ::this.handlePopup : ''}
          >
            <span>Send me to email</span>
          </div>
          <div
            onClick={::this.goToMainSendMail}
            className="proc-btn"
          >
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
                    <div className="icon-back">
                      <i className="fa fa-angle-left" aria-hidden="true" />
                    </div>
                    <span>Back to board</span>
                  </Link>
                  <div className="center-part">
                    <div className="header-center-wr">
                      <div className="image-wr">
                        <img src={this.props.user.image} alt="" />
                      </div>
                      <div className="center-info">
                        <p className="name">{this.props.user.username}</p>
                        <p className="info-position">interviewed by Mobilunity on 04.05.16</p>
                      </div>
                    </div>
                  </div>
                  <div className="right-part">
                    <div className="cost-info">
                      <p className="cost">
                        <span>{`$${this.props.user.cost}`}</span>/month
                      </p>
                      <p className="cost-desc">this cost is all</p>
                    </div>
                    <div className="proc-btn">
                      <span>Proceed to Request</span>
                    </div>
                  </div>
                </div>
                <ViewCv
                  item={this.props.user}
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
          {this.renderPopup()}
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
          sent: state.data.sent || { status: '' },
          sentText: state.data.sentText || '',
          sending: state.data.sending || false,
        };
      }
      return {
        application: state.data.application,
        sent: state.data.sent || { status: '' },
        sentText: state.data.sentText || '',
        sending: state.data.sending || false,
      };
    }
    return {};
  },
  { getUser, sendMail, letterSent, push }
)(PageCV);
