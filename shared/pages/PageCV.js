import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import ReactSVG from 'react-svg';
import { getUser, sendMail, letterSent } from '../actions';
// import MAIL_REG from '../constants/regExp';
import ViewCv from '../components/CV/ViewCv';
import TextField from '../components/TextField/TextField';
import Header from '../components/Header/Header';

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
          const mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
        <Header />
      </div>
    );
  }
  renderPopup() {
    const { sending, sentText } = this.props;
    return (
      <div>
        <div
          className={`bg-popup
          ${this.state.openPopup && this.props.sentText.length === 0 ? 'anim-bg' : 'hidden'}`}
        />
        <div
          className={`popup-send-mail
          ${this.state.openPopup && this.props.sentText.length === 0 ? 'anim-popup' : 'hidden'}`}
        >
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
              className={'input-wr '}
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
            <div className="info-text">
              <div className="svg-wr">
                <ReactSVG
                  path="../assets/images/svg/info.svg"
                  className="example"
                  evalScript="always"
                  style={{ width: 15, height: 15, fill: '#177baa' }}
                />
              </div>
              <span className="">Your email will be neither shared,
                sold nor rented to any third party for commercial reasons
                <a href="" target="_blank"> read more</a>
              </span>
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

  renderFooter() {
    const { user } = this.props;
    let cvId;
    if (user) {
      cvId = user.id;
    }

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
            // onClick={::this.goToMainSendMail}
            className="proc-btn"
          >
            <Link className="" to={`/send/${cvId || ''}`}>
              <span>Proceed to Request</span>
            </Link>

          </div>
        </div>
      </div>
    );
  }
  render() {
    const base = (this.props.application === 'admin') ? 'admin' : '';
    const { user } = this.props;
    let cvId;
    let whereInterviewed = 'Company Name';
    let interviewDate = 'yesterday';
    let divStyle = {};
    let image = '';
    if (user) {
      cvId = user.id;
      whereInterviewed = user.whereInterviewed;
      interviewDate = user.interviewDate;
      image = user.image;
      divStyle = {
        backgroundImage: `url(../../uploads/${image})`,
      };
    }
    return (
      <div className={`page task-page ${this.props.application}-task`}>
        <div className="inside-wr">
          {
            this.props.application === 'user' && (
              this.renderHeader()
            )
          }
          {
            this.props.user && this.props.application === 'user' && (
              <div className="task-wr">
                <div className="task-header">
                  <Link className="left-part" to={`/${base}`}>
                    <div className="icon-back">
                      <ReactSVG
                        path="../assets/images/svg/back.svg"
                        className="example"
                        evalScript="always"
                        style={{ width: 35, fill: '#fff' }}
                      />
                    </div>
                    <span>Back to board</span>
                  </Link>
                  <div className="center-part">
                    <div className="header-center-wr">
                      <div className="image-wr">
                        <div
                          className="image-style"
                          style={divStyle}
                        >
                        </div>
                        {/* <img src={user.image} alt="" />*/}
                      </div>
                      <div className="center-info">
                        <p className="name">{user.username}</p>
                        <p className="info-position">
                          interviewed by {whereInterviewed} on {interviewDate}
                        </p>
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
                      <Link className="" to={`/send/${cvId || ''}`}>
                        <span>Proceed to Request</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <ViewCv
                  item={this.props.user}
                  application={this.props.application}
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
          {
            this.props.application === 'user' && (
              this.renderPopup()
            )
          }
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
      const user = state.data.data.find(
        u => {
          return u.id === parseInt(ownProps.params.cvId, 10);
        }
      );
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
