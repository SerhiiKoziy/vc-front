import React, { Component } from 'react';
import { getUsers } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Link } from 'react-router';
import InputRange from 'react-input-range';
import Select from 'react-select';
import ReactSVG from 'react-svg';

import RadioButton from '../components/RadioButton/RadioButton';
import PreViewCv from '../components/CV/PreViewCv';
import Header from '../components/Header/Header';


class FilterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
      clearFilter: true,
      valueCost: { min: 1000, max: 3000 },
      groupExperienceYear: 1,
      filterData: [],
      filterDataTitle: [],
      filterDataSkills: [],
      isUseFiler: false,
      value: '',
      suggestions: [],
      multi: true,
      sidebar: false,
      multiValue: [],
      multiValueTitle: [],
      multiValueSkills: [],
      isShowSkillsFilter: false,
      groupsExp: [],
      groupsExpSelect: [
        {
          check: false,
        },
        {
          check: false,
        },
        {
          check: false,
        },
        {
          check: false,
        },
      ],
    };
  }

  static propTypes = {
    getUsers: React.PropTypes.func,
    push: React.PropTypes.func,
    data: React.PropTypes.object,
  };
  filterDataTitle() {
    const { data } = this.props.data;
    const { isShowSkillsFilter, multiValueSkills, multiValueTitle } = this.state;
    const multiValue = isShowSkillsFilter ? multiValueSkills : multiValueTitle;
    /* const dataFilterTitle = data.filter((item) => {
      return value ? value === item.title : item;
    });*/
    const dataFilterTitleOrSkill = [];
    data.map(dataCV => {
      const title = dataCV.title;
      let found = false;
      if (dataCV.skills) {
        dataCV.skills.map(skill => {
          if (skill.main) {
            // mainSkills.push(skill.skill)
            multiValue.map(item => {
              if (item.value === skill.skill) {
                found = true;
                dataFilterTitleOrSkill.push(dataCV);
              }
              return null;
            });
          }
          return null;
        });
      } else if (!found) {
        multiValue.map(item => {
          if (item.value === title) {
            found = true;
            dataFilterTitleOrSkill.push(dataCV);
          }
          return null;
        });
      }
      return null;
    });

    this.setState({ isUseFiler: true });
    this.filterDataCost(dataFilterTitleOrSkill);
  }
  filterDataCost(dataFilterTitle) {
    const { valueCost } = this.state;
    const dataFilterCost = dataFilterTitle.filter((item) => {
      const cost = parseInt(item.cost, 10);
      return cost > valueCost.min && cost < valueCost.max;
    });

    this.setState({ isUseFiler: true });
    this.filterDataExperience(dataFilterCost);
  }
  filterDataExperience(dataFilterCost) {
    // const group = this.state.groupExperienceYear;
    const groups = this.state.groupsExp;
    const dataFilterExperience = [];
    groups.map((group) => {
      const filterGroup = dataFilterCost.filter((item) => {
        const exp = parseInt(item.experience, 10);
        return exp >= (group * 3 - 3) && exp <= group * 3;
      });
      filterGroup.map((item) => {
        dataFilterExperience.push(item);
        return null;
      });
      return null;
    });
    this.setState({ filterData: dataFilterExperience, clearFilter: false });
  }
  filterClear() {
    this.setState({
      clearFilter: true,
      filterData: [],
      isUseFiler: false,
      value: '',
      multiValue: [],
      valueCost: { min: 1000, max: 3000 },
      sideBar: true,
      groupsExp: [],
      groupsExpSelect: [
        {
          check: false,
        },
        {
          check: false,
        },
        {
          check: false,
        },
        {
          check: false,
        },
      ],
    });
  }
  selectGroup(group) {
    // console.log('groupExp', group);
    const groups = this.state.groupsExp;
    let isSelect = false;
    const newGroups = [];
    groups.map(item => {
      if (item === group) {
        isSelect = true;
      } else {
        newGroups.push(item);
      }
      return null;
    });
    if (isSelect === false) {
      newGroups.push(group);
    }
    /* const filterGroup = groups.filter((item) => {
      return item !== group;
    });*/
    const arrSelect = this.state.groupsExpSelect;
    // const selectBox = this.state.groupsExpSelect[group];
    arrSelect[group - 1].check = !arrSelect[group - 1].check;
    this.setState({ groupsExp: newGroups, groupsExpSelect: arrSelect });
  }
  goToAdmin() {
    this.props.push('/DashBoard');
  }
  goToMainFilter() {
    this.props.push('/');
  }
  handleOnChange(valueSelect) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: valueSelect });
    } else {
      // this.setState({ valueSelect });
    }
  }
  handleDataJustTitle() {
    this.filterDataJustTitle('filterMain');
  }
  handleOnChangeTitle(valueSelect) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValueTitle: valueSelect });
      // this.filterDataJustTitle(valueSelect);
    } else {
      // this.setState({ valueSelect });
    }
  }
  filterDataJustTitle(value) {
    const { data } = this.props.data;
    const { multiValueTitle } = this.state;
    const dataFilterTitle = [];
    data.map(dataCV => {
      const title = dataCV.title;
      multiValueTitle.map(item => {
        if (item.value === title) {
          // found = true;
          dataFilterTitle.push(dataCV);
        }
        return null;
      });
      return null;
    });
    this.setState({ filterDataTitle: dataFilterTitle });
    if (value === 'filterMain') {
      this.filterDataCost(dataFilterTitle);
    }
  }
  handleDataJustSkills() {
    this.filterDataJustSkills('filterMain');
  }
  handleOnChangeSkills(valueSelect) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValueSkills: valueSelect });
      // this.filterDataJustSkills(valueSelect);
    } else {
      // this.setState({ valueSelect });
    }
  }
  filterDataJustSkills(value) {
    // console.log('value', value);
    const { data } = this.props.data;
    const { multiValueSkills } = this.state;
    const dataFilterSkills = [];
    data.map(dataCV => {
      let found = false;
      console.log(found);
      if (dataCV.skills) {
        dataCV.skills.map(skill => {
          if (skill.main) {
            // mainSkills.push(skill.skill)
            multiValueSkills.map(item => {
              if (item.value === skill.skill) {
                found = true;
                dataFilterSkills.push(dataCV);
              }
              return null;
            });
          }
          return null;
        });
      }
      return null;
    });
    this.setState({ filterDataSkills: dataFilterSkills });
    if (value === 'filterMain') {
      this.filterDataCost(dataFilterSkills);
    }
  }
  renderVideo() {
    return (
      <div className="video-link">
        <a
          href="https://www.youtube.com/watch?v=aswObDTfDYM"
          target="_blank"
        >
          <div className="video">
            <ReactSVG
              path="../assets/images/svg/play.svg"
              className="play"
              evalScript="always"
              style={{ width: 30, fill: '#fcd500' }}
            />
          </div>
        </a>
      </div>
    );
  }
  renderDustbins() {
    const { isShowSkillsFilter, filterDataSkills,
      filterData, filterDataTitle, sidebar, isUseFiler } = this.state;

    const { data, application } = this.props.data;
    if (this.props.data.data) {
      let dataSel;
      if (!sidebar && !isShowSkillsFilter) {
        dataSel = filterDataTitle.length === 0 ? data : filterDataTitle;
      } else if (!sidebar && isShowSkillsFilter) {
        dataSel = filterDataSkills.length === 0 ? data : filterDataSkills;
      } else if (sidebar) {
        if (filterData.length > 0) {
          dataSel = filterData;
        } else if (!isShowSkillsFilter) {
          dataSel = isUseFiler ? filterData : filterDataTitle;
        } else if (isShowSkillsFilter) {
          dataSel = isUseFiler ? filterData : filterDataSkills;
        } else {
          dataSel = data;
        }
      }
      const dataSelVideo = [];
      dataSel.map((item, i) => {
        if (i === 1) {
          dataSelVideo.push({
            id: 'video',
          });
        }
        dataSelVideo.push(item);
        return null;
      });
      return dataSelVideo.map((item, i) => {
        if (item.id === 'video') {
          return (
            <a
              key={`video-${i}`}
              href="https://www.youtube.com/watch?v=aswObDTfDYM"
              target="_blank"
            >
              <div className="video">
                <ReactSVG
                  path="../assets/images/svg/play.svg"
                  className="play"
                  evalScript="always"
                  style={{ width: 30, fill: '#fcd500' }}
                />
              </div>
              {/* <iframe
               width="180"
               height="130"
               src="https://www.youtube.com/embed/aswObDTfDYM"
               frameBorder="0"
               allowFullScreen
               />*/}
            </a>
          );
        }
        return (
          <Link key={`cv-${i}`} to={`/cv/${item.id}`}>
            <PreViewCv
              item={item}
              key={i}
              isAdminPanel={application}
              onClick={::this.goToMainFilter}
              /* onDelete={this.deleteTask.bind(this, item.id)}*/
            />
          </Link>
        );
      });
    }
    return null;
  }
  showSidebarWithSkills() {
    if (this.state.sidebar) {
      this.filterClear();
      this.setState({ sidebar: !this.state.sidebar });
    } else if (this.state.multiValueSkills.length > 0) {
      this.setState({ sidebar: !this.state.sidebar });
      this.filterDataJustSkills();
    }
  }
  showSidebarWithTitle() {
    if (this.state.sidebar) {
      this.filterClear();
      this.setState({ sidebar: !this.state.sidebar });
    } else if (this.state.multiValueTitle.length > 0) {
      this.setState({ sidebar: !this.state.sidebar });
      this.filterDataJustTitle();
    }
  }
  renderSearch() {
    const { options, optionsTitle } = this.props.data;
    const { multiValueTitle, multiValueSkills, multi, sidebar,
      isShowSkillsFilter } = this.state;
    return (
      <div
        // className="search-wr-inside skills-search"
        className={`search-wr-inside ${sidebar ? 'sidebar ' : ''}skills-search`}
      >
        {
          isShowSkillsFilter ? (
            <Select
              multi={multi}
              options={options}
              // onChange={::this.handleOnChange}
              onChange={::this.handleOnChangeSkills}
              value={multiValueSkills}
              instanceId={'100'}
              idPrefix={'100'}
              placeholder={"Select Skills..."}
            />
          ) : (
            <Select
              multi={multi}
              options={optionsTitle}
              onChange={::this.handleOnChangeTitle}
              instanceId={'100'}
              idPrefix={'100'}
              value={multiValueTitle}
              disabled={isShowSkillsFilter}
              placeholder={"Select Titles..."}
            />
          )
        }
        {
          !sidebar && (
            <div
              className="filter-btn"
              onClick={() => {
                return this.setState({
                  isShowSkillsFilter: !this.state.isShowSkillsFilter,
                });
              }}
            >
              <div className={`tab ${isShowSkillsFilter ? 'titles-filter' : 'skills-filter'}`}>
                <span className="title">{'Titles filter'}</span>
                <span className="skill">{'Skills filter'}</span>
              </div>
              {/* <span>{isShowSkillsFilter ? 'Titles filter' : 'Skills filter'}</span>*/}
            </div>
          )
        }
        <div
          onClick={this.state.isShowSkillsFilter ?
            ::this.showSidebarWithSkills :
            ::this.showSidebarWithTitle
          }
          className="search-btn"
        >
          {
            this.state.sidebar && (
              <div>
                <span><i className="fa fa-arrow" aria-hidden="true" />close</span>
              </div>
            )
          }
          {
            !this.state.sidebar && (
              <div>
                {
                  isShowSkillsFilter && (
                    <span className={`${multiValueSkills.length > 0 ? '' : 'disabled'}`}>
                      <i className="fa fa-search" aria-hidden="true" />
                    </span>
                  )
                }
                {
                  !isShowSkillsFilter && (
                    <span className={`${multiValueTitle.length > 0 ? '' : 'disabled'}`}>
                      <i className="fa fa-search" aria-hidden="true" />
                    </span>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
  renderRangeFilter() {
    return (
      <div className="range-filter">
        <h4>Monthly budget</h4>
        <InputRange
          maxValue={5000}
          minValue={500}
          value={this.state.valueCost}
          onChange={valueCost => { return this.setState({ valueCost }); }}
        />
        <div className="filter-cost">
          <span>from: {`$${this.state.valueCost.min}`}</span>
          <span>to: {`$${this.state.valueCost.max}`}</span>
        </div>
      </div>
    );
  }

  renderRangeExperience() {
    return (
      <div className="experience-year">
        <h4>Years experience</h4>
        <RadioButton
          fieldName={"experience"}
          value={this.state.isMain}
          id={'radio-1'}
          label={'1-3'}
          name={'radio-group'}
          type={'checkbox'}
          defaultChecked={this.state.groupsExpSelect[0].check ? 'checked' : ''}
          onChange={() => {
            this.selectGroup(1);
          }}
          /* onChange={() => {
           this.setState({
           groupExperienceYear: 1,
           });
           }}*/
        />
        <RadioButton
          fieldName={"experience"}
          value={this.state.isMain}
          id={'radio-2'}
          label={'4-6'}
          name={'radio-group'}
          type={'checkbox'}
          defaultChecked={this.state.groupsExpSelect[1].check ? 'checked' : ''}
          onChange={() => {
            this.selectGroup(2);
          }}
        />
        <RadioButton
          fieldName={"experience"}
          value={this.state.isMain}
          id={'radio-3'}
          label={'6-9'}
          name={'radio-group'}
          type={'checkbox'}
          defaultChecked={this.state.groupsExpSelect[2].check ? 'checked' : ''}
          onChange={() => {
            this.selectGroup(3);
          }}
        />
        <RadioButton
          fieldName={"experience"}
          value={this.state.isMain}
          id={'radio-4'}
          label={'9-12'}
          name={'radio-group'}
          type={'checkbox'}
          defaultChecked={this.state.groupsExpSelect[3].check ? 'checked' : ''}
          onChange={() => {
            this.selectGroup(4);
          }}
        />
      </div>
    );
  }
  render() {
    const { filterData, isUseFiler, isShowSkillsFilter, sidebar,
      filterDataSkills, filterDataTitle, clearFilter } = this.state;
    return (
      <div className={'page filter-page columns'}>
        <div className="dashboard-wr filter-page">
          <div className="header-wr">
            <Header />

            <div className="search-wr">
              {
                this.renderSearch()
              }
            </div>
          </div>
          <div
            className={`inside-wr ${isShowSkillsFilter && !sidebar ? 'with-filter-skill' : ''}`}
          >
            <div className={`left-filter ${sidebar ? '' : 'hidden'}`}>
              {this.renderRangeFilter()}
              {this.renderRangeExperience()}
              <div className="bottom-control">
                <div className="clear" onClick={::this.filterClear}>
                  <span>
                    <span className="svg-wr">
                      <ReactSVG
                        path="../assets/images/svg/clear.svg"
                        className="example"
                        evalScript="always"
                        style={{ width: 18, height: 18, fill: '#a5e3ff' }}
                      />
                    </span>
                    clear filter
                  </span>
                </div>
                {
                  !isShowSkillsFilter && (
                    <div
                      className="total-filter"
                      // onClick={this.filterDataJustTitle.bind(this, 'filterMain')}
                      onClick={::this.handleDataJustTitle}
                    >
                      <span>show-result</span>
                    </div>
                  )
                }
                {
                  isShowSkillsFilter && (
                    <div
                      className="total-filter"
                      // onClick={this.filterDataJustSkills.bind(this, 'filterMain')}
                      onClick={::this.handleDataJustSkills}
                    >
                      <span>show-result</span>
                    </div>
                  )
                }
              </div>
            </div>
            <div
              className={`lists-wr ${sidebar ? 'with-sidebar' : ''}`}
            >
              {
                !sidebar && (
                  <div>
                    {
                      isShowSkillsFilter && (
                        filterDataSkills.length > 0 ? (
                          <h4>Filtered by Skills:</h4>
                        ) : (
                          <h4>All CV:</h4>
                        )
                      )
                    }
                    {
                      !isShowSkillsFilter && (
                        filterDataTitle.length > 0 ? (
                          <h4>Filtered by Titles:</h4>
                        ) : (
                          <h4>All CV:</h4>
                        )
                      )
                    }
                  </div>
                )
              }
              {
                sidebar && (
                  <div>
                    {
                      clearFilter && (
                        <h4>Filtered by {`${isShowSkillsFilter ? 'skills' : 'titles'}`}:</h4>
                      )
                    }
                    {
                      !clearFilter && filterData.length > 0 && (
                        <h4>
                          Filtered by {`${isShowSkillsFilter ? 'skills ' : 'titles '}`}
                          with additional filters:
                        </h4>
                      )
                    }
                  </div>

                )
              }
              <div className="ins-lists-wr">
                {this.renderDustbins()}
                {
                  !(filterData.length > 0) && isUseFiler && sidebar && (
                    <p>change filter, please</p>
                  )
                }
              </div>
            </div>
          </div>
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
    push, getUsers,
  }
)(FilterPage);

export default ConnectedComponent;
