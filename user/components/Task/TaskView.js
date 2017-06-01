import React from 'react';

export default class TaskView extends React.PureComponent {
  static propTypes = {};

  renderMainSkills() {
    if (this.props.item.skills && this.props.item.skills.length > 0) {
      const mainSkills = this.props.item.skills.filter((skill, i) => skill.main);

      return mainSkills.map(this.renderSkill);
    }
    return null;
  }

  renderOtherSkills() {
    if (this.props.item.skills && this.props.item.skills.length > 0) {
      const mainSkills = this.props.item.skills.filter((skill, i) => !skill.main);

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
      return (
        <div
          className="taskView"
          id={this.props.item.id}
          onClick={this.props.onClick}
        >
          <div className="main-cv">
            <div className="main-skills">
              <div className="skill-title">
                <span><i className="fa fa-cogs" aria-hidden="true" /></span>
                <p>Primary skills</p>
              </div>
              {this.renderMainSkills()}
            </div>
            <div className="addition-skills">
              <div className="skill-title">
                <span><i className="fa fa-cogs" aria-hidden="true" /></span>
                <p>addition skill</p>
              </div>
              {this.renderOtherSkills()}
            </div>
          </div>
          {this.renderAdminControls()}
        </div>);
    }

    return null;
  }
}
