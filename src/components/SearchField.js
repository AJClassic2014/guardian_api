
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '13px',
    width: 110,
  },
  inputHeight: {
    height: 4,
    fontSize: "1em"
  },
  searchField: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     // userTypes: "",
    }
    this.handleUserTypes = this.handleUserTypes.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleUserTypes = (event) => {
    this.props.handleUserTypes(event.target.value);
  }

  handleSearch = () => {
    this.props.handleSearch();
  }

  render() {
    const {
      userTypes,
      classes,
    } = this.props;
    return (
      <div className={classes.searchField}>
        <TextField
          id="outlined-name"
          className={classes.textField}
          margin="normal"
          value={userTypes}
          onChange={this.handleUserTypes}
          variant="outlined"
          InputProps={{ classes: { input: this.props.classes.inputHeight } }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSearch}
        >
          Search
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SearchField);
