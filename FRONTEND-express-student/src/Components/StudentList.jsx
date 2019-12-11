import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Api } from "../Api";


class StudentList extends Component {
    onDelete = (student) => {
        Api.fetch("/students/" + student._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
    };

    onEdit = (student) => {
        this.props.onEdit(student);
    };

    render() {
        return (
            <div className={'container'}>
                <ListGroup as="ul">
                    {this.props.students.map(student => <ListGroup.Item as="li" active key={student._id} style={{ marginBottom: '10px', borderRadius: '5px' }}>
                        <div style={{ display: 'flex' }} className="student-container">
                            <div>
                                {student.picture && <img src={student.picture} className="user-image" />}
                            </div>
                            <div className="details-container">
                                <div className="user-name">{student.name}</div>
                                <div className="user-title">{student.surname}</div>
                                <div>{student.studentID}</div>
                                <div>{student.email}</div>
                                <div>{student.date}</div>

                            </div>
                            <div>
                                <div onClick={(e) => this.onEdit(student)}><i className='fas fa-edit'></i></div>
                                <div onClick={(e) => this.onDelete(student)}><i className='fas fa-trash'></i></div>
                            </div>
                        </div>
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

export default StudentList;