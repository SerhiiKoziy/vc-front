import React, { Component } from 'react';
import { getUsers, sendMail, changeStatusSend } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import ReactSVG from 'react-svg';
import TextField from '../components/TextField/TextField';
import TextArea from '../components/TextArea/TextArea';
import Header from '../components/Header/Header';

class SendPage extends Component {
  constructor(props) {
    super(props);
    const defaultValues = {
      mail: '',
      name: '',
      company: '',
      country: '',
      city: '',
      description: '',
      daysToDate: 1,
    };
    this.defaultState = {
      values: defaultValues,
      touched: {
        mail: false,
        name: false,
        company: false,
        country: false,
        city: false,
        description: false,
      },
      errorMessages: {
        mail: 'Mail is required',
        name: 'Name is required',
        company: 'company is required',
        country: 'country is required',
        city: 'city is required',
        description: 'description is required',
      },
      validation: {
        mail: (value) => {
          const mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return mail.test(value);
        },
        name: (value) => {
          return value.length > 0;
        },
        company: (value) => {
          return value.length > 0;
        },
        country: (value) => {
          return value.length > 0;
        },
        city: (value) => {
          return value.length > 0;
        },
        description: (value) => {
          return value.length > 0;
        },
      },
      showPage: 'presentationPage',
      sending: false,
    };
    this.state = this.defaultState;
  }
  static propTypes = {
    sendMail: React.PropTypes.func,
    push: React.PropTypes.func,
    currentTask: React.PropTypes.object,
    sent: React.PropTypes.object,
    user: React.PropTypes.object,
    sending: React.PropTypes.bool,
    changeStatusSend: React.PropTypes.func,
  };
  handleFormSubmit(event) {
    event.preventDefault();
    const { mail, name, company, country, city, description } = this.state.values;
    const clientInfo = {
      mailClient: mail,
      nameClient: name,
      companyClient: company,
      countryClient: country,
      cityClient: city,
      descriptionClient: description,
    };
    // const userId = this.props.user.id;
    const userId = this.props.user.id;
    // console.log('sendMail front', clientInfo);
    this.props.sendMail(userId, clientInfo);
    // this.setState({ sending: true });
    // this.setState(this.defaultState);
  }
  handleInputChange(target, e) {
    this.updateValue(target, e.target.value.toString());
  }
  updateValue(target, value) {
    this.setState({
      values: {
        ...this.state.values,
        [target]: value,
      },
    });
  }
  isValidForm() {
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
    // console.log('validations', validations)
    return (validations.length === 0);
  }
  showError(target) {
    if (this.state.touched[target]) {
      if (!this.state.validation[target](this.state.values[target])) {
        return this.state.errorMessages[target];
      }
    }
    return null;
  }
  handleInputBlur(target) {
    this.setState({
      touched: {
        ...this.state.touched,
        [target]: true,
      },
    });
  }
  renderPresentation() {
    const { user } = this.props;
    let title;
    let cost;
    let id;
    if (user) {
      title = user.title;
      cost = user.cost;
      id = user.id;
    }
    return (
      <div className="presentation-wr">
        <div className="presentation-header">
          <div className="btn-back">
            <Link className="left-part" to={`/cv/${id}`}>
              <div className="icon-back">
                <ReactSVG
                  path="../assets/images/svg/back.svg"
                  className="example"
                  evalScript="always"
                  style={{ width: 35, fill: '#fff' }}
                />
              </div>
              <span>Back to CV</span>
            </Link>
          </div>
          <div className="header-center">
            <h4>{title}</h4>
            <p><span>${cost}</span>/month</p>
          </div>
        </div>
        <div className="diagram-wr">
          <div className="ins-diagram">
            <div className="left-name">

              <div className="part-header left-work">
                <h4></h4>
                <p>Director </p>
              </div>
            </div>

            <div className="diagram-box">
              <img src="../assets/images/pres-graph.png" alt="graph" />
            </div>
            <div className="right-name">
              <div className="part-header right-work">
                <h4></h4>
                <p> Manager</p>
              </div>
            </div>
          </div>
          <div className="bg-view">
            <div className="left-part">

              <div className="part-image">

              </div>
            </div>
            <div className="right-part">
              <div className="part-image">
              </div>
            </div>
          </div>
        </div>
        <div className="presentation-footer">
          <div
            className="order-btn"
            onClick={() => { return (this.setState({ showPage: 'pageForm' })); }}
          >
            <span>Order</span>
          </div>
        </div>
      </div>
    );
  }
  renderSendForm() {
    const { sent, sending } = this.props;
    return (
      <div className="main-form-wr">
        <div className="send-form-header">
          <div
            className="btn-back"
            onClick={() => { return (this.setState({ showPage: 'presentationPage' })); }}
          >
            <div className="icon-back">
              <ReactSVG
                path="../assets/images/svg/back.svg"
                className="example"
                evalScript="always"
                style={{ width: 35, fill: '#fff' }}
              />
            </div>
            <span>Back to presentation</span>
          </div>
        </div>
        <div className="inside-wr">
          <div className="builder-task">
            <div className="form-wr">
              <div className="bg-view">
                <div className="left-part">

                  <div className="part-image">
                  </div>
                </div>

                <div className="right-part">

                  <div className="part-image">
                  </div>
                </div>
              </div>
              <form
                id="upload_form"
                onSubmit={::this.handleFormSubmit} encType="multipart/form-data"
              >
                <div className="form-body">
                  <h4>Tell us about yourself</h4>
                  {
                    sending && sending === true && (
                      <div className="preload">
                        <img src="../assets/images/preloader.GIF" alt="preload" />
                      </div>
                    )
                  }
                  <TextField
                    classNameBox={'input-wr'}
                    placeholder={'Mail'}
                    value={this.state.values.mail}
                    fieldName="mail"
                    maxLength="30"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('mail')}
                  />
                  <TextField
                    classNameBox={'input-wr'}
                    placeholder={'Name'}
                    value={this.state.values.name}
                    fieldName="name"
                    maxLength="30"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('name')}
                  />
                  <TextField
                    classNameBox={'input-wr'}
                    placeholder={'Company'}
                    value={this.state.values.company}
                    fieldName="company"
                    maxLength="25"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('company')}
                  />
                  <TextField
                    classNameBox={'input-wr'}
                    placeholder={'Country'}
                    value={this.state.values.country}
                    fieldName="country"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('country')}
                  />
                  <TextField
                    classNameBox={'input-wr'}
                    placeholder={'City'}
                    value={this.state.values.city}
                    fieldName="city"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('city')}
                  />
                  <TextArea
                    classNameBox={'input-wr'}
                    placeholder={'Description/Project needs'}
                    value={this.state.values.description}
                    fieldName="description"
                    onChange={::this.handleInputChange}
                    onBlur={::this.handleInputBlur}
                    errorText={this.showError('description')}
                  />
                </div>
                <div className="mes-wr">
                  {
                    sent.status && sent.status === 200 && (
                      <p className="success">Your letter sent</p>
                    )
                  }
                  {
                    sent.status && sent.status !== 200 && (
                      <p className="error">We have some problem</p>
                    )
                  }
                </div>
                <div className="btn-wr">
                  <div className="btn-body">
                    <div className="btn-cancel">
                      <span>Cancel</span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn--fw"
                      disabled={!this.isValidForm()}
                    >
                      {'Continue'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderThankYouPage() {
    return (
      <div className="thank-wr">
        <Link className="btn-back " to={'/'}>
          <div
            className="icon-back"
          >
            <ReactSVG
              path="../assets/images/svg/back.svg"
              className="example"
              evalScript="always"
              style={{ width: 35, fill: '#fff' }}
            />

          </div>
          <span>Back to filter</span>
        </Link>
        <div className="thank-body">
          <div className="thank-text">
            <h4>Thank you!</h4>
            <p>for filling out your information</p>
            <p><span>We have received your enquiry and will respond to you soon</span></p>

            <Link
              className="exit-btn"
              to={'/'}
              onClick={() => {
                this.props.changeStatusSend();
              }}
            >
              <span>exit</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { sent } = this.props;
    let status;
    if (sent) {
      status = sent.status;
    }
    return (
      <div className={'page send-page'}>
        <div className="dashboard-wr">
          <div className="header-wr">
            <Header />
          </div>
          {
            this.state.showPage === 'presentationPage' && status !== 200 && (
              this.renderPresentation()
            )
          }
          {
            this.state.showPage === 'pageForm' && status !== 200 && (
              this.renderSendForm()
            )
          }
          {
            status === 200 && (
              this.renderThankYouPage()
            )
          }
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state, ownProps) => {
    if (state.data && state.data.data && state.data.data.length > 0) {
      const user = state.data.data.find(
          u => {
            return u.id === parseInt(ownProps.params.cvId, 10);
          }
      );
      if (user) {
        return {
          data: state.data,
          user,
          application: state.data.application,
          sent: state.data.sent || {},
          sending: state.data.sending || false,
        };
      }
      return {
        data: state.data,
        application: state.data.application,
        sent: state.data.sent || {},
        sending: state.data.sending || false,
      };
    }
    return {};
  },
  {
    getUsers, push, sendMail, changeStatusSend,
  }
)(SendPage);

export default ConnectedComponent;
