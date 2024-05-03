import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { motion } from "framer-motion";
const Hero = () => {
return (
    <>
        <Container className="flex flex-wrap pt-36">
            <div className="flex items-center w-full lg:w-1/2 bg-">
                <div className="max-w-2xl mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight"
                    >
                        Consume Care Test Assesment Konsumsi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="py-5 text-xl leading-normal text-gray-600 lg:text-xl xl:text-2xl"
                    >
                        Sebuah Website yang menyediakan layanan Informasi dan Test Assesment tentang Konsumsi anda!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row"
                    >
                        <Link
                            href="quiz"
                            className="z-0 px-8 py-4 text-lg font-medium text-center text-white bg-skin-main hover:bg-green-950 rounded-md"
                        >
                            Coba Test Assesment Konsumsi anda!
                        </Link>
                        
                    </motion.div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2">
                <Image
                src={`/fav.jpg`}
                height={400}
                width={400}
                />
            </div>
        </Container>
        <Container>
            <div className=" flex flex-col justify-center">
                
                <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
                    <div className="pt-2 text-gray-400 dark:text-gray-400">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                           
                        </motion.div>
                    </div>
                </div>
            </div>
        </Container>
    </>
);
}

export default Hero;
