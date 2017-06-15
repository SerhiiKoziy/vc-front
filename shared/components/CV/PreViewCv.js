import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

const PreViewCv = ({ item, onDelete, children, isAdminPanel, onClick }) => {
 // const cloudImageUrl = `http://openweathermap.org/img/w/${item.weather.weather[0].icon}.png`;
  const base = (isAdminPanel === 'admin') ? 'admin' : '';
  return (
    <div>
      {
        (isAdminPanel === 'admin') && (
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
                <p>Created: </p> <p>{`${dateFormat(item.createdAt, 'dddd, mmmm dS')}`}</p>
              </div>
            </div>
            <div className="skills-list">
              <ul>
                {
                  item.skills && (item.skills.map((skill, i) => {
                    return (
                      <li key={i} className={`${skill.main ? 'main-skill' : ''}`}>
                        {`${skill.skill} : ${skill.experience} year(s)`}
                        {
                          skill.isMain ? <span>main</span> : ''
                        }
                      </li>
                    );
                  }))
                }
              </ul>
            </div>
            {children}
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
          </div>
        )
      }
      {
        (isAdminPanel !== 'admin') && (
          <div
            className={'task'}
            id={item.id}
            onClick={onClick}
          >
            <div className="main-cv">
              {
                item.inHouse && (
                  <div className="cv-row in-house">
                    <div className="line-cv title">
                      <h4>in house</h4>
                    </div>
                    <div className="line-cv cost">
                      <p>{`$${item.cost - 500}`}</p>
                    </div>
                  </div>
                )
              }
              <div className="cv-row">
                <div className="line-cv title">
                  <h4>{item.title}</h4>
                </div>
                <div className="line-cv cost">
                  <p>{`$${item.cost}`}</p>
                </div>
              </div>
            </div>
            {children}
          </div>
        )
      }
    </div>
  );
};


PreViewCv.propTypes = {
  item: React.PropTypes.object,
  children: React.PropTypes.any,
  map: React.PropTypes.any,
  onDelete: React.PropTypes.func,
  onClick: React.PropTypes.func,
  isAdminPanel: React.PropTypes.string,
};

export default PreViewCv;
