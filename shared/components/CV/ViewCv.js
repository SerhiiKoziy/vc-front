import React from 'react';
import { Link } from 'react-router';
import ReactSVG from 'react-svg';

export default class ViewCv extends React.PureComponent {
  static propTypes = {};


  renderMainSkills() {
    if (this.props.item.skills && this.props.item.skills.length > 0) {
      const mainSkills = this.props.item.skills.filter((skill) => { return skill.main; });
      return mainSkills.map(this.renderSkill);
    }
    return null;
  }

  renderOtherSkills() {
    if (this.props.item.skills && this.props.item.skills.length > 0) {
      const mainSkills = this.props.item.skills.filter((skill) => { return !skill.main; });
      return mainSkills.map(this.renderSkill);
    }
    return null;
  }
  renderSkill(skill, i) {
    return (
      <div key={i} className="skill">
        <span><span /></span>
        <p>{skill.skill}</p>
      </div>
    );
  }
  renderWorkExperience() {
    const { works } = this.props.item;
    if (works && works.length > 0) {
      return works.map(this.renderExperience);
    }
    return null;
  }
  renderExperience(work, i) {
    return (
      <div key={i} className="skill">
        <span><span /></span>
        <p className="title">{work.work}</p>
        <p>{work.workDescription}</p>
      </div>
    );
  }

  renderAdminControls() {
    if (this.props.isAdminPanel) {
      const base = 'admin';
      return (
        <div className="controls">
          <div className="control control-view">
            <Link to={`${base}/task/${this.props.item.id}`}>
              <i className="fa fa-eye" aria-hidden="true" />
            </Link>
          </div>
          <div className="control control-edit">
            <Link to={`${base}/task/${this.props.item.id}/edit`}>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>
          </div>
          <div className="control control-delete">
            <div
              className="deleteButton"
              onClick={this.props.onDelete}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.item) {
      const { summary } = this.props.item;
      let managerName = 'manager Name';
      let cvSummary = 'Summary';
      const summaryImage = this.props.item.summaryImage || '';
      let divStyle = {};
      if (summary[0]) {
        managerName = summary[0].managerName;
        cvSummary = summary[0].cvSummary;
        divStyle = {
          backgroundImage: `url(../uploads/${summaryImage})`,
        };
      }
      return (
        <div
          className="taskView"
          id={this.props.item.id}
          onClick={this.props.onClick}
        >
          <div className="main-cv">
            <div className="main-skills">
              <div className="skill-title">
                <span>
                  <ReactSVG
                    path="../assets/images/svg/primary-skills.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 20, fill: '#fcd500' }}
                  />
                </span>
                <p>Primary skills</p>
              </div>
              {this.renderMainSkills()}
            </div>
            <div className="addition-skills">
              <div className="skill-title">
                <span>
                  <ReactSVG
                    path="../assets/images/svg/additional-skills.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 20, fill: '#fcd500' }}
                  />
                </span>
                <p>Additional skills</p>
              </div>
              {this.renderOtherSkills()}
            </div>
          </div>
          <div className="description-cv">
            <div className="desc-work">
              <div className="desc-title">
                <span>
                  <ReactSVG
                    path="../assets/images/svg/experience.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 20, fill: '#fcd500' }}
                  />
                </span>
                <p>Work experience</p>
              </div>
              {this.renderWorkExperience()}
            </div>
            <div className="conclusion">
              <div className="desc-title">
                <span>
                  <ReactSVG
                    path="../assets/images/svg/summary.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 20, fill: '#fcd500' }}
                  />
                </span>
                <p>Summary from Mobilunity recruter</p>
              </div>
              <div className="recruter-header">
                <p>{managerName}</p>
                <div className="image-wr">
                  <div
                    className="image-style"
                    style={divStyle}
                  >
                  </div>
                  {/* <img src={imageManager} alt="mg" />*/}
                </div>
              </div>
              <div className="conclusion-text">
                <div className="quote">
                  <ReactSVG
                    path="../assets/images/svg/quote.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 60, fill: '#16222b' }}
                  />
                </div>
                <p>
                  {cvSummary}
                </p>
              </div>
            </div>
          </div>
          {this.renderAdminControls()}
        </div>);
    }

    return null;
  }
}
