import React, {Component} from 'react';
import {Container, button, label, input} from 'reactstrap';
import StudentList from "./StudentList";
import {Api} from "../Api";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';


class StudentDetails extends Component {
    state = {modal: false};
    onFormSubmit = (e) => {
        if (this.state._id) {
            Api.fetch("/students/" + this.state._id, "PUT", this.state).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/students", "POST", this.state).then(res => {
                console.log("inserted", res);
                this.props.refresh()
            });
        }
        this.setState({_id: undefined});
        this.toggle();
    };
    updateForm = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };
    formRequire = (e) => {
        return !(this.state.name && this.state.surname && this.state.email);
    };
    toggle = () => {
        this.setState({modal: !this.state.modal});
    };
    onEdit = (student) => {
        console.log(student);
        this.setState({...student});
        this.toggle();
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="button-modal">
                        <button className="btn btn-primary" onClick={this.toggle}><i
                            className="far fa-edit" id="newsfeedPencil"></i> Add Student
                        </button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Student
                                Details</ModalHeader>
                            <ModalBody>
                                <Container className={'studentForm'}>

                                    <form autoComplete="off" id="form">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Name"
                                                       defaultValue={this.state.name}
                                                       onChange={this.updateForm}/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Surname</label>
                                                <input type="text" className="form-control" id="surname"
                                                       placeholder="Surname" defaultValue={this.state.surname}
                                                       onChange={this.updateForm}/>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input type="text" className="form-control" id="studentID"
                                                   placeholder="#" onChange={this.updateForm}
                                                   defaultValue={this.state.studentID}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" id="email"
                                                   placeholder="example@strive.com" onChange={this.updateForm}
                                                   defaultValue={this.state.email}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Date of Birth </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                placeholder="date placeholder"
                                                onChange={this.updateForm}
                                                defaultValue={this.state.date}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Picture</label>
                                            <textarea  className="form-control" id="picture"
                                                   defaultValue={this.state.picture}
                                                   placeholder="http://..." onChange={this.updateForm}/>
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
                        <StudentList students={this.props.students} refresh={this.props.refresh} onEdit={this.onEdit}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default StudentDetails;