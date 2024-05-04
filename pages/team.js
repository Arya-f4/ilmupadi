import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './components/Footer';
import Container from './components/Container';
import { motion } from 'framer-motion'; // Menambahkan import motion dari framer-motion
import Image from 'next/image';
import { teamData } from '../database/teamData';
import ProfileCard from './components/profilecard';

const Team = () => {
  const [loading, setLoading] = useState(true); // Menambahkan state loading
  const [ToggleCard, setToggleCard] = useState(false);
  const handleCardClick = (index) => {
    setToggleCard(index);
  };

  return (
    <div className="bg-skin-gray ">
      <Head>
        <title>team - Software House</title>
        <meta
          name="description"
          content="Arunika Niskala Software House adalah software house dibawah naungan Himpunan Mahasiswa D4 Teknik Informatika"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container className="flex-wrap flex-auto pt-28 md:pt-24 bg-skin-gray">
        <div className="text-4xl md:text-6xl my-4 font-bold text-black text-center">team</div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamData.map((team, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-amber-100 dark:bg-trueGray-800 p-4 hover:border-black hover:border-2 rounded-2xl shadow-md flex items-center"
              onClick={() => handleCardClick(index)}
            >
              <Image
                src={team.image}
                alt={`team ${index + 1}`}
                width={1000}
                height={1000}
                className="rounded-full w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 object-cover"
              />
              <div className="text-base font-bold md:text-lg ml-4">
                {team.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {ToggleCard !== false && <ProfileCard team={teamData[ToggleCard]} onClose={() => setToggleCard(false)} />}
      </Container>
      <Footer />
      {/* Display blogData in the component */}
    </div>
  );
};

export default Team;