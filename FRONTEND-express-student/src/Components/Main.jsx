import React, { Component } from 'react';
import StudentDetails from './StudentDetails';
import "bootstrap/dist/css/bootstrap.min.css"
import { Api } from "../Api";
import ProjectsDetails from './ProjectsList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Main extends Component {
    state = {
        students: [],
        projects: []
    };
    componentDidMount = () => {
        setInterval(() => this.loadData(), 10000);
        this.loadData();
    };
    loadData = () => {
        Api.fetch("/students").then((students) => this.setState({ students: students }));
        Api.fetch("/projects").then((projects) => this.setState({ projects: projects }));
    };
    render() {
        return (
            <Router>
                <Route path='/' exact>
                    <StudentDetails students={this.state.students} refresh={this.loadData} />
                </Route>
                <Route path='/Projects'>
                    <ProjectsDetails projects={this.state.projects} refresh={this.loadData} />

                </Route>
            </Router>
        );
    }
}




export default Main;