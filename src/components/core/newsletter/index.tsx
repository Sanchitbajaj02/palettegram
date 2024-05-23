"use client";
import React from "react";
import { Linkedin, Facebook ,Twitter , Instagram  } from 'lucide-react';

const Newsletter: React.FC = () => {
    return <div className="w-full ">
        <div className="flex flex-col justify-center items-center  gap-6 px-20 py-10 ">
            <h4 className="text-xs uppercase">Newsletter</h4>
            <h2  className="text-xs md:text-base uppercase text-primary-light text-center">Sign up for latest updates and offers</h2>
            <div className="flex flex-col gap-4 md:flex-row">
                <input type="text" placeholder="Email Address" className="bg-white text-black py-1 px-3" ></input>
                <button className=" bg-primary py-1 px-3 " >Subscribe</button>
            </div>
            <h5 className="text-xs text-gray-300 text-center">Will be used in accordance with our policy</h5>
            <div className="flex gap-6" >
                <Linkedin size={20} />
                <Facebook size={20} />
                <Twitter size={20} />
                <Instagram size={20}/>
            </div>
        </div>
    </div>;
};

export default Newsletter;