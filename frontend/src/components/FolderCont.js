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
        parentid: null,
        empty: true,
        updatedname: null,
        showEdit: false,
        editId:''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    editOnChange = (e) => {
        this.setState({
            updatedname : e.target.value
        })
        console.log(this.state.updatedname)
    }

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
        axios.delete('http://localhost:5000/file/' + e.target.id)
        .then(res => {
            console.log('file deleted');})
        .catch(err=>console.log(err))
        
    }
    editFile = (e) => {
        axios.put('http://localhost:5000/file/' + e.target.id, this.state)
        .then(res => {
            console.log('updated file name');})
        .catch(err=>console.log(err))
        this.setState({ showEdit: false, editId: '' })
            
    }
    checkEdit = (e) => {
        this.setState({ showEdit: true, editId: e.target.id })
    }
    cancelEdit = (e) => {
        this.setState({ showEdit: false, editId: '' })
    }
    empty = () =>{
        this.setState({ empty: true})
        console.log("yes empty")
    }
    
    componentDidMount = () => {

        axios.get('http://localhost:5000/file')
            .then(res => {

                this.setState({ files: res.data })
                console.log("data files")
                console.log(this.state.files)
                { this.setState({ parentid: this.props.match.params.id }) }
            })
            .catch(error => { console.log(error) })

        axios.get('http://localhost:5000/')
            .then(res => {

                this.setState({ folders: res.data })
                console.log("data folders")
                console.log(this.state.folders)

            })
            .catch(error => { console.log(error) })

    }
    componentDidUpdate = () => {
        axios.get('http://localhost:5000/file')
            .then(res => {
                this.setState({ files: res.data })
            })
            .catch(error => { console.log(error) })
    
    }


    render() {
        return (
            <div>
                <div>
                
                    {this.state.folders.map((data) => {
                        return this.props.match.params.id == data._id ?
                            <div style={{ textAlign: 'center' }}>
                                <br /><br />
                                <h1><span style={{ fontSize: '26px' }}> Folder Name:</span> <span style={{ fontFamily: 'Serif', fontWeight: '500' }}>{data.name}</span></h1>
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
                        <Button variant="outline-info" block type="submit" style={{ width: '100px', margin: '0 auto' }}>
                            Submit
</Button>
                    </Form>
                    {this.state.error.length > 0 ?
                        <h4 style={{ textAlign: 'center', marginTop: '-40px', marginBottom: '20px' }}>{this.state.error}</h4> : null}

                    <div style={{ border: '2px solid black', backgroundColor: '#e8e7e6' }} className="ui four column doubling stackable grid center aligned container">
                        
                        {this.state.files.map((data) => {
                            return this.props.match.params.id == data.parentid ?
                                <div className="column">

                                    <a onClick={() => { this.setState({ fileName: data.name, fileId: data._id, fileImg: data.img, fileDate: data.date }) }} href={"/file/" + this.state.fileId}>

                                        <img src={data.img} />
                                    </a>
                                    <h4 style={{ marginTop: '20px', marginBottom: '30px' }}>{data.name}</h4>
                                    <p style={{ marginTop: '-20px', marginBottom: '20px' }}>{data.date.replace("T", " at ").slice(0, -5)}</p>
                                    <div>
                                        <button onClick={this.deleteFile} id={data._id} type="button" class="btn btn-danger" >Delete</button>
                                        <button style={{ marginLeft: '5px' }} onClick={this.checkEdit} id={data._id} type="button" class="btn btn-secondary" >Edit</button>
                                        {this.state.showEdit == true && this.state.editId == data._id ? <div>
                                            <Form style={{marginTop:'10px', marginBottom:'5px'}}>
                                                    <Form.Control type="name" name="edit" placeholder="Enter a new name" onChange={this.editOnChange}/>
                                            </Form>
                                            <button onClick={this.editFile} id={data._id} type="button" class="btn btn-primary" >Confirm</button>
                                            <button style={{ marginLeft: '15px' }} onClick={this.cancelEdit} id={data._id} type="button" class="btn btn-secondary" >Cancel</button>
                                        </div> : null}
                                    </div>
                                    {this.state.empty == true ? this.setState({ empty: false }) : null}
                                </div> : null
                        })}
                        {this.state.empty == true ? <div><br /><br /><br /><h1>Folder is empty</h1><br /><br /><br /></div> : null}
                    </div>

                </div>
                <br /><br /><br /><br /><br />
                <a style={{ textAlign: 'center', textDecoration: 'none' }} href="http://localhost:3000/"><Button variant="light" block style={{ width: '300px', margin: '0 auto' }}>Back to Home</Button></a>
            </div>
        )
    }
}
