import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceDetection from './Components/FaceDetection/FaceDetection';

const app = new Clarifai.App({
  apiKey: '194cff41b4844a57a5177c42a1a3654b'
 });


class App extends Component {
  constructor(){
    super();
    this.state ={
      input: "",
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then( response => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceDetection imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
