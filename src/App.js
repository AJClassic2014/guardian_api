import React, { Component } from 'react';
import slogan from './slogan.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import groupBySection from "./GroupBySection";
import guardianApi from "./GuardianApi";
import NoResults from "./NoResults";
import ResultList from "./ResultList";
//import errorCatch from "./ErrorCatch";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

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
  slogan: {
    width: '20%',
    backgroundColor: '#0d7cad',
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      userTypes: "",
      results: [],
      pinnedList: [],
      currentPage: 0,
      allPages: 0,
      total: 0,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUserTypes = this.handleUserTypes.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handlePinnedList = this.handlePinnedList.bind(this);
    this.getResultList = this.getResultList.bind(this);
  }

  handleUserTypes = event => {
    this.setState({ userTypes: event.target.value });
  };

  handlePinnedList = (pinnedList) => {
    this.setState({ pinnedList: pinnedList });
  };

  getResultList = (input, page) => {
    guardianApi(input, page)
      .then(({ data: { response } }) => {
        let results = groupBySection(response.results);
        this.setState({
          results: [...results],
          currentPage: response.currentPage,
          allPages: response.pages,
          total: response.total,
          loading: false,
          error: "",
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error.message });
      });
  }

  handlePage = (currentPage) => {
    if (currentPage >= 1) {
      this.getResultList(this.state.userTypes, currentPage);
    }
  };

  handleSearch = () => {
    this.getResultList(this.state.userTypes, 1);
  };

  componentDidMount = () => {
    this.getResultList(this.state.userTypes, this.state.currentPage);
  };

  render() {
    const { classes } = this.props;
    const {
      results,
      loading,
      error,
      ...rest
    } = this.state;
    return (
      <div className="App">
        <div className="Container">
          <img src={slogan} className={classes.slogan} alt="logo" />
          <div className="searchField">
            <TextField
              id="outlined-name"
              className={classes.textField}
              margin="normal"
              value={this.state.userTypes}
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
          {loading && <LoadingPage />}
          {(results.length !== 0 && error.length === 0) &&
            <ResultList
              results={results}
              {...rest}
              handlePage={this.handlePage}
              handlePinnedList={this.handlePinnedList}
            />
          }
          {(loading === false && results.length === 0) && <NoResults />}
          {error.length !== 0 && <ErrorPage error={error} />}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Source code
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);