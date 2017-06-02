import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import TextField from '../TextField/TextField';
import CheckBox from '../CheckBox/CheckBox';
import { createTask, updateUser, getUsers, createUser } from '../../actions';

class CreateTask extends React.Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    buttonText: React.PropTypes.string,
    editTask: React.PropTypes.func,
    getUsers: React.PropTypes.func,
    updateUser: React.PropTypes.func,
    createTask: React.PropTypes.func,
    createUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const defaultValues = {
      address: 'Kiev, Kyiv city, Ukraine',
      title: '',
      cost: '',
      inHouse: true,
      experience: '',
      daysToDate: 1,
      originalDate: nextDay,
      skillsChange: false,
      skills: [],
      image: '',
      fileName: '',
    };
    this.defaultState = {
      values: this.props.currentTask || defaultValues,
      touched: {
        title: false,
        cost: false,
        experience: false,
        /*image: false,*/
      },
      errorMessages: {
        title: 'Title is required',
        cost: 'Cost is required',
        experience: 'Experience is required',
        image: 'Image is required',
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
        image: (value) => {
          return value.length > 0;
        },
      },
      skillName: '',
      skillExp: '',
      isMain: false,
    };
    this.state = this.defaultState;
  }

  createTask(values) {
    const dateObject = new Date();
    const date = dateFormat(dateObject, 'dddd, mmmm dS');
    const currentTime = new Date().getTime();

    return {
      inHouse: this.state.inHouse,
      ...values,
      date,
      id: currentTime,
    };
  }
  handleInputChange(target, e) {
    this.updateValue(target, e.target.value.toString());
  }
  updateValue(target, value) {
    if (target === 'skillName' || target === 'skillExp') {
      this.setState({
        ...this.state,
        [target]: value,
      });
    } else {
      this.setState({
        values: {
          ...this.state.values,
          [target]: value,
        },
      });
    }
  }
  handleCheckBoxInHouse(value) {
    this.setState({
      values: {
        ...this.state.values,
        inHouse: value,
      },
    });
  }
  handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('upload_form'));
    formData.append('tax_file', document.getElementById('file-input').files);
    // console.log('formData', formData);
    const submitHandler = this.props.currentTask ? this.props.updateUser : this.props.createUser;
    const task = this.createTask(this.state.values);

    if (this.props.currentTask) {
      task.id = this.props.currentTask.id;
    }

    // submitHandler(formData);
    submitHandler(task);
    const skills = this.props.currentTask;
    this.defaultState.values.skills = skills ? skills.skills : [];
    this.setState(this.defaultState);
  }
  isValidForm() {
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
    // console.log('validations', validations)
    return (validations.length === 0);
    // return ([].length === 0);
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
    const skill = this.state.skillName;
    const experience = this.state.skillExp;
    const main = this.state.isMain;
    const newSkills = this.state.values.skills;
    newSkills.push({ skill, experience, main });
    this.setState({
      skillExp: '',
      skillName: '',
      values: {
        ...this.state.values,
        skills: newSkills,
        skillsChange: true,
      },
    });
  }
  deleteSkill(skillId) {
    const skills = this.state.values.skills;
    /* const newSkills = [];
    skills.map((item, i) => {
      i === skillId ? null : newSkills.push(item);
    })*/
    const newSkills = skills.filter((item, i) => {
      return i !== skillId;
    });
    this.setState({
      values: {
        ...this.state.values,
        skills: newSkills,
        skillsChange: true,
      },
    });
  }
  onDropHandler(target, e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    let result;
    reader.onload = (event) => {
      result = event.target.result;
      this.setState({
        image: event.target.result,
        fileName: file.name,
        values: {
          ...this.state.values,
          image: event.target.result,
          fileName: file.name,
        },
      });
    };
    reader.readAsDataURL(file);
  }
  render() {
    return (
      <div className="form-wr">
        <form id="upload_form" onSubmit={::this.handleFormSubmit} encType="multipart/form-data">
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
            errorText={this.showError('cost')}
          />
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter experience'}
            value={this.state.values.experience}
            fieldName="experience"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('experience')}
          />
          <TextField
            id={'file-input'}
            classNameBox={'input-wr'}
            placeholder={'Enter image'}
            fileName={this.state.values.fileName}
            preVision={this.state.values.image}
            type={'file'}
            fieldName="image"
            onChange={::this.onDropHandler}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('image')}
          />
          <CheckBox
            classNameBox={'input-wr'}
            fieldName={"inHouse"}
            id={'inHouse'}
            label={'inHouse'}
            defaultChecked={this.state.values.inHouse}
            name={'checkbox'}
            type={'checkbox'}
            onChange={() => {
              this.handleCheckBoxInHouse(!this.state.values.inHouse);
            }}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('inHouse')}
          />
          <div className="have-skills">
            {
              this.state.values.skills && (this.state.values.skills.map((item, i) => {
                // let skillId = {` ${item.skill} + ${i}`}
                return (
                  <ul className="skill-form" key={i}>
                    <li><span>skill: </span><span>{item.skill}</span></li>
                    <li><span>experience: </span><span>{item.experience}</span></li>
                    <li><span>isMain: </span><span>{item.main ? 'main' : ''}</span></li>
                    <li
                      className="del-skill"
                      onClick={(e) => { this.deleteSkill(i, e); }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </li>
                  </ul>
                );
              })
              )
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
            value={this.state.skillName}
            fieldName="skillName"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
          />
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter skill experience'}
            value={this.state.skillExp}
            fieldName="skillExp"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
          />
          <CheckBox
            classNameBox={'input-wr'}
            fieldName={"isMain"}
            value={this.state.isMain}
            id={'isMain'}
            label={'isMain'}
            name={'checkbox'}
            type={'checkbox'}
            defaultChecked={this.state.isMain}
            onChange={() => {
              this.setState({
                isMain: !this.state.isMain,
              });
            }}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('isMain')}
          />

          <button
            type=""
            className="btn btn--fw addSkillButton"
            onClick={::this.addSkill}
            disabled={this.state.skillExp && this.state.skillName ? '' : 'disabled'}
          >
            {this.props.buttonText || 'Add skill'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { createTask, updateUser, getUsers, createUser })(CreateTask);
