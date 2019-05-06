import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import SkyLight from "react-skylight";
import { SERVER_URL } from '../constants';
import Tasklist from './Tasklist';
import NaturalConsole from './NaturalConsole';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isAuthenticated: false, isInitialized: false, open: false, person: null};
    }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClose = (event) => {
        this.setState({open: false});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var newUser = {username: this.state.username, password: this.state.password, role: 'user'};
        this.signup(newUser);
        this.refs.signupDialog.hide();
    }

    
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.signupDialog.hide();
    }

    signup = (user) => {
        fetch(SERVER_URL + "users/sign-up", { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user) })
        .catch(err => console.error(err));
    }

    login = () => {        
        const user = {username: this.state.username, password: this.state.password};
        //console.log(JSON.stringify(user));
        //console.log(SERVER_URL + 'login');
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            for(var key of res.headers.keys()) {
                console.log(key); 
             }
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                this.setState({isAuthenticated: true});
                this.fetchUserByUsername(user.username);                
            } else {
                this.setState({open: true});
            }
        })        
        .catch(err => console.error(err));
    }

    logout = () => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('person');
        sessionStorage.removeItem('user');
        this.setState({isAuthenticated: false});
        this.setState({isInitialized: false});
    }

    fetchUserByUsername = (username) => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + `api/userAccounts/search/findByUsername?username=${username}`, {
            headers: { 'Authorization': token }
        })
        .then(res => res.json())
        .then(user => {
            sessionStorage.setItem("user", JSON.stringify(user));
            return fetch(user._links.person.href, {
                headers: { 'Authorization': token }
            })
        })
        .then(res => res.json())
        .then(person => {
            sessionStorage.setItem("person", JSON.stringify(person));        
            this.setState({'person': person});
            this.setState({isInitialized: true});            
        })
        .catch(err => {
            console.error(err);            
        });
    }


    render() {        
        if (this.state.isAuthenticated === true && this.state.isInitialized === true) {
            //<Tasklist tasks={this.state.person._links.tasks.href} owner={this.state.person._links.self.href}/>
            return (
                <div>
                    <Card>
                        <Button variant="contained" onClick={this.logout}>Logout</Button>
                    </Card>
                    <NaturalConsole />
                    
                </div>
            );
        } else return (
            <div>
                <SkyLight hideOnOverlayClicked ref="signupDialog">
                    <h3>New account</h3>
                    <form>
                        <TextField type="text" placeholder="Username" name="username" onChange={this.handleChange} /><br />
                        <TextField type="password" placeholder="Password" name="password" onChange={this.handleChange} /><br /><br />
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Create the account</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>                        
                    </form>
                </SkyLight>
                <div>
                <TextField name="username" placeholder="Username" onChange={this.handleChange}/><br />
                <TextField type="password" name="password" placeholder="Password" onChange={this.handleChange}/><br /><br />
                <Button variant="contained" color="default" onClick={this.login}>Login</Button><br /><br />
                <p>Don't have an account?</p>
                <Button variant="contained" color="primary" onClick={() => this.refs.signupDialog.show()}>Sign up</Button>            
                <Snackbar open={this.state.open} onClose={this.handleClose} autoHideDuration={1500} message="Wrong username or password!"/>
                </div>
            </div>
        );
    }
}

export default Login;