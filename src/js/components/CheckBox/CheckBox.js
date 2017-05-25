import React from 'react';


const CheckBox = ({ classNameBox, type, onChange, label, id, defaultChecked, name, key }) => {
  return (
    <div className={`radio-wr ${classNameBox}`} key={key}>
      <label className="label" htmlFor={`featured-${id}`}>{label}</label>
      <div className="radio-inputs">
        <div className="inside-wr">
          <input
            type={type}
            id={`featured-${id}`}
            name={name}
            defaultChecked={defaultChecked}
            onChange={typeof onChange === 'function' ? onChange : false}
          />
          <span />
        </div>
      </div>
    </div>
  );
};

CheckBox.propTypes = {
  type: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  key: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  classType: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
};

CheckBox.defaultProps = {
  type: 'default',
  defaultChecked: false,
};

export default CheckBox;
