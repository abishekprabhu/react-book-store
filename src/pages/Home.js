import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import { asset } from "../assets/asset";

const Home = () => {
  const card_items = [
    {
      src: asset["carousel_image_1"],
      alt: "First Card",
      title: "Advertising Books",
      caption: "My Top 16 Advertising Books in 2024",
    },
    {
      src: asset["carousel_image_2"],
      alt: "Second Card",
      title: "Marketing Books",
      caption: "125 Books Every Marketer Should Read",
    },
    {
      src: asset["carousel_image_3"],
      alt: "Third Card",
      title: "Productivity Books",
      caption: "Productivity Books to Read in 2023",
    },
  ];

  return (
    <>
      <div className="text-center">
        <h1 className="text-secondary fs-4">Welcome to E-Book Store</h1>
      </div>

      <ImageCarousel />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">Explore our collection of books!</p>
          </div>

          {card_items.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={item.src} className="card-img-top" alt={item.alt} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
