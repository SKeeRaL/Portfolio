import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./Slider.css";

function slider () {
    const baseUrl = "https://react-responsive-carousel.js.org/assets/"
    const datas = [
        {
            id:1,
            image: `${baseUrl}1.jpeg`,
            title: "slider1",
            Text: "slider1"
        },
        {
            id:2,
            image: `${baseUrl}2.jpeg`,
            title: "slider2",
            Text: "slider2"
        },
        {
            id:3,
            image: `${baseUrl}3.jpeg`,
            title: "slider3",
            Text: "slider3"
        }
    ]
    return <Carousel
    autoPlay
    interval={6000}
    infiniteLoop
    thumbWidth={120}
    showIndicators={false}
    showStatus={false}
    >
        {datas.map((slide) => (
            <div key={slide.id}>
                <img src={slide.image} alt={slide.title} />
                <div className="overlay">
                <h2> {slide.title}</h2>
                <p className="legend">{slide.Text}</p>
                </div>
            </div>
        ))}
    </Carousel>
}

export default slider;