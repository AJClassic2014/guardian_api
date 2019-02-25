import React, { Component } from 'react';
//import logo from './logo.svg';
import slogan from './slogan.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CheckboxList from "./CheckboxList";
import Pagination from "./Pagination";
import axios from "axios";
import * as moment from 'moment';

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

function groupBySection(data) {
  let results = [];
  let section = {};
  data.map(item => {
    if (!section[item.sectionId])//if section id is not found in section group, insert it
    {
      section[item.sectionId] = item.sectionId;
      results.push(
        {
          id: item.id,
          title: item.webTitle,
          link: item.webUrl,
          date: moment(item.webPublicationDate).format('DD/MM/YYYY'),
          section: item.sectionId
        }
      );
    }
    else //if section id already existing, find the position of new item by comparing section id
    {
      for (let i = 0; i < results.length; i++) {
        if (results[i].section === item.sectionId) {
          results.splice(
            i + 1,
            0,
            {
              id: item.id,
              title: item.webTitle,
              link: item.webUrl,
              date: moment(item.webPublicationDate).format('DD/MM/YYYY'),
              section: item.sectionId
            }
          );
          break;
        }
      }
    }
  });
  return results;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleUserTypes = event => {
    this.setState({ userTypes: event.target.value });
  };

  handlePinnedList = (pinnedList) => {
    this.setState({ pinnedList: pinnedList });
  };

  handlePage = (currentPage) => {
    if (currentPage >= 1) {
      axios.get(`https://content.guardianapis.com/search?page=${currentPage}&q=${this.state.userTypes}&api-key=cc56c111-e5a6-4922-92b8-181826199202`)
        .then(({ data: { response } }) => {
          let results = groupBySection(response.results);
          this.setState({
            results: [...results],
            currentPage: response.currentPage,
            allPages: response.pages,
            total: response.total,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({ currentPage: currentPage });
  };

  handleSearch = () => {
    if (this.state.userTypes.length !== 0) {
      axios.get(`https://content.guardianapis.com/search?q=${this.state.userTypes}&api-key=cc56c111-e5a6-4922-92b8-181826199202`)
        .then(({ data: { response } }) => {
          let results = groupBySection(response.results);
          this.setState({
            results: [...results],
            currentPage: response.currentPage,
            allPages: response.pages,
            total: response.total,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    else{
      axios.get('https://content.guardianapis.com/search?api-key=cc56c111-e5a6-4922-92b8-181826199202')
      .then(({ data: { response } }) => {
        let results = groupBySection(response.results);
        this.setState({
          results: [...results],
          currentPage: response.currentPage,
          allPages: response.pages,
          total: response.total,
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  componentDidMount = () => {
    axios.get('https://content.guardianapis.com/search?api-key=cc56c111-e5a6-4922-92b8-181826199202')
      .then(({ data: { response } }) => {
        let results = groupBySection(response.results);
        this.setState({
          results: [...results],
          currentPage: response.currentPage,
          allPages: response.pages,
          total: response.total
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      results,
      currentPage,
      allPages,
      total,
      pinnedList,
    } = this.state;
    return (
      <div className="App">
        <div className="Container">
          <img src={slogan} className={classes.slogan}  alt="logo" />
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
      <div className="resultList">
          <CheckboxList
            results={results}
            pinnedList={pinnedList}
            handlePinnedList={this.handlePinnedList}
          />
          <Pagination
            currentPage={currentPage}
            allPages={allPages}
            total={total}
            handlePage={this.handlePage}
          />
        </div>
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