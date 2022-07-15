import React from 'react';
import {connect} from "react-redux";
import {Button, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Modal} from 'reactstrap';
import {useState} from "react";

function App(props) {
    const [modal, setmodal] = useState(false)
    const [task, setTask] = useState({id: "", tittle: "22", status: ""})
    const [edit, setEdit] = useState(false)
    const toggle = () => {
        setmodal(!modal)
    }

    const changeForm = (event) => {
        event.preventDefault()
        task.tittle = event.target[0].value
        task.status = event.target[1].value
        const copiedUser = {...task}
        if (edit) {
          props.changeTask(task)
            toggle()
            setEdit(!edit)
        }
        else {
            props.addTask(copiedUser)
            toggle()
            event.target[0].value = ""
            event.target[1].value = ""
            setTask({id: "", tittle: "", status: ""})
        }
    }
    return (
        <div className={"container"}>
            <div className="row mt-3 ">
                <div className="col-12 p-3 border">
                    <h3>Umumiy tasklar soni:{props.tasks.length}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 ">
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th className={"d-flex"}><h3>Open</h3> <span
                                className={"bg-danger"}>{props.tasks.filter((task) => task.status === "open").length}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.tasks.filter((task) => task.status === "open").map((task, index) => {
                                return <tr key={index}>
                                    <td>{task.tittle}</td>
                                    <td>
                                        <button onClick={() => props.deleteTask(task.id)}
                                                className={"btn btn-danger"}>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setEdit(!edit)
                                            setTask(task)
                                            toggle()
                                        }} className={"btn btn-secondary"}>Tahrirlash</button>
                                    </td>

                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    <div className="d-grid gap-2">
                        <button onClick={() => {
                            toggle();
                            setTask({id: "", tittle: "", status: "open"})
                        }} className="btn btn-success" type="button"> Task
                            qo`shish
                        </button>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th><h3>Inprogress</h3><span
                                className={"bg-danger"}>{props.tasks.filter((task) => task.status === "inprogress").length}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.tasks.filter((task) => task.status === "inprogress").map((task, index) => {
                                return <tr key={index}>
                                    <td>{task.tittle}</td>
                                    <td>
                                        <button onClick={() => props.deleteTask(task.id)}
                                                className={"btn btn-danger"}>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setEdit(!edit)
                                            setTask(task)
                                            toggle()
                                        }} className={"btn btn-secondary"}>Tahrirlash</button>
                                    </td>

                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    <div className="d-grid gap-2">
                        <button onClick={() => {
                            toggle();
                            setTask({id: "", tittle: "", status: "inprogress"})
                        }} className="btn btn-success" type="button"> Task
                            qo`shish
                        </button>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th><h3>Completed</h3><span
                                className={"bg-danger"}>{props.tasks.filter((task) => task.status === "completed").length}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.tasks.filter((task) => task.status === "completed").map((task, index) => {
                                return <tr key={index}>
                                    <td>{task.tittle}</td>
                                    <td>
                                        <button onClick={() => props.deleteTask(task.id)}
                                                className={"btn btn-danger"}>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setEdit(!edit)
                                            setTask(task)
                                            toggle()
                                        }} className={"btn btn-secondary"}>Tahrirlash
                                        </button>
                                    </td>

                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    <div className="d-grid gap-2">
                        <button onClick={() => {
                            toggle();
                            setTask({id: "", tittle: "", status: "completed"})
                        }} className="btn btn-success" type="button"> Task
                            qo`shish
                        </button>
                    </div>
                </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={changeForm} id={"addTask"}>
                            <FormGroup>
                                Tiitle <Input defaultValue={task.tittle} required={true} type="text" id="firstName"
                                              placeholder="Tittle"/>
                            </FormGroup>
                            <FormGroup>
                                Status <select defaultValue={task.status} className={"form-select"}>
                                <option value="inprogress">Inrogress</option>
                                <option value="open">Open</option>
                                <option value="completed">Completed</option>
                            </select>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" form={"addTask"}>Saqlash</Button>{' '}
                        <Button color="secondary" onClick={toggle}>chiqish</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        addTask: (task) => {
            dispatch({type: "addTask", payload: task})
        },
        deleteTask: (id) => {
            dispatch({type: "deleteTask", payload: id})
        },
        changeTask: (task) => {
            dispatch({type: "changeTask", payload: task})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);