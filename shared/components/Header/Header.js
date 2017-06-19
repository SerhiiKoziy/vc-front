import React from 'react';
import ReactSVG from 'react-svg';
// import { Link } from 'react-router';

const Header = ({ isAdminPanel }) => {
  const base = (isAdminPanel === 'admin') ? 'admin' : '';
  return (
    <div className={`header ${base}`}>
      <div className="header-fiq">
        <span>? FIQ</span>
      </div>
      <div className="header-title">
        <ReactSVG
          path="../assets/images/svg/logo.svg"
          className="example"
          evalScript="always"
          style={{ width: 110, fill: '#fff' }}
        />
      </div>
      <div className="header-contact">
        <span>contact us</span>
        <span className="svg-wr">
          <ReactSVG
            path="../assets/images/svg/mail.svg"
            className="example"
            evalScript="always"
            style={{ width: 18, height: 13, fill: '#fff' }}
          />
        </span>
      </div>
    </div>
  );
};


Header.propTypes = {
  onClick: React.PropTypes.func,
  isAdminPanel: React.PropTypes.string,
};

export default Header;
