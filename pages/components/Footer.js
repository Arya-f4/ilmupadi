import React from "react";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import Container from "./Container";
import Image from "next/image";
const Footercomponent = () => {
  return (
      <Container>
        <div className="w-full bg-skin-gray">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Image 
              src={`/bigfav.png`}
              width={500}
              height={500}
              className="w-16 h-16"
              />

            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <div title="Follow us" />
              <div col>
                <div href="https://www.instagram.com/consumecare">Instagram</div>
                <div href="#">Github</div>
              </div>
            </div>
            <div>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
    
    <div className="mt-4 space-y-2 sm:mt-0 sm:justify-center">
      <Footer.Icon href="https://www.instagram.com/consumecare/" icon={BsInstagram} />
      <Footer.Icon href="#" icon={BsGithub} />  
   </div>
  </div>
            </div>
          </div>
      
          </div>
          
         
       </div>
      </Container>
  );
};

export default Footercomponent;
