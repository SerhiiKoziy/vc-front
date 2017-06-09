import React, { PropTypes } from 'react';

const TextField = (props) => {
  const onBlur = props.onBlur.bind(null, props.fieldName);
  const onChange = props.onChange.bind(null, props.fieldName);
  return (
    <div className={`input-box ${props.classNameBox}`}>
      <label
        className="label"
        htmlFor={props.id}
      >{props.label}</label>
      {
        props.type !== 'file' && (<textarea
          name={props.name}
          placeholder={props.placeholder}
          id={props.id}
          type={props.type}
          onBlur={onBlur}
          onChange={onChange}
          value={props.value || ''}
        />)
      }
      <label className="error visible">{props.errorText}</label>
    </div>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  errorVisible: PropTypes.bool,
  errorText: PropTypes.string,
  preVision: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  fieldName: React.PropTypes.string,
  classNameBox: React.PropTypes.string,
  value: React.PropTypes.any,
  id: React.PropTypes.any,
  maxLength: React.PropTypes.any,

};
TextField.defaultProps = {
  errorText: 'error',
  fieldType: 'input',
  placeholder: '',
  errorVisible: false,
  type: '',
  fieldName: 'Choose image...',

};

export default TextField;
