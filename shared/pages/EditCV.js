import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CreateCV from '../components/CV/CreateCV';

class EditCV extends PureComponent {
  static propTypes = {
    params: React.PropTypes.object,
    data: React.PropTypes.object,
  };

  render() {
    if (this.props.data.data) {
      const currentTask = this.props.data.data.find(item => {
        return item.id === parseFloat(this.props.params.cvId);
      });
      return (
        <div className="builder-task edit-builder-task">
          <CreateCV
            currentTask={currentTask || {}}
            buttonText="Edit task"
            paramsEdit="Edit"
          />
        </div>
      );
    }
    return null;
  }
}

export default connect((state) => {
  return { data: state.data };
})(EditCV);

