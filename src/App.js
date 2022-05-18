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
      imageUrl: "",
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const imageWidth = image.width;
    const imageHeight = image.height;
    return {
      topRow : clarifaiFaceData.top_row * imageHeight,
      bottomRow : imageHeight - (clarifaiFaceData.bottom_row *  imageHeight),

      leftCol : clarifaiFaceData.left_col * imageWidth,
      rightCol : imageWidth - (clarifaiFaceData.right_col * imageWidth)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then( response => this.displayFaceBox( this.calculateFaceLocation(response)) )
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
        <FaceDetection
        imageUrl={this.state.imageUrl}
        box = {this.state.box}
        />
      </div>
    );
  }
}

export default App;
