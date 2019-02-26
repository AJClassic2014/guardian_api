import React, { Component } from 'react';
import slogan from './assets/slogan.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import groupBySection from "./functions/GroupBySection";
import guardianApi from "./functions/GuardianApi";
import SearchField from "./components/SearchField";
import NoResults from "./components/NoResults";
import ResultList from "./components/ResultList";
//import errorCatch from "./functions/ErrorCatch";
import LoadingPage from "./components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

const styles = theme => ({
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

  handleUserTypes = (userTypes) => {
    this.setState({ userTypes: userTypes });
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
          <SearchField
            userTypes={this.state.userTypes}
            handleSearch={this.handleSearch}
            handleUserTypes={this.handleUserTypes}
          />
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