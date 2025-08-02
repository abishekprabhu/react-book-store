import React from "react";
import { Carousel } from "react-bootstrap";
import { asset } from "../assets/asset";

const ImageCarousel = () => {
  const carouselItems = [
    {
      src: asset["carousel_image_1"],
      alt: "First Slide",
      caption: "My Top 16 Advertising Books",
    },
    {
      src: asset["carousel_image_2"],
      alt: "second Slide",
      caption: "125 Books Every Marketer Should Read",
    },
    {
      src: asset["carousel_image_3"],
      alt: "Third Slide",
      caption: "Productivity Books to Read in 2023",
    },
    {
      src: asset["carousel_image_4"],
      alt: "Forth Slide",
      caption: "Business Strategy Books to Read in 2023",
    },
    {
      src: asset["carousel_image_5"],
      alt: "Fifth Slide",
      caption: "Top 10 Books for Entrepreneurs",
    },
  ];

  return (
    <div className="container mt-4">
      <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              src={item.src}
              alt={item.alt}
              className="d-block mx-auto"
              style={{ width: "900px", height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h2 className="text-dark bg-light">{item.caption}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
