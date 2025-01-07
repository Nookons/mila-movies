import React, {useEffect, useState} from 'react';
import PopularDisplay from "./Popular/PopularDisplay";


export interface IGenre {
    id: number;
    name: string;
}

const Home = () => {

    useEffect(() => {
        const offset = localStorage.getItem("scroll_offset");

        if (offset && !isNaN(Number(offset)) && Number(offset) > 0) {
            const checkHeightAndScroll = () => {
                const pageHeight = document.documentElement.scrollHeight;

                if (pageHeight > Number(offset)) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: Number(offset),
                            behavior: 'smooth',
                        });
                    }, 250)
                } else {
                    requestAnimationFrame(checkHeightAndScroll);
                }
            };
            checkHeightAndScroll();
        }
    }, []);

    return (
        <>
            <PopularDisplay/>
        </>
    )
};

export default Home;