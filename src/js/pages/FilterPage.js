import React, { Component } from 'react';
import { deleteTask, updateTask } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Link } from 'react-router';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Autosuggest from 'react-autosuggest';
import autosuggestHighlightMatch from 'autosuggest-highlight/match';
import autosuggestHighlightParse from 'autosuggest-highlight/parse';


import RadioButton from '../components/RadioButton/RadioButton';
import Task from '../components/Task/Task';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
      valueCost: { min: 1000, max: 3000 },
      groupExperienceYear: 1,
      filterData: [],
      isUseFiler: false,
      value: '',
      suggestions: [],
    };
  }

  static propTypes = {
    deleteTask: React.PropTypes.func,
    updateTask: React.PropTypes.func,
    push: React.PropTypes.func,
    data: React.PropTypes.array,
  };
  deleteTask(taskId) {
    this.props.deleteTask(taskId);
  }
  filterDataTitle() {
    const { data } = this.props;
    const { value } = this.state;
    const dataFilterTitle = data.filter((item) => {
      return value ? value === item.title : item;
    });

    this.setState({ isUseFiler: true });
    this.filterDataCost(dataFilterTitle);
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
    const group = this.state.groupExperienceYear;
    const dataFilterExperience = dataFilterCost.filter((item) => {
      const exp = parseInt(item.experience, 10);
      return exp >= (group * 3 - 3) && exp <= group * 3;
    });
    this.setState({ filterData: dataFilterExperience, clearFilter: false });
  }
  filterClear() {
    this.setState({
      clearFilter: true,
      filterData: [],
      isUseFiler: false,
      value: '',
      valueCost: { min: 1000, max: 3000 },
    });
  }
  renderDustbins() {
    const { filterData, isUseFiler } = this.state;
    const data = filterData.length > 0 ? filterData : (!isUseFiler ? this.props.data : []);
    return data.map((item, i) => {
      return (
        <Link key={`task-${i}`} to={`/task/${item.id}`}>
          <Task
            item={item}
            key={i}
            isAdminPanel={false}
            onClick={::this.goToMainFilter}
            onDelete={(e) => { this.deleteTask(item.id, e); }}
            /* onDelete={this.deleteTask.bind(this, item.id)}*/
          />
        </Link>
      );
    });
  }
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const normaliseData = [];
    this.props.data.map(item => {
      normaliseData.push({
        first: item.title,
        cost: item.cost,
      });
      return null;
    });
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('\\b' + escapedValue, 'i');
    return normaliseData.filter(person => regex.test(this.getSuggestionValue(person)));
  }

  getSuggestionValue(suggestion) {
    return `${suggestion.first}`;
  }

  renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.first}`;
    const matches = autosuggestHighlightMatch(suggestionText, query);
    const parts = autosuggestHighlightParse(suggestionText, matches);
    return (
      <span className={'suggestion-content'}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
        <p className="cost-cv">{` $${suggestion.cost}`}</p>
      </span>
    );
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  renderSearchFilter() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search "java"',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
  goToAdmin() {
    this.props.push('/DashBoard');
  }
  goToMainFilter() {
    this.props.push('/FilterPage');
  }
  render() {
    const { filterData, isUseFiler } = this.state;
    return (
      <div className={'page filter-page columns'}>
        <div className="dashboard-wr filter-page">
          <div className="builder-task">
            <div className="goAdmin" onClick={::this.goToAdmin}>goToAdmin</div>
            <div className="search-wr">
              {this.renderSearchFilter()}
              <div className="search-btn">
                <span><i className="fa fa-search" aria-hidden="true" /></span>
              </div>
            </div>
          </div>
          <div className="inside-wr">
            <div className="left-filter">
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
              <div className="experience-year">
                <h4>Years experience</h4>
                <RadioButton
                  fieldName={"experience"}
                  value={this.state.isMain}
                  id={'radio-1'}
                  label={'1-3'}
                  name={'radio-group'}
                  type={'radio'}
                  defaultChecked={'checked'}
                  onChange={() => {
                    this.setState({
                      groupExperienceYear: 1,
                    });
                  }}
                  /* errorText={this.showError('isMain')}*/
                />
                <RadioButton
                  fieldName={"experience"}
                  value={this.state.isMain}
                  id={'radio-2'}
                  label={'4-6'}
                  name={'radio-group'}
                  type={'radio'}
                  onChange={() => {
                    this.setState({
                      groupExperienceYear: 2,
                    });
                  }}
                  /* errorText={this.showError('isMain')}*/
                />
                <RadioButton
                  fieldName={"experience"}
                  value={this.state.isMain}
                  id={'radio-3'}
                  label={'6-9'}
                  name={'radio-group'}
                  type={'radio'}
                  onChange={() => {
                    this.setState({
                      groupExperienceYear: 3,
                    });
                  }}
                />
                <RadioButton
                  fieldName={"experience"}
                  value={this.state.isMain}
                  id={'radio-4'}
                  label={'больше 9'}
                  name={'radio-group'}
                  type={'radio'}
                  onChange={() => {
                    this.setState({
                      groupExperienceYear: 4,
                    });
                  }}
                  /* errorText={this.showError('isMain')}*/
                />
              </div>
              <div className="bottom-control">
                <div className="clear" onClick={::this.filterClear}>
                  <span>clear filter</span>
                </div>
                <div className="total-filter" onClick={::this.filterDataTitle}>
                  <span>show-result</span>
                </div>
              </div>
            </div>
            <div className="lists-wr">
              {this.renderDustbins()}
              {
                !(filterData.length > 0) && isUseFiler && (
                  <p>change filter, please</p>
                )
              }
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
    deleteTask, updateTask, push,
  }
)(MainPage);

export default ConnectedComponent;
