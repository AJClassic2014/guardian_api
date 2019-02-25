import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  title: {
    fontSize: '1rem',
    fontWeight:550,
  },
  section: {
    color: '#ff6600',
  },
  pinned: {
    backgroundColor: '#70c5ca85',
  },
  pinnedBar: {
    fontSize: '1rem',
    fontWeight:550,
    backgroundColor: '#ed8836a3',
  },
  pinnedTitle: {
    fontSize: '1rem',
    fontWeight:550,
    color: 'white',
  },

});

class CheckboxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [1],
        };
       
      }

  handleToggle = value => () => {
    //const { checked } = this.state;
    const { pinnedList, handlePinnedList } = this.props;
    const currentIndex = pinnedList.indexOf(value);
    const newList = [...pinnedList];

    if (currentIndex === -1) {
      newList.push(value);
    } else {
      newList.splice(currentIndex, 1);
    }
    handlePinnedList(newList);
    this.setState({
      checked: newList,
    });
    console.log(newList);
  };

  render() {
    const { 
        classes,
        results,
        pinnedList,
     } = this.props;

    return (
      <List dense className={classes.root}>
        {results.map(value => (
          <ListItem key={value.id} button>
            {/* <ListItemText primary={`Line item ${value + 1}`} /> */}
            <ListItemText
            primary={
              <Typography 
              className={classes.title}
              color="textPrimary">
             {value.title}
             </Typography>

            }
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                Published: {value.date}  &nbsp;&nbsp;   <span className={classes.section}>Section:</span> {value.section}
              </Typography>
              {value.link}
            </React.Fragment>
          }/>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(value)}
                checked={this.state.checked.indexOf(value) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <div className={classes.pinnedBar}>
        <span className={classes.pinnedTitle}>
        Pinned Items
        </span>
        </div>
        {
          pinnedList.map(pinnedItem => (
            <ListItem className={classes.pinned} key={pinnedItem.id} button>
            <ListItemText
            primary={
              <Typography className={classes.title} color="textPrimary">
              {pinnedItem.title}
              </Typography> 
            }
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                     {pinnedItem.date}  &nbsp;&nbsp;   <span className={classes.section}>Section:</span> {pinnedItem.section}
              </Typography>
              {pinnedItem.link}
            </React.Fragment>
          }/>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(pinnedItem)}
                checked={this.state.checked.indexOf(pinnedItem) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          )
          )
        }
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);