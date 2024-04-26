import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
    const blogVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Blog Recommendations</h1>
            <p className="text-lg text-gray-600 mb-8">Check out these amazing blog posts!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div
                    className="bg-white rounded-lg shadow-md p-4"
                    variants={blogVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xl font-bold mb-2">Blog Post 1</h2>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
                <motion.div
                    className="bg-white rounded-lg shadow-md p-4"
                    variants={blogVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
                >
                    <h2 className="text-xl font-bold mb-2">Blog Post 2</h2>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
                <motion.div
                    className="bg-white rounded-lg shadow-md p-4"
                    variants={blogVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-xl font-bold mb-2">Blog Post 3</h2>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
