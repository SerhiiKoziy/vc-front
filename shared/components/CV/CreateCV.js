import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import TextField from '../TextField/TextField';
import TextArea from '../TextArea/TextArea';
// import CheckBox from '../CheckBox/CheckBox';
import { updateUser, getUsers, createUser } from '../../actions';

class createCV extends React.Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    buttonText: React.PropTypes.string,
    editTask: React.PropTypes.func,
    getUsers: React.PropTypes.func,
    updateUser: React.PropTypes.func,
    createCv: React.PropTypes.func,
    createUser: React.PropTypes.func,
    push: React.PropTypes.func,
    paramsEdit: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const defaultValues = {
      title: '',
      username: '',
      cost: '',
      inHouse: true,
      experience: '',
      whereInterviewed: '',
      interviewDate: moment(),
      originalDate: nextDay,
      skillsChange: false,
      skillEdit: false,
      workEdit: false,
      skills: [],
      works: [],
      summary: [],
      image: '',
      fileName: '',
    };
    this.defaultState = {
      values: this.props.currentTask || defaultValues,
      touched: {
        title: false,
        username: false,
        cost: false,
        experience: false,
        whereInterviewed: false,
      },
      errorMessages: {
        title: 'Title is required',
        username: 'User name is required',
        whereInterviewed: 'User name is required',
        cost: 'Cost is required',
        experience: 'Experience is required',
        image: 'Image is required',
        skillExp: 'skillExp is required',
      },
      validation: {
        title: (value) => {
          return value.length > 0;
        },
        username: (value) => {
          return value.length > 0;
        },
        whereInterviewed: (value) => {
          return value.length > 0;
        },
        cost: (value) => {
          const valueString = value.toString();
          return valueString.length > 0;
        },
        experience: (value) => {
          const valueString = value.toString();
          return valueString.length > 0;
        },
        image: (value) => {
          return value.length > 0;
         // return true;
        },
      },
      skillName: '',
      skillExp: '',
      isMain: false,

      workName: '',
      workDescription: '',

      managerName: '',
      cvSummary: '',
      imageManager: '',
    };
    if (this.props.paramsEdit) {
      this.defaultState.touched = {
        title: true,
        username: true,
        cost: true,
        experience: true,
        whereInterviewed: true,
      };
      this.defaultState.values.interviewDate = moment(new Date());
      this.state = this.defaultState;
    } else {
      this.state = this.defaultState;
    }
  }

  createCv(values) {
    const currentTime = new Date().getTime();
    const interviewDate = moment(values.interviewDate).format('YYYY/MM/DD');
    return {
      inHouse: this.state.inHouse,
      ...values,
      interviewDate,
      id: currentTime,
    };
  }
  handleInputChange(target, e) {
    if (target === 'interviewDate') {
      this.updateValue(target, moment(e));
    } else {
      this.updateValue(target, e.target.value.toString());
    }
  }
  handleInterviewDateChange(data) {
    this.handleInputChange('interviewDate', data);
  }
  updateValue(target, value) {
    if (target === 'skillName' || target === 'skillExp') {
      this.setState({
        ...this.state,
        [target]: value,
      });
    } else if (target === 'workName' || target === 'workDescription') {
      this.setState({
        ...this.state,
        [target]: value,
      });
    } else if (target === 'managerName' || target === 'cvSummary') {
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
    // const submitHandler = this.props.currentTask ? this.props.updateUser : this.props.createUser;
    let submitHandler;
    if (this.props.currentTask) {
      this.props.push('/admin');
      submitHandler = this.props.updateUser;
    } else {
      submitHandler = this.props.createUser;
    }
    const task = this.createCv(this.state.values);

    if (this.props.currentTask) {
      task.id = this.props.currentTask.id;
    }

    // submitHandler(formData);
    submitHandler(task);
    const skills = this.props.currentTask;
    const works = this.props.currentTask;
    const summary = this.props.currentTask;
    this.defaultState.values.skills = skills ? skills.skills : [];
    this.defaultState.values.works = works ? works.works : [];
    this.defaultState.values.summary = summary ? summary.summary : [];
    this.setState(this.defaultState);
  }
  isValidForm() {
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
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
      skillEdit: false,
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
  editSkill(skillId) {
    const skills = this.state.values.skills;
    const selectSkill = skills.filter((item, i) => {
      return i === skillId;
    });
    const newSkills = skills.filter((item, i) => {
      return i !== skillId;
    });
    this.setState({
      skillName: selectSkill[0].skill,
      skillExp: selectSkill[0].experience,
      isMain: selectSkill[0].main,
      skillEdit: true,
      values: {
        ...this.state.values,
        skills: newSkills,
      },
    });
  }
  addWork() {
    const work = this.state.workName;
    const workDescription = this.state.workDescription;
    const newWorks = this.state.values.works;
    newWorks.push({ work, workDescription });
    this.setState({
      workName: '',
      workDescription: '',
      workEdit: false,
      values: {
        ...this.state.values,
        works: newWorks,
        worksChange: true,
      },
    });
  }
  deleteWork(workId) {
    const works = this.state.values.works;
    /* const newSkills = [];
     skills.map((item, i) => {
     i === skillId ? null : newSkills.push(item);
     })*/
    const newWorks = works.filter((item, i) => {
      return i !== workId;
    });
    this.setState({
      values: {
        ...this.state.values,
        works: newWorks,
        worksChange: true,
      },
    });
  }
  editWork(workId) {
    const works = this.state.values.works;
    const selectWork = works.filter((item, i) => {
      return i === workId;
    });
    const newWorks = works.filter((item, i) => {
      return i !== workId;
    });
    this.setState({
      workName: selectWork[0].work,
      workDescription: selectWork[0].workDescription,
      workEdit: true,
      values: {
        ...this.state.values,
        works: newWorks,

      },
    });
  }
  addSummary() {
    const managerName = this.state.managerName;
    const cvSummary = this.state.cvSummary;
    const imageManager = this.state.imageManager;
    const summaryArr = this.state.values.summary;
    summaryArr.push({ managerName, cvSummary, imageManager });
    this.setState({
      managerName: '',
      cvSummary: '',
      imageManager: '',
      fileNameManager: '',
      summaryEdit: false,
      values: {
        ...this.state.values,
        summary: summaryArr,
        summaryChange: true,
      },
    });
  }
  deleteSummary(summaryId) {
    const cvSummary = this.state.values.summary;
    const newSummary = cvSummary.filter((item, i) => {
      return i !== summaryId;
    });
    this.setState({
      values: {
        ...this.state.values,
        summary: newSummary,
        summaryChange: true,
      },
    });
  }
  editSummary(summaryId) {
    const cvSummary = this.state.values.summary;
    const selectSummary = cvSummary.filter((item, i) => {
      return i === summaryId;
    });
    const newSummary = cvSummary.filter((item, i) => {
      return i !== summaryId;
    });
    this.setState({
      managerName: selectSummary[0].managerName,
      cvSummary: selectSummary[0].cvSummary,
      imageManager: selectSummary[0].imageManager,
      summaryEdit: true,
      values: {
        ...this.state.values,
        summary: newSummary,
      },
    });
  }

  onDropHandler(target, e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
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
    /* this.setState({
      image: file,
      fileName: file.name,
      values: {
        ...this.state.values,
        image: file,
        fileName: file.name,
      },
    });*/
    reader.readAsDataURL(file);
  }
  onDropHandlerManager(target, e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        imageManager: event.target.result,
        fileNameManager: file.name,
      });
    };
    reader.readAsDataURL(file);
  }
  renderCreateSkill() {
    return (
      <div className={`add-skill ${this.state.skillEdit ? 'edit-skill' : ''}`}>
        <h4>{this.state.skillEdit ? 'Edit skill:' : 'Add skill:'}</h4>
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
        <div
          className={`handleMain ${this.state.isMain ? 'main' : ''}`}
          onClick={() => {
            this.setState({
              isMain: !this.state.isMain,
            });
          }}
        >
          <p>is main skill: </p>
          {
            this.state.isMain ? (
              <span className="main-skill">main</span>
            ) : (
              <span className="secondary-skill">secondary</span>
            )
          }
        </div>

        <button
          type=""
          className="btn btn--fw addSkillButton"
          onClick={::this.addSkill}
          disabled={this.state.skillExp && this.state.skillName ? '' : 'disabled'}
        >
          { this.state.skillEdit ? 'Edit skill' : 'Add skill'}
        </button>
      </div>
    );
  }
  renderCreateWork() {
    return (
      <div className={`add-work-exp ${this.state.workEdit ? 'edit-work' : ''}`}>
        <h4>{this.state.workEdit ? 'Edit works description:' : 'Add works description:'}</h4>
        <TextField
          classNameBox={'input-wr'}
          placeholder={'Enter work'}
          value={this.state.workName}
          fieldName="workName"
          maxLength="50"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
        />
        <TextArea
          classNameBox={'input-wr'}
          placeholder={'Enter work description'}
          value={this.state.workDescription}
          fieldName="workDescription"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
        />
        <button
          type=""
          className="btn btn--fw addSkillButton"
          onClick={::this.addWork}
          disabled={this.state.workName && this.state.workDescription ? '' : 'disabled'}
        >
          { this.state.workEdit ? 'Edit work' : 'Add work'}
        </button>
      </div>
    );
  }
  renderCreateSummary() {
    return (
      <div className={`add-summary ${this.state.summaryEdit ? 'edit-summary' : ''}`} >
        <h4>{this.state.summaryEdit ? 'Edit summary:' : 'Add summary:'}</h4>
        <TextField
          classNameBox={'input-wr'}
          placeholder={'Enter manager name'}
          value={this.state.managerName}
          fieldName="managerName"
          maxLength="50"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
        />
        <TextArea
          classNameBox={'input-wr'}
          placeholder={'Enter summary'}
          value={this.state.cvSummary}
          fieldName="cvSummary"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
        />
        <TextField
          id={'file-input-imageManager'}
          classNameBox={'input-wr'}
          placeholder={'Enter image manager'}
          fileName={this.state.fileNameManager}
          preVision={this.state.imageManager}
          type={'file'}
          fieldName="imageManager"
          onChange={::this.onDropHandlerManager}
          onBlur={::this.handleInputBlur}
        />
        <button
          type=""
          className="btn btn--fw addSkillButton"
          onClick={::this.addSummary}
          disabled={
            this.state.values.summary && this.state.values.summary.length < 2
            && this.state.managerName && this.state.cvSummary
              ? '' : 'disabled'}
        >
          {/**/}
          { this.state.summaryEdit ? 'Edit summary' : 'Add summary'}
        </button>
      </div>
    );
  }

  render() {
    let skills = [];
    if (this.state.values.skills) {
      skills = this.state.values.skills;
    }
    return (
      <div className="form-wr">

        <form id="upload_form" onSubmit={::this.handleFormSubmit} encType="multipart/form-data">
          <h4>User CV:</h4>
          <TextField
            classNameBox={'input-wr'}
            placeholder={'Enter name'}
            value={this.state.values.username}
            fieldName="username"
            maxLength="30"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('username')}
          />
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
            placeholder={'Enter where interviewed'}
            value={this.state.values.whereInterviewed}
            fieldName="whereInterviewed"
            maxLength="25"
            onChange={::this.handleInputChange}
            onBlur={::this.handleInputBlur}
            errorText={this.showError('whereInterviewed')}
          />
          <DatePicker
            fieldName="interviewDate"
            selected={this.state.values.interviewDate}
            onChange={::this.handleInterviewDateChange}
            className="interviewDate"
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
          <div
            className={`handleHouse ${this.state.values.inHouse ? 'main' : ''}`}
            onClick={() => {
              this.setState({
                values: {
                  ...this.state.values,
                  inHouse: !this.state.values.inHouse,
                },
              });
            }}
          >
            <p>house: </p>
            {
              this.state.values.inHouse ? (
                <span className="main-skill">in house</span>
              ) : (
                <span className="secondary-skill">out of house</span>
              )
            }
          </div>
          {/* <CheckBox
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
          />*/}
          <div className="have-skills">
            {skills.length > 0 && (<h4>Skills description:</h4>)}
            {
              skills && (skills.map((item, i) => {
                // let skillId = {` ${item.skill} + ${i}`}
                return (
                  <ul className="skill-form" key={`${i}-skill`}>
                    <li><span>skill: </span><span>{item.skill}</span></li>
                    <li><span>experience: </span><span>{item.experience}</span></li>
                    <li><span>isMain: </span><span>{item.main ? 'main' : ''}</span></li>
                    <li
                      className="del-skill"
                      onClick={(e) => { this.deleteSkill(i, e); }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </li>
                    <li
                      className="edit-skill"
                      onClick={(e) => { this.editSkill(i, e); }}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </li>
                  </ul>
                );
              })
              )
            }
          </div>
          <div className="have-work">

            {
              this.state.values.works && this.state.values.works.length > 0 && (
                <h4>Works description:</h4>)
            }
            {
              this.state.values.works && (this.state.values.works.map((item, i) => {
                // let skillId = {` ${item.skill} + ${i}`}
                return (
                  <ul className="work-form" key={`${i}-work`}>
                    <li><span>work: </span><span>{item.work}</span></li>
                    <li><span>work description: </span><span>{item.workDescription}</span></li>
                    <li
                      className="del-skill"
                      onClick={(e) => { this.deleteWork(i, e); }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </li>
                    <li
                      className="edit-skill"
                      onClick={(e) => { this.editWork(i, e); }}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </li>
                  </ul>
                );
              })
              )
            }
          </div>
          <div className="have-summary">
            {
              this.state.values.summary && this.state.values.summary.length > 0 && (
                <h4>Summary:</h4>
            )}
            {
              this.state.values.summary && (this.state.values.summary.map((item, i) => {
                return (
                  <ul className="summary-form" key={`${i}-summary`}>
                    <li><span>Name manager: </span><span> {item.managerName}</span></li>
                    <li><span>Summary: </span><span>{item.cvSummary}</span></li>
                    <li className="image-manager">
                      <img src={item.imageManager} alt="" />
                    </li>
                    <li
                      className="del-skill"
                      onClick={(e) => { this.deleteSummary(i, e); }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </li>
                    <li
                      className="edit-skill"
                      onClick={(e) => { this.editSummary(i, e); }}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </li>
                  </ul>
                );
              }))
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
        <div className="add-desc">
          {this.renderCreateSkill()}
          {this.renderCreateWork()}
          {this.renderCreateSummary()}
        </div>
      </div>
    );
  }
}

export default connect(null, { updateUser, getUsers, createUser, push })(createCV);
