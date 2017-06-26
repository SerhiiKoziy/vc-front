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
        props.type !== 'file' && (<input
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          id={props.id}
          type={props.type}
          maxLength={props.maxLength}
          onBlur={onBlur}
          onChange={onChange}
          value={props.value || ''}
        />)
      }
      {
        props.type === 'file' && (
          <div className="file-input-wr">
            <input
              name={props.name}
              label={props.label}
              placeholder={props.placeholder}
              id={props.id}
              type={props.type}
              maxLength={props.maxLength}
              onBlur={onBlur}
              onChange={onChange}
            />
            <span>{props.fileName || 'Choose image...'}</span>
            <p className={`preVision ${props.preVision ? '' : 'hidden'}`}>
              <img src={props.preVision} alt="" />
            </p>
          </div>
        )
      }
      <label
        className={`error visible ${props.errorText ? 'show' : ''}`}
      >{props.errorText}</label>
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
  fileName: React.PropTypes.string,

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
