import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import TextField from '../TextField/TextField';
import RadioButton from '../RadioButton/RadioButton';
import { createTask, editTask } from '../../actions';

class CreateTask extends React.Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    buttonText: React.PropTypes.string,
    editTask: React.PropTypes.func,
    createTask: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const defaultValues = {
      address: 'Kiev, Kyiv city, Ukraine',
      title: '',
      cost: '',
      experience: '',
      skillName: '',
      skillExp: '',
      inHouse: true,
      isMain: true,
      daysToDate: 1,
      originalDate: nextDay,
    };
    this.defaultState = {
      values: this.props.currentTask || defaultValues,
      touched: {
        title: false,
        cost: false,
        experience: false,
        skillName: false,
        skillExp: false,
      },
      errorMessages: {
        title: 'Title is required',
        cost: 'Cost is required',
        experience: 'Experience is required',
        skillName: 'Experience is required',
        skillExp: 'skillExp is required',
      },
      validation: {
        title: (value) => {
          return value.length > 0;
        },
        cost: (value) => {
          return value.length > 0;
        },
        experience: (value) => {
          return value.length > 0;
        },
        skillName: (value) => {
          return value.length > 0;
        },
      },
      skills: [],
    };
    this.state = this.defaultState;
  }
  updateValue(target, value) {
    this.setState({
      values: {
        ...this.state.values,
        [target]: value,
      },
    });
  }
  createTask(values) {
    const dateObject = new Date(values.originalDate);
    const date = dateFormat(dateObject, 'dddd, mmmm dS');
    const currentTime = new Date().getTime();

    return {
      ...values,
      date,
      id: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }
  handleInputChange(target, e) {
    console.log('handleInputChange', target, e)
    this.updateValue(target, e.target.value);
  }
  handleFormSubmit(event) {
    event.preventDefault();
    const submitHandler = this.props.currentTask ? this.props.editTask : this.props.createTask;
    console.log(this.props, submitHandler);
    const task = this.createTask(this.state.values);

    if (this.props.currentTask) {
      task.createdAt = this.props.currentTask.createdAt;
      task.id = this.props.currentTask.id;
      task.stageProces = this.props.currentTask.stageProces;
    }

    submitHandler(task);
    this.setState(this.defaultState);
  }
  isValidForm() {
    const address = this.state.values.address;
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
    return (validations.length === 0 && address.length > 0);
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
  addSkill() {
    const skill = this.state.values.skillName;
    const experience = this.state.values.skillExp;
    const isMain = this.state.isMain;
    const newSkills = this.state.skills;
    console.log(newSkills);
    newSkills.push({ skill, experience, isMain });
    console.log(newSkills);
    this.setState({ skills: newSkills });
  }

  render() {
    return (
      <div className="form-wr">
        <form onSubmit={::this.handleFormSubmit}>
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter title'}
            value={this.state.values.title}
            fieldName="title"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('title')}
          />
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter cost'}
            value={this.state.values.cost}
            fieldName="cost"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('description')}
          />
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter experience'}
            value={this.state.values.experience}
            fieldName="experience"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('description')}
          />
          <RadioButton
            classNameBox={'input-wr'}
            fieldName={"inHouse"}
            id={'inHouse'}
            label={'inHouse'}
            name={'checkbox'}
            type={'checkbox'}
            onChange={() => {
              this.setState({
                inHouse: !this.state.inHouse,
              });
            }}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('inHouse')}
          />
          <div className="have-skills">
            {
              this.state.skills.map((item, i) => {
                return (
                  <ul className="skill-form" key={i}>
                    <li><span>skill: </span><span>{item.skill}</span></li>
                    <li><span>experience: </span><span>{item.experience}</span></li>
                    <li><span>isMain: </span><span>{item.isMain ? '' : 'main'}</span></li>
                  </ul>
                );
              })
            }
          </div>
          <button
            type="submit"
            className="btn btn--fw"
            disabled={!this.isValidForm()}
          >
            {this.props.buttonText || 'Add CV'}
          </button>
        </form>
        <div className="add-skill">
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter skill'}
            value={this.state.values.skillName}
            fieldName="skillName"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('skillName')}
          />
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter skill experience'}
            value={this.state.values.skillExp}
            fieldName="skillExp"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('skillName')}
          />
          <RadioButton
            classNameBox={'input-wr'}
            fieldName={"isMain"}
            value={this.state.values.skillExp}
            id={'isMain'}
            label={'isMain'}
            name={'checkbox'}
            type={'checkbox'}
            defaultChecked={true}
            // onChange={::this.handleInputChange}
            onChange={() => {
              this.setState({
                isMain: !this.state.isMain,
              });
            }}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('inHouse')}
          />

          <button
            type=""
            className="btn btn--fw addSkillButton"
            onClick={::this.addSkill}
          >
            {this.props.buttonText || 'Add skill'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { createTask, editTask })(CreateTask);
