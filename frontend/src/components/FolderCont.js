import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'


export default class FolderCont extends Component {
    state = {
        folders: [],
        name: null,
        img: null,
        date: null,
        files: [],
        fileName: "",
        fileId: "",
        fileImg: "",
        fileDate: "",
        error: "",
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })}

    submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/file/createfile', this.state)
          .then(res => {
              console.log('file post ');
              console.log(this.state.files);
              
            if (res.data.msg == "file with that name already exist") {
              this.setState({ error: "Error: File with that name already exist, Please use a different name" })
            } else if (res.data.msg == "file created success") {
              this.setState({ error: "" })
            }
          })
          .catch(err => console.log(err))
      }

      deleteFile = (e) => {
        axios.delete('http://localhost:5000/file' + e.target.id)
        .then(()=>{window.location.reload()})
    }

    componentDidMount = () => {

        axios.get('http://localhost:5000/file')
            .then(res => {

                this.setState({ folders: res.data, files: res.data})
                console.log("data files")
                console.log(this.state.files)

            })
            .catch(error => { console.log(error) })
    }
    componentDidUpdate = () => {
        axios.get('http://localhost:5000/file')
          .then(res => {
            this.setState({ folders: res.data , files: res.data })
          })
          .catch(error => { console.log(error) })
    
      }


    render() {
        return (
            <div>
                <div>
                    {this.state.folders.map((data) => {
                        return this.props.match.params.id == data._id ?
                            <div>
                                <a href="http://localhost:3000/">Back to home</a>

                                <h1> Folder Name: {data.name}</h1>
                                <h6>Created on: {data.date.replace("T", " at ").slice(0, -5)}</h6>
                            </div> : null
                    }
                    )}
                </div>

                <div>
                    <Form onSubmit={this.submit} action='http://localhost:5000/file/createfile' method="post" style={{ width: '50%', margin: '100px auto 50px auto' }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{ fontSize: '20px', fontWeight: '600' }}>Create a New File</Form.Label>
                            <Form.Control type="name" placeholder="Enter file name" name="name" onChange={this.onChange} />
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

                        {this.state.files.map((data) => {
                            return <div className="column">
                                <a onClick={() => { this.setState({ fileName: data.name, fileId: data._id, fileImg: data.img, fileDate: data.date }) }} href={"/file/" + this.state.fileId}>

                                    <img src={data.img} />
                                </a>
                                <h4 style={{ marginTop: '20px', marginBottom: '30px' }}>{data.name}</h4>
                                <p style={{ marginTop: '-20px', marginBottom: '20px' }}>{data.date.replace("T", " at ").slice(0, -5)}</p>
                                <div>
                                    <button onClick={this.deleteFile} id={data._id} type="button" class="btn btn-secondary" >Delete</button>
                                </div>
                            </div>

                        })}
                    </div>
                </div>
            </div>
        )
    }
}
