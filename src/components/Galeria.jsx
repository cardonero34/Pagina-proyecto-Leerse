import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "../stylesheets/Galeria.css";
import personaje1 from "../assets/personaje/1.jpg";
import personaje2 from "../assets/personaje/2.jpg";
import personaje3 from "../assets/personaje/3.jpg";
import personaje4 from "../assets/personaje/4.jpg";
import personaje5 from "../assets/personaje/5.jpg";
import personaje6 from "../assets/personaje/6.jpg";

export const Galeria = () => {
    const galleryRef = useRef(null);

    const images = [
        personaje1,
        personaje2,
        personaje3,
        personaje4,
        personaje5,
        personaje6,
    ];

    useLayoutEffect(() => {
        const items =
            galleryRef.current.querySelectorAll(".gallery-item");

        const clickedState = new Array(items.length).fill(false);

        const expand = (item, index) => {
            clickedState.forEach((_, i) => {
                if (i !== index) {
                    clickedState[i] = false;
                }
            });

            const isClicked = clickedState[index];

            gsap.to(items, {
                width: isClicked ? "12rem" : "7rem",
                duration: 2.5,
                ease: "elastic(1, .3)",
            });

            clickedState[index] = !isClicked;

            gsap.to(item, {
                width: clickedState[index] ? "20rem" : "12rem",
                duration: 2.5,
                ease: "elastic(1, .3)",
            });
        };

        items.forEach((item, index) => {
            const handleClick = () => {
                expand(item, index);
            };

            item.addEventListener("click", handleClick);

            item._handleClick = handleClick;
        });

        return () => {
            items.forEach((item) => {
                item.removeEventListener(
                    "click",
                    item._handleClick
                );
            });

            gsap.killTweensOf(items);
        };
    }, []);

    return (
        <section
            ref={galleryRef}
            className="galeria-section "
        >
            <div className="galeria-group">

                {images.map((image, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                ))}

            </div>
        </section>
    );
};