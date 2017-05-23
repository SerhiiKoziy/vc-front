import React from 'react';


const RadioButton = ({ classNameBox, type, onChange, label, id, defaultChecked, name, key }) => (
  <div className={`radio-wr ${classNameBox}`} key={key}>
    <label className="label" htmlFor={`featured-${id}`}>{label}</label>
    <div className="radio-inputs">
      <div className="inside-wr">
        <input
          type={type}
          id={`featured-${id}`}
          name={name}
          defaultChecked={defaultChecked}
          onChange={typeof onChange === 'function' ? onChange : false} />
        <span />
      </div>
    </div>
  </div>
);

RadioButton.propTypes = {
  type: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  label: React.PropTypes.string,
  Id: React.PropTypes.string,
  name: React.PropTypes.string,
  key: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  classType: React.PropTypes.string,
};

RadioButton.defaultProps = {
  type: 'default',
  defaultChecked: false,
};

export default RadioButton;
