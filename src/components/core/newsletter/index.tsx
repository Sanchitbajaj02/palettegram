"use client";
import React , { useState } from "react";
import { Linkedin, Facebook ,Twitter , Instagram  } from 'lucide-react';
import { ButtonLong } from "../buttons/index";

const Newsletter: React.FC = () => {
    const [ subscriberEmail , setSubscriberEmail ] = useState('');

    const handleChange = ( e : React.ChangeEvent<HTMLInputElement> )=>{
        // const { name , value } = e.target ;
        setSubscriberEmail(e.target.value);
    }
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("clicked subscribe button ");


        // endpoint for appwrite backend

    }

    return <div className="w-full ">
        <div className="flex flex-col justify-center items-center  gap-6 px-20 py-10 ">
            <h4 className="text-xs md:text-lg uppercase">Newsletter</h4>
            <h2  className="text-xs md:text-xl uppercase text-primary-light text-center">Sign up for latest updates and offers</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
                <input onChange={handleChange} name="subscriberEmail" type="text" placeholder="Email Address" className="bg-white text-black border border-black py-1 px-3" ></input>
                {/* <button className=" bg-primary py-1 px-3 " >Subscribe</button> */}
                <ButtonLong type="submit"  size="normal">Subscribe</ButtonLong>
            </form>
            <h5 className="text-xs md:text-base text-gray-300 text-center">Will be used in accordance with our policy</h5>
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