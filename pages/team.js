import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/footer';
import Container from '../components/container';
import { motion } from 'framer-motion'; // Menambahkan import motion dari framer-motion
import Image from 'next/image';
import { teamData } from '../database/teamData';
import ProfileCard from '../components/profilecard';
const Staff = () => {

  const [loading, setLoading] = useState(true); // Menambahkan state loading
  const [ToggleCard, setToggleCard] = useState(false);
  const handleCardClick = (index) => {
    setToggleCard(index);
  };

  return (
    <>
      <Head>
        <title>Staff - Software House</title>
        <meta
          name="description"
          content="Arunika Niskala Software House adalah software house dibawah naungan Himpunan Mahasiswa D4 Teknik Informatika"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container className="flex-wrap flex-auto pt-24 md:pt-32">
        <h1 className='text-6xl my-4 font-bold text-blue-600 text-center'>Staff</h1>
        <motion.div className="grid grid-cols-3 gap-5">
          {staffData.map((staff, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-gray-200 dark:bg-trueGray-800 p-4 hover:border-blue-600 hover:border-2 rounded-2xl shadow-md flex items-center" // Add flex and items-center classes
              onClick={() => handleCardClick(index)}
            >
              <Image
                src={staff.image}
                alt={`Staff ${index + 1}`}
                width={1000}
                height={1000}
                className="rounded-full w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 object-cover"
              />
              <div className='text-base font-bold md:text-lg ml-4'>
                {staff.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {ToggleCard !== false && <ProfileCard staff={staffData[ToggleCard]} onClose={() => setToggleCard(false)} />}
      </Container>
      <Footer />
      {/* Display blogData in the component */}
    </>
  );
};

export default Staff;