import React from 'react';
import Footercomponent from './components/Footer';
import Navbar from './components/navbar';
import { motion } from 'framer-motion'; // Import framer-motion untuk animasi
import Head from 'next/head'; // Import Head dari next/head untuk mengubah title dan meta tag
const AboutPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } }
    };

    return (
        <div className='bg-skin-gray'>
            <Head>
                <title>About - Consume Care</title>
                <meta
                    name="description"
                    content="Consume Care merupakan tempat untuk membaca artikel-artikel terbaru seputar dunia konsumsi."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <motion.div
                className="flex flex-col items-center justify-center h-screen bg-skin-gray"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-4xl font-bold mb-4">Consume Care</div>
                <p className="text-lg text-center max-w-md">
                    Consume Care adalah sekumpulan kelompok Pembelajaran Dasar Bersama dari Universitas Airlangga yang berambisi untuk membuat para generasi muda untuk tidak konsumtif.
                </p>
                <p className="text-lg text-center mt-4 max-w-lg">
                    Kami berusaha menyediakan berbagai Informasi, dan materi edukatif yang dapat membantu mahasiswa dan masyarakat umum untuk lebih memahami pentingnya pengelolaan keuangan yang baik dan bijak.
                </p>
                <p className="text-lg text-center mt-2 max-w-lg">
                    Bergabunglah dengan kami dalam perjalanan ini untuk menciptakan masa depan yang lebih baik dan berkelanjutan bagi generasi yang akan datang.
                </p>
            </motion.div>
            <Footercomponent />
        </div>
    );
};

export default AboutPage;