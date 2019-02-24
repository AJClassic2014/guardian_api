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
            primary={value.title}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {value.date}   {value.section}
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
        {
           <ListItem>
           <ListItemText primary="Pinned Items" />
         </ListItem>
        }
        {
          pinnedList.map(pinnedItem => (
            <ListItem key={pinnedItem.id} button>
            <ListItemText
            primary={pinnedItem.title}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {pinnedItem.date}   {pinnedItem.section}
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