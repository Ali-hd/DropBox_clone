import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import FolderCont from './components/FolderCont'
import FileCont from './components/FileCont'


export default class App extends Component {

  
 
  render() {
    
    return (
      <div>
      <Router>

      <Route
        exact
        path="/"
        render={props => (
          <Home
            {...props}
            />
            )}
        />
        <Route
            
            path="/folder/:id"
            render={props => (
              <FolderCont
                {...props}
              />
            )}
        />
        <Route
            
            path="/folder/:id/file"
            render={props => (
              <FileCont
                {...props}
              />
            )}
        />
     
      </Router>
    </div>
    )
  }
  
}

