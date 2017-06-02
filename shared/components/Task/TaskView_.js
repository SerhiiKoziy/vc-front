import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

const TaskView = ({ item, onDelete, isAdminPanel, onClick }) => {
  const base = (isAdminPanel === 'admin') ? 'admin' : '';
  return (
    <div
      className={'taskView'}
      id={item.id}
      onClick={onClick}
    >
      <div className="main-cv">
        <div className="main-skills">
          <div className="skill-title">
            <span><i className="fa fa-cogs" aria-hidden="true" /></span>
            <p>Primary skills</p>
          </div>
          {
            item.skills.map((skill, i) => {
              if (skill.main) {
                return (
                  <div key={i} className="skill">
                    <span><span /></span>
                    <p>{skill.skill}</p>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
        <div className="addition-skills">
          <div className="skill-title">
            <span><i className="fa fa-cogs" aria-hidden="true" /></span>
            <p>addition skill</p>
          </div>
          {
            item.skills.map((skill, i) => {
              if (!skill.main) {
                return (
                  <div key={i} className="skill">
                    <span><span /></span>
                    <p>{skill.skill}</p>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </div>

      {
        (isAdminPanel === 'admin') && (
          <div className="controls">
            <div className="control control-view">
              <Link to={`${base}/task/${item.id}`}>
                <i className="fa fa-eye" aria-hidden="true" />
              </Link>
            </div>
            <div className="control control-edit">
              <Link to={`${base}/task/${item.id}/edit`}>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
              </Link>
            </div>
            <div className="control control-delete">
              <div
                className="deleteButton"
                onClick={onDelete}
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </div>
            </div>
          </div>
        )
      }
    </div>);
};


TaskView.propTypes = {
  item: React.PropTypes.object,
  children: React.PropTypes.any,
  map: React.PropTypes.any,
  onDelete: React.PropTypes.func,
  onClick: React.PropTypes.func,
  isAdminPanel: React.PropTypes.string,
};

export default TaskView;
