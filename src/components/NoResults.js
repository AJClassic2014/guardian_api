import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    color: '#ea4335',
    textAlign: 'center',
  }
});

const NoResults = ({ 
  classes, 
}) => (
  <div className={classes.root}>
    No results by your search,
    <br />please try other key words
  </div>
);

export default withStyles(styles)(NoResults);