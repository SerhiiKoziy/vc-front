import React, { Component } from 'react';
import { deleteTask, updateTask, getUsers } from '../actions';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SearchFilter from '../components/SearchFilter/SearchFilter';

import Task from '../components/Task/Task';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [],
    };
  }

  static propTypes = {
    deleteTask: React.PropTypes.func,
    updateTask: React.PropTypes.func,
    getUsers: React.PropTypes.func,
    push: React.PropTypes.func,
    data: React.PropTypes.object,
  };
  deleteTask(taskId) {
    this.props.deleteTask(taskId);
  }
  renderDustbins() {
    const data = this.props.data.data || [];
    const { application } = this.props.data;
    return data.map((item, i) => {
      return (
        <Link key={`task-${i}`} to={`/task/${item.id}`}>
          <Task
            item={item}
            isAdminPanel={application}
            onClick={::this.goToMainFilter}
            onDelete={(e) => { this.deleteTask(item.id, e); }
            /* this.deleteTask.bind(this, item.id)*/}
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
              {/* <div className="goAdmin" onClick={::this.goToAdmin}>goToAdmin</div>*/}
              <div className="header-contact">
                <span>contact us <i className="fa fa-envelope-o" aria-hidden="true" /></span>
              </div>
            </div>

            <div className="search-wr">
              <div className="search-wr-inside">
                <SearchFilter data={this.props.data.data} />
                <div className="search-btn">
                  <Link to={'/FilterPage'}>
                    <span><i className="fa fa-search" aria-hidden="true" /></span>
                  </Link>
                </div>
              </div>
              {/* <Search
                placeholder=''
                items={items}
                value={'j'}
                onItemsChanged={::this.HiItems}
              />*/}
            </div>
            {/* <Search
              items={items}
              placeholder='Pick your language'
              maxSelected={3}
              multiple={true}
              onItemsChanged={::this.HiItems}
            />*/}
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
    deleteTask, updateTask, push, getUsers,
  }
)(MainPage);

export default ConnectedComponent;
