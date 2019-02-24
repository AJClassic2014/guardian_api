import React, { Component } from 'react';
//import logo from './logo.svg';
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
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
    width: 100,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      currentPage : 1,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount = () => {
  let results = [];
  let section = {};
  axios.get('https://content.guardianapis.com/search?api-key=cc56c111-e5a6-4922-92b8-181826199202')
  .then( ({data : {response}}) => {
    response.results.map( item => {
      if(!section[item.sectionId])//if section id is not found in section group, insert it
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
        for(let i = 0; i < results.length; i++){
           if(results[i].section === item.sectionId){
            results.splice(
              i+1, 
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
    this.setState({ results: [...results] });
  })
  .catch( error => {
    console.log(error);
  });
  };

  render() {
    const { classes } = this.props;
    const { results } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button}>
         Clear
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
      Search
      </Button>
       <CheckboxList results={results}/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
         
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);