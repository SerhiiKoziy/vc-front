import React from 'react';


const RadioButton = ({ classType, type, onChange, label, id, defaultChecked, name }) => {
  return (
    <div className={`radio-wr ${classType}`}>
      <input
        type={type}
        id={`${id}`}
        defaultChecked={defaultChecked}
        name={name}
        onChange={typeof onChange === 'function' ? onChange : false}
      />
      <label className="radio-label" htmlFor={`${id}`}>{label}</label>
    </div>
  );
};

// Make ESLint happy again: add validation to props
RadioButton.propTypes = {
  onChange: React.PropTypes.func,
  classType: React.PropTypes.string,
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  defaultChecked: React.PropTypes.string,
  name: React.PropTypes.string,
};

RadioButton.defaultProps = {
  type: 'radio',
  defaultChecked: '',
};

export default RadioButton;
