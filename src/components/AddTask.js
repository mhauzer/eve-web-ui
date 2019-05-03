import React from "react";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {description: '', status: 'TODO'};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        var newTask = {description: this.state.description, status: this.state.status, owner: this.props.owner};
        console.log("task=" + JSON.stringify(newTask));
        this.props.addTask(newTask, this.props.taskListUrl);
        this.refs.addTaskDialog.hide();
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addTaskDialog.hide();
    }

    render() {
        return(
            <div>
                <SkyLight hideOnOverlayClicked ref="addTaskDialog">
                    <h3>New task</h3>
                    <form>
                        <input type="text" placeholder="description" name="description" onChange={this.handleChange} /><br /><br />
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="contained" color="primary" style={{'margin': '10px'}} onClick={() => this.refs.addTaskDialog.show()}>
                    New task
                    </Button>
                </div>
            </div>
        ); 
    }
}

export default AddTask;