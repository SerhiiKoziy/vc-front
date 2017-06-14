import React from 'react';
// import { Link } from 'react-router';

const Header = ({ isAdminPanel }) => {
  const base = (isAdminPanel === 'admin') ? 'admin' : '';
  return (
    <div className="header">
      <div className="header-fiq">
        <span>? FIQ</span>
      </div>
      <div className="header-title">
        <h4>Header</h4>
      </div>
      <div className="header-contact">
        <span>contact us <i className="fa fa-envelope-o" aria-hidden="true" /></span>
      </div>
    </div>
  );
};


Header.propTypes = {
  onClick: React.PropTypes.func,
  isAdminPanel: React.PropTypes.string,
};

export default Header;
