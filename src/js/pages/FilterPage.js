import React, { Component } from 'react';
import { deleteTask, updateTask, getUsers } from '../actions';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Search from 'react-search';

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
    push: React.PropTypes.func,
    data: React.PropTypes.array,
  };
  deleteTask(taskId) {
    this.props.deleteTask(taskId);
  }
  renderDustbins() {
    return this.props.data.map((item, i) => {
      return (
        <Task
          item={item}
          key={i}
          isAdminPanel={false}
          onClick={::this.goToMainFilter}
          onDelete={this.deleteTask.bind(this, item.id)}
        />
      );
    });
  }
  goToAdmin() {
    this.props.push('/DashBoard');
  }
  goToMainFilter() {
    this.props.push('/FilterPage');
  }
  HiItems(items) {
    console.log(items);
  }
  render() {
    let items = [
      { id: 0, value: 'ruby' },
      { id: 1, value: 'javascript' },
      { id: 2, value: 'lua' },
      { id: 3, value: 'go' },
      { id: 4, value: 'julia' },
    ]
    return (
      <div className={'page start-page columns'}>
        <div className="dashboard-wr main-page">
          <div className="builder-task">
            <div className="goAdmin" onClick={::this.goToAdmin}>goToAdmin</div>
            <div className="search-wr">
              <div className="search-btn">
                <span><i className="fa fa-search" aria-hidden="true" /></span>
              </div>
              <Search
                placeholder=''
                items={items}
                value={'j'}
                onItemsChanged={::this.HiItems}
              />
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
    deleteTask, updateTask, push,
  }
)(MainPage);

export default ConnectedComponent;
