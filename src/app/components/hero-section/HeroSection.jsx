"use client";

import Image from 'next/image';
import { useState } from 'react';

const ImageWithBackgroundText = () => {
    const [imageSrc] = useState('/Sport Shoes.png');
    const altText = 'Shoe Image';
    const backgroundText = 'SHOP ALL';
    return (
        <div className="relative flex items-center justify-center h-[400px] w-full mt-16 bg-white">
            {/* Background text: Adjust font size for responsiveness and keep centered */}
            <div className="absolute inset-0 flex justify-center items-center z-0">
                <span className="text-gray-300 text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9rem] font-extrabold tracking-wider select-none text-center">
                    {backgroundText}
                </span>
            </div>

            {/* Shoe image with custom bounce animation, centered for mobile and larger devices */}
            <div className="relative z-10 animate-custom-bounce flex justify-center items-center">
                <Image
                    src={imageSrc}
                    alt={altText}
                    width={752}
                    height={523}
                    className="w-full max-w-[250px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[752px]"
                />
            </div>
        </div>
    );
};

export default ImageWithBackgroundText;
