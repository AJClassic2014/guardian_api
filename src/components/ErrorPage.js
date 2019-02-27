import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    color: '#000000',
    textAlign: 'center',
  },
  message: {
    color: '#ea4335',
  },
});

const ErrorPage = ({ 
  classes,
  error, 
}) => (
  <div className={classes.root}>
    <div>X_X</div>
    <div className={classes.message}>{error}</div>
    System goes wrong,
    please try again later
  </div>
);

export default withStyles(styles)(ErrorPage);