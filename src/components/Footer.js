import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    marginTop: '20px',
    marginBottom: '5px',
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
  },
  link: {
    color: '#ca0c16',
  }
});

const Footer = ({ classes }) => (
  <div className={classes.root}>
    Developed by&nbsp;
    <a
      className={classes.link}
      href="https://yinfei-profile.firebaseapp.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Yinfei
    </a>
    &nbsp;&nbsp;
    Learn Source code&nbsp;
    <a
      className={classes.link}
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      here
    </a>
  </div>
);

export default withStyles(styles)(Footer);