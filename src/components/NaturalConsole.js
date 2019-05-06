import React from 'react';
import Console from 'react-console-component';
import { SERVER_URL } from '../constants';

class NaturalConsole extends Console {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    echo = (sentence) => {
        const token = sessionStorage.getItem('jwt');
        const message = { message: sentence };
        fetch(SERVER_URL + "nlp/parse", { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(message)
        })
        .then(res => res.json())
        .then(resJson => {
            this.refs.console.log(resJson.message);
            this.refs.console.return();
        })
        .catch(err => console.error(err));
    }

    render() {
        return <Console ref="console" 
            handler={this.echo} 
            autofocus={true}
        />;
    }
}

export default NaturalConsole;