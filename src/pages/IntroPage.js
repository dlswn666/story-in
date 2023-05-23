import React from 'react';
import '../css/introPageStyle.css';
import { Link } from 'react-router-dom';

class IntroPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      images: [
        '/images/introImage1.jpg',
        '/images/introImage2.jpg',
        '/images/introImage3.jpg',
        '/images/introImage4.jpg',
        '/images/introImage5.jpg',
      ],
    };
  }

  componentDidMount() {
    this.imageInterval = setInterval(this.changeImage, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
  }

  changeImage = () => {
    this.setState((prevState) => ({
      imageIndex: (prevState.imageIndex + 1) % prevState.images.length,
    }));
  };

  render() {
    const { imageIndex, images } = this.state;
    const imageStyle = {
      backgroundImage: `url(${images[imageIndex]})`,
    };

    return (
      <div className="intro-page">
        <div className="intro-image-container">
          <div className="intro-image" style={imageStyle} />
          <Link to="/main" className="intro-text">storyIn</Link>
        </div>
      </div>
    );
  }
}

export default IntroPage;