import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { IMAGES_URL } from "./constants/constants";

const App = () => {
  const [images, setImages] = useState([]);

  // Fetch images from the backend when the component mounts
  useEffect(() => {
    fetchImages();

    // Async function to fetch images from the backend and set the images state
    async function fetchImages() {
      const response = await fetch(IMAGES_URL);
      const data = await response.json();
      setImages(data);
      console.log(data);
    }
  }, []);

  return (
    <div>
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image.filename}>
            <Image
              src={`${IMAGES_URL}/${image.filename}`}
              style={{ maxWidth: "50%" }}
              rounded
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
