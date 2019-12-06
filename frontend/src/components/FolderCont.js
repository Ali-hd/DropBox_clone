import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'


export default class FolderCont extends Component {
    state = {
        folders: [],
        name: null,
        img: null,
        date: null,
    }
    componentDidMount = () => {

        axios.get('http://localhost:5000/')
            .then(res => {

                this.setState({ folders: res.data })
                console.log("data folders")
                console.log(this.state.folders)

            })
            .catch(error => { console.log(error) })
    }
    render() {
        return (
            <div>
                {this.state.folders.map((data) => {
                    return this.props.match.params.id == data._id ?
                        <div>
                            <a href="http://localhost:3000/">Back to home</a>

                            <h1> Folder Name: {data.name}</h1>
                            <h6>Created on: {data.date.replace("T"," at ").slice(0, -5)}</h6>
                        </div> : null
                }
                )}
            </div>

        )
    }
}
