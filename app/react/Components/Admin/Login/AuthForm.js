'use strict';
import Formsy   from 'formsy-react';
import Input    from './Input';

var AuthForm = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  onSubmit(data) {
    this.props.actions.login(data);
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render: function() {
    return (
        <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <Input name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
          <Input name="password" title="Password" type="password" required />
          <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!this.state.canSubmit}>Sign in</button>
        </Formsy.Form>

    );
  }
});
module.exports = AuthForm;
