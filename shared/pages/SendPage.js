import React, { Component } from 'react';
import { deleteUser, getUsers, sendMailInfo } from '../actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from '../components/TextField/TextField';
import TextArea from '../components/TextArea/TextArea';
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
          return value.length > 0;
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
      showForm: false,
    };
    this.state = this.defaultState;
  }
  static propTypes = {
    sendMailInfo: React.PropTypes.func,
    push: React.PropTypes.func,
    currentTask: React.PropTypes.object,
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
    this.props.sendMailInfo(clientInfo);
    this.setState(this.defaultState);
  }
  handleInputChange(target, e) {
    this.updateValue(target, e.target.value.toString());
  }
  updateValue(target, value) {
    if (value) {
      this.setState({
        values: {
          ...this.state.values,
          [target]: value,
        },
      });
    }
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
  renderSendForm() {
    return (
      <div>
        <div className="back-wr">
          <div
            className="back-btn"
            onClick={() => { return (this.setState({ showForm: false })); }}
          >
            <span>back</span>
          </div>
        </div>

        <div className="inside-wr">
          <h4>Tell us about yourself</h4>
          <div className="builder-task">
            <div className="form-wr">
              <form
                id="upload_form"
                onSubmit={::this.handleFormSubmit} encType="multipart/form-data"
              >
                <div className="form-body">
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
                <button
                  type="submit"
                  className="btn btn--fw"
                  disabled={!this.isValidForm()}
                >
                  {'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderPresentation() {
    return (
      <div className="presentation-wr">
        <div className="presentation-header">
          <div className="btn-back">back</div>
          <div className="header-center">
            <p>Sinior</p>
            <p>3000$/month</p>
          </div>
        </div>
        <div className="diagram-wr">
          <div className="diagram-box"></div>
          <div className="bg-view">
            <div className="left-part">
              <div className="part-header">
                <h4>Alfonsine Williams</h4>
                <p>Director of Business Development</p>
              </div>
              <div className="part-image">
                <img src="" alt="" />
              </div>
            </div>

            <div className="right-part">
              <div className="part-header">
                <h4>Olga Zhuk</h4>
                <p>Account Manager</p>
              </div>
              <div className="part-image">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="presentation-footer">
          <div
            className="order-btn"
            onClick={() => { return (this.setState({ showForm: true })); }}
          >
            <span>order</span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={'page send-page'}>
        <div className="dashboard-wr">
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
          {
            this.state.showForm && (
              this.renderSendForm()
            )
          }
          {
            !this.state.showForm && (
              this.renderPresentation()
            )
          }
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
    deleteUser, getUsers, push, sendMailInfo,
  }
)(SendPage);

export default ConnectedComponent;
