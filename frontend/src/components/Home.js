import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Route } from "react-router-dom";
import FolderCont from './FolderCont'

export default class Home extends Component {

  state = {
    folders: [],
    folderName: "",
    folderId: "",
    folderImg: "",
    folderDate: "",
    error: "",
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/', this.state)
      .then(res => {
        if (res.data.msg == "folder with that name already exist") {
          this.setState({ error: "Error: Folder with that name already exist, Please use a different name" })
        } else if (res.data.msg == "folder created success") {
          this.setState({ error: "" })
        }
      })
      .catch(err => console.log(err))
  }

  deleteFolder = (e) => {
    axios.delete('http://localhost:5000/' + e.target.id)
    .then(()=>{window.location.reload()})
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

  componentDidUpdate = () => {
    axios.get('http://localhost:5000/')
      .then(res => {
        this.setState({ folders: res.data })
      })
      .catch(error => { console.log(error) })

  }

  
  render() {

    return (
      <div>
        <Form onSubmit={this.submit} action='http://locahost:5000/' method="post" style={{ width: '50%', margin: '100px auto 50px auto' }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ fontSize: '20px', fontWeight: '600' }}>Create a New Folder</Form.Label>
            <Form.Control type="name" placeholder="Enter folder name" name="name" onChange={this.onChange} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Button variant="outline-secondary" block type="submit" style={{ width: '100px', margin: '0 auto' }}>
            Submit
  </Button>
        </Form>
        {this.state.error.length > 0 ?
          <h4 style={{ textAlign: 'center', marginTop: '-40px', marginBottom: '20px' }}>{this.state.error}</h4> : null}

        <div style={{ border: '2px solid black', backgroundColor: '#e8e7e6' }} className="ui four column doubling stackable grid center aligned container">

          {this.state.folders.map((data) => {
            return <div className="column">
              <a onClick={() => { this.setState({ folderName: data.name, folderId: data._id, folderImg: data.img, folderDate: data.date }) }} href={"/folder/" + this.state.folderId}>

                <img src={data.img} />
              </a>
              <h4 style={{ marginTop: '-20px', marginBottom: '30px' }}>{data.name}</h4>
              <p style={{ marginTop: '-20px', marginBottom: '20px' }}>{data.date.replace("T", " at ").slice(0, -5)}</p>
              <div>
            <button onClick={this.deleteFolder} id={data._id}  type="button" class="btn btn-secondary" >Delete</button>
          </div>
            </div>
            
          })}
        </div>


        {/* <Route
            
            path="/folder/:id"
            render={props => (
              <FolderCont
                name={this.state.folderName}
                id={this.state.folderId}
                img={this.state.folderImg}
                date={this.state.folderDate}
                {...props}
              />
            )}
        /> */}
      </div>
    )
  }
}
