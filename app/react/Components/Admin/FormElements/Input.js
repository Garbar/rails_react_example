'use strict';
import Formsy  from 'formsy-react';

var Input = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label className="control-label col-xs-2" htmlFor={this.props.name}>{this.props.title}</label>
        <div className="col-xs-10">
          <input
            className="form-control"
            type={this.props.type || 'text'}
            name={this.props.name}
            onChange={this.changeValue}
            value={this.getValue()}
            checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
          <span className='validation-error'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});
module.exports = Input;
