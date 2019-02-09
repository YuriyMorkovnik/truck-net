import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { formValueSelector } from 'redux-form';

import { connectAll } from "../../../utils";
import * as authActions from '../../../actions/auth';

import EmailField from './EmailField';
import PasswordField from './PasswordField';

function Auth({ formValues, open, onClose, register }) {
  const submit = () => {
    register(formValues);
    onClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registration
          </DialogContentText>
          <EmailField name="email" />
          <PasswordField name="password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit} color="primary">
            Sign up
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const formConfig = {
  form: 'auth',
};

const mapStateToProps = state => ({
  formValues:  formValueSelector('auth')(state, 'email', 'password'),
});

const mapDispatchToProps = {
  ...authActions,
};

export default connectAll({
  formConfig,
  mapStateToProps,
  mapDispatchToProps,
})(Auth);
