import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Api } from "../Api";


class ProjectsList extends Component {
    onDelete = (project) => {
        Api.fetch("/projects/" + project._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
    };

    onEdit = (project) => {
        this.props.onEdit(project);
    };

    render() {
        return (
            <div className={'container'}>
                <ListGroup as="ul">
                    {this.props.projects.map(project => <ListGroup.Item as="li" active key={project._id} style={{ marginBottom: '10px', borderRadius: '5px' }}>
                        <div style={{ display: 'flex' }} className="student-container">

                            <div className="details-container">
                                <div className="user-name">{project.name}</div>
                                <div className="user-title">{project.description}</div>
                                <div>{project.repourl}</div>
                                <div>{project.liveurl}</div>


                            </div>
                            <div>
                                <div onClick={(e) => this.onEdit(project)}><i className='fas fa-edit'></i></div>
                                <div onClick={(e) => this.onDelete(project)}><i className='fas fa-trash'></i></div>
                            </div>
                        </div>
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

export default ProjectsList;