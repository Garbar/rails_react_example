'use strict';
import Formsy  from 'formsy-react';

var Input = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render: function() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <input
          className="form-control"
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          placeholder={this.props.title}
        />
        <span className='alert-danger'>{errorMessage}</span>
      </div>
    );
  }
});

module.exports = Input;
