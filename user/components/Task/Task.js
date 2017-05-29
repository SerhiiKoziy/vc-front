import React from 'react';
import { Link } from 'react-router';

const Task = ({ item, onDelete, children, isAdminPanel, onClick }) => {
 // const cloudImageUrl = `http://openweathermap.org/img/w/${item.weather.weather[0].icon}.png`;

  return (
    <div
      className={'task'}
      id={item.id}
      onClick={onClick}
    >
      <div className="main-cv">
        <div className="line-cv">
          <h4>Title: </h4> <h4>{item.title}</h4>
        </div>
        <div className="line-cv">
          <p>Cost: </p> <p>{item.cost}</p>
        </div>
        <div className="line-cv">
          <p>Experience: </p> <p>{item.experience}</p>
        </div>
        <div className="line-cv">
          <p>inHouse: </p> <p>{item.inHouse ? 'inHouse' : ''}</p>
        </div>
        <div className="line-cv">
          <p>Date made cv: </p> <p>{`${item.date}`}</p>
        </div>
      </div>
      <div className="skills-list">
        <ul>
        {
          item.skills && (item.skills.map((skill, i) => {
            return (
              <li key={i}>
                {`${skill.skill} : ${skill.experience} year(s)`}
                {
                  skill.isMain ? <span>main</span> : ''
                }
              </li>
            );
          })
          )
        }
        </ul>
      </div>

      {children}
      {
        isAdminPanel && (
          <div className="controls">
            <div className="control control-view">
              <Link to={`/task/${item.id}`}>
                <i className="fa fa-eye" aria-hidden="true" />
              </Link>
            </div>
            <div className="control control-edit">
              <Link to={`/task/${item.id}/edit`}>
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


Task.propTypes = {
  item: React.PropTypes.object,
  children: React.PropTypes.any,
  map: React.PropTypes.any,
  onDelete: React.PropTypes.func,
  onClick: React.PropTypes.func,
  isAdminPanel: React.PropTypes.bool,
};

export default Task;
