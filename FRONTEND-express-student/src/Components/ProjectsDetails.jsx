import React, { Component } from 'react';
import { Container, button, label, input } from 'reactstrap';
import ProjectList from "./ProjectsList";
import { Api } from "../Api";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';


class ProjectDetails extends Component {
    state = { modal: false };
    onFormSubmit = (e) => {
        if (this.state._id) {
            Api.fetch("/projects/" + this.state._id, "PUT", this.state).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/projects/", "POST", this.state).then(res => {
                console.log("inserted", res);
                this.props.refresh()
            });
        }
        this.setState({ _id: undefined });
        this.toggle();
    };
    updateForm = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };
    formRequire = (e) => {
        return !(this.state.name && this.state.description && this.state.repourl && this.state.liveurl);
    };
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    onEdit = (project) => {
        console.log(project);
        this.setState({ ...project });
        this.toggle();
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="button-modal">
                            <button className="btn btn-primary" onClick={this.toggle}><i
                                className="far fa-edit" id="newsfeedPencil"></i> Add Student Project
                        </button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Project
                                Details</ModalHeader>
                            <ModalBody>
                                <Container className={'studentForm'}>

                                    <form autoComplete="off" id="form">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Project Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Project Name"
                                                    defaultValue={this.state.name}
                                                    onChange={this.updateForm} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Description</label>
                                                <input type="text" className="form-control" id="description"
                                                    placeholder="Description" defaultValue={this.state.description}
                                                    onChange={this.updateForm} />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input type="text" className="form-control" id="studentID"
                                                placeholder="#" onChange={this.updateForm}
                                                defaultValue={this.state.studentID} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>RepoUrl</label>
                                            <input type="text" className="form-control" id="email"
                                                placeholder="" onChange={this.updateForm}
                                                defaultValue={this.state.repourl} />
                                        </div>
                                        <div className="form-group">
                                            <label>Live Url</label>
                                            <input type="text" className="form-control" id="liveurl"
                                                placeholder="" onChange={this.updateForm}
                                                defaultValue={this.state.liveurl} />
                                        </div>

                                        <button type="button" className="btn btn-primary"
                                            disabled={this.formRequire() ? 'disabled' : null}
                                            onClick={this.onFormSubmit}>Submit
                                        </button>
                                    </form>
                                </Container>
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProjectList projects={this.props.projects} refresh={this.props.refresh} onEdit={this.onEdit} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProjectDetails;