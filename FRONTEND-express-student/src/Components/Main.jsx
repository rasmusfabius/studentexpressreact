import React, {Component} from 'react';
import StudentDetails from './StudentDetails';
import "bootstrap/dist/css/bootstrap.min.css"
import {Api} from "../Api";

class Main extends Component {
    state = {students: []};
    componentDidMount = ()  => {
        setInterval(() => this.loadData(),10000);
       this.loadData();
    };
    loadData = () => {
        Api.fetch("/students").then((students) => this.setState({students: students}));
    };
    render() {
        return (
            <div>

                <StudentDetails students={this.state.students} refresh={this.loadData}/>

            </div>
        );
    }
}

export default Main;