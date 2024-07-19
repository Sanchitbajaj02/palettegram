"use client";
import React, { useState } from "react";
import emailjs from 'emailjs-com';
// import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { ButtonLong } from "../buttons/index";

const Newsletter: React.FC = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // const { name , value } = e.target ;
  //   setSubscriberEmail(e.target.value);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const templateParams={
      from_name:"PaletteGram",
      subject:"Welcome to PaletteGram Newsletter!",
      email_id:subscriberEmail,
      message:"Thank you for subscribing to our newsletter. We will keep you updated with our latest offers and updates.",
    }

    emailjs.send("service_7lb51ka","template_njg2wcp",templateParams,"-OBmWZjadmE1odXKm")
    .then((response)=>{
      console.log("email sent",response)
      setSubscriberEmail("");
    })
    .catch((err)=>{
      console.log("error",err)
    })

    // endpoint for appwrite backend
  };

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col justify-center items-center gap-6 px-4 md:px-16 py-8">
      <h4 className="text-xs md:text-lg uppercase">Newsletter</h4>
      <h2 className="text-xs md:text-xl uppercase text-primary-light text-center">
        Sign up for latest updates and offers
      </h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 md:flex-row">
        <input
          onChange={(e)=>setSubscriberEmail(e.target.value)}
          name="subscriberEmail"
          type="email"
          placeholder="Email Address"
          className="w-full bg-white text-black border border-black py-1 px-3 rounded"
        />
        <ButtonLong type="submit" size="normal">
          Subscribe
        </ButtonLong>
      </form>
      <h5 className="text-xs md:text-base text-gray-300 text-center">
        Will be used in accordance with our policy
      </h5>
      {/* <div className="flex gap-6">
        <Linkedin size={20} />
        <Facebook size={20} />
        <Twitter size={20} />
        <Instagram size={20} />
      </div> */}
    </div>
  );
};

export default Newsletter;
