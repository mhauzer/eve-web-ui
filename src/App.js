import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Login from './components/Login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', data: []};
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  inputChanged = (event) => {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    alert(`You typed: ${this.state.text}`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            Eve
            <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <form onSubmit={this.handleSubmit}>   
                <Grid container alignItems="center" justify="flex-end">
                  <Grid item>
                    <TextField label="Your command" name="command" type="text" onChange={this.inputChanged} value={this.state.text}/>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" type="submit" label="Submit">Submit</Button>
                  </Grid>
                </Grid>
              </form>        
            </Grid>       
            </Grid>
          </Toolbar>
        </AppBar><br />
        <Login />
      </div>
    );
  }
}

export default App;
