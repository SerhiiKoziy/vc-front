import React, { Component } from 'react';
import { getUsers } from '../actions';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
// import SearchFilter from '../components/SearchFilter/SearchFilter';

import PreViewCv from '../components/CV/PreViewCv';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
    };
  }

  static propTypes = {
    getUsers: React.PropTypes.func,
    push: React.PropTypes.func,
    data: React.PropTypes.object,
  };

  renderDustbins() {
    const data = this.props.data.data || [];
    const { application } = this.props.data;
    return data.map((item, i) => {
      return (
        <Link key={`task-${i}`} to={`/task/${item.id}`}>
          <PreViewCv
            item={item}
            isAdminPanel={application}
            onClick={::this.goToMainFilter}
          />
        </Link>
      );
    });
  }
  goToMainFilter() {
    this.props.push('/FilterPage');
  }
  render() {
    return (
      <div className={'page start-page columns'}>
        <div className="dashboard-wr main-page">
          <div className="header-wr">
            <div className="header">
              <div className="header-fiq">
                <span>? FIQ</span>
              </div>
              <div className="header-title">
                <h4>Header</h4>
              </div>
              <div className="header-contact">
                <span>contact us</span>
                <span>
                  <ReactSVG
                    path="../assets/images/svg/mail.svg"
                    className="example"
                    evalScript="always"
                    style={{ width: 15, height: 15, fill: '#fff' }}
                  />
                </span>
              </div>
            </div>

            <div className="search-wr">
              <div className="search-wr-inside">
                {/*<SearchFilter data={this.props.data.data} />*/}
                <div className="search-btn">
                  <Link to={'/FilterPage'}>
                    <span><i className="fa fa-search" aria-hidden="true" /></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="inside-wr">
            <div className="lists-wr main-lists-wr">
              {this.renderDustbins()}
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
)(MainPage);

export default ConnectedComponent;
