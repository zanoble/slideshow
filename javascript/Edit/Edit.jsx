'use strict'
import React, { Component } from 'react'
import EditView from './EditView.jsx'
import NavBar from './NavBar.jsx'
import SlidesView from './SlidesView.jsx'

export default class Edit extends Component {
  constructor() {
    super()

    this.state = {
      currentSlide: 0,
      id: -1,
      content: [
        {
          saveContent: undefined,
          id: 0
        },
      ]
    }


    this.save = this.save.bind(this)
    this.load = this.load.bind(this)
    this.setCurrentSlide = this.setCurrentSlide.bind(this)
    this.addNewSlide = this.addNewSlide.bind(this)
    this.deleteCurrentSlide = this.deleteCurrentSlide.bind(this)
    this.renameCurrentSlide = this.renameCurrentSlide.bind(this)
    this.saveContentState = this.saveContentState.bind(this)
  }

  componentDidMount() {
    this.load()
  }

  save() {
    $.ajax({
      url: './slideshow/Show/' + window.sessionStorage.getItem('id'),
      data: {content: this.state.content},
      type: 'put',
      dataType: 'json',
      success: function() {
        this.load();
      }.bind(this),
      error: function(req, err) {
        alert("Failed to save show " + window.sessionStorage.getItem('id'))
        console.error(req, err.toString());
      }.bind(this)
    });
  }


  load() {
    $.ajax({
      url: './slideshow/Show/edit/?id=' + window.sessionStorage.getItem('id'),
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        let loaded = data['slides']
        if (loaded != null) {
          this.setState({
            content: loaded,
            id: data['id']
          });
        }
      }.bind(this),
      error: function(req, err) {
        alert("Failed to load data.")
        console.error(req, err.toString());
      }.bind(this)
    });
  }


  setCurrentSlide(val) {
    this.setState({
      currentSlide: val
    })
  }


  addNewSlide() {
    // This function adds to the stack of slides held within state.content
    const index = this.state.currentSlide + 1
    const newSlide = {
        saveContent: undefined
    }
    let copy = [...this.state.content]
    copy.splice(index, 0, newSlide)
    this.setState({
      content: copy,
      currentSlide: index
    })
  }


  deleteCurrentSlide() {
    let copy = [...this.state.content]
    let newIndex = this.state.currentSlide
    // splice one slide at the current index
    copy.splice(this.state.currentSlide, 1)
    // Current slide is the first slide and there are no other slides
    if (this.state.currentSlide === 0 && this.state.content.length == 1) {
      // set the array to an empty slide
      copy = [{saveContent: undefined}]
    }
    // If we are deleting the last slide
    if (this.state.currentSlide == copy.length) {
      newIndex = this.state.currentSlide - 1
    }

    this.setState({
      content: copy,
      currentSlide: newIndex
    })
  }


  renameCurrentSlide(value) {
    alert("This has not yet been implemented")
  }


  saveContentState(saveContent) {
    this.state.content[this.state.currentSlide].saveContent = saveContent
  }


  render() {
    return (
      <div>
        <NavBar
          save={this.save}
          id={this.state.id}
          insertSlide={this.addNewSlide}
          deleteSlide={this.deleteCurrentSlide}
          renameSlide={this.renameCurrentSlide}
          addToStack ={this.addToStack}
          currentSlide={this.state.currentSlide}/>
        <div className="row">
          <SlidesView
            slides          ={this.state.content}
            currentSlide    ={this.state.currentSlide}
            setCurrentSlide ={this.setCurrentSlide}
            addNewSlide     ={this.addNewSlide}/>
          <EditView
            currentSlide={this.state.currentSlide}
            content={this.state.content[this.state.currentSlide]}
            deleteElement={this.deleteFromStack}
            saveContentState={this.saveContentState}/>
        </div>
      </div>
    )
  }
}
