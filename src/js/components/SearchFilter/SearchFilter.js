import Autosuggest from 'react-autosuggest';
import autosuggestHighlightMatch from 'autosuggest-highlight/match';
import autosuggestHighlightParse from 'autosuggest-highlight/parse';
import React from 'react';

const people = [
  {
    first: 'Java',
    last: '',
    cost: '2000',
  },
  {
    first: 'JavaScript',
    last: '',
    cost: '3000',
  },
];


class SearchFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
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

  render() {
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
}


export default SearchFilter;

