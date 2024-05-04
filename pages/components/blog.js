import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import Link from "next/link";

const Blog = () => {
  const blogVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (blogId) => {
      try {
        const response = await fetch("/api/getblog?get=1");
        const data = await response.json();
        setBlogData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Blog Recommendations</h1>
      <p className="text-lg text-gray-600 mb-8">Check out these amazing blog posts!</p>
      <Container>
        <div className="grid grid-cols-1 gap-4">
          {blogData &&
            blogData.map((blog) => (
              <Link href={`/blog/${blog.id}`} className="flex items-start">
                <motion.div
                  key={blog.id}
                  className="bg-skin-gray border border-black rounded-lg shadow-md p-4"
                  variants={blogVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <motion.img
                    src={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${blog.data.header_image.split("/").pop()}?alt=media`}
                    alt={blog.data.name}
                    className="hover:cursor-pointer border-2 border-black w-1/4 h-auto rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    width={100}
                    height={100}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <h3 className="text-2xl font-semibold mb-2 md:text-4xl lg:text-6xl">
                    {blog.data.name}
                  </h3>
                  <div className="mt-4">
                    {blog.data.content.map((content, index) => (
                      <div key={index} id='content'>
                        {content.type === 'text' && (
                          <Markdown components={{
                            h1: ({ node, ...props }) => <div className="text-4xl left-0 font-bold " {...props} />,
                            h2: ({ node, ...props }) => <div className="text-3xl font-bold  text-gray-950" {...props} />,
                            h3: ({ node, ...props }) => <div className="text-2xl font-bold  text-gray-900" {...props} />,
                            h4: ({ node, ...props }) => <div className="text-xl font-bold  text-gray-850" {...props} />,
                            h5: ({ node, ...props }) => <div className="text-lg font-bold  text-gray-800" {...props} />,
                            h6: ({ node, ...props }) => <div className="text-md font-bold  text-gray-750" {...props} />,
                            p: ({ node, ...props }) => <div className="text-base text-gray-600 " {...props} />,
                            code: ({ node, ...props }) => <div className='p-4 card rounded-2xl mt-4 bg-trueGray-950 overflow-auto'><code className='text-xs text-yellow-500 text-left rounded-md' {...props} /></div>,
                            img: ({ node, ...props }) => <img {...props} className="w-full h-auto rounded-md mx-auto" />
                          }} remarkPlugins={[remarkGfm]}>{content.value}</Markdown>
                        )}
                        {content.type === 'images' && content.value.map((image, imgIndex) => (
                          <img key={imgIndex} src={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${encodeURIComponent(image.split('/').pop())}?alt=media`} alt="Blog Image" className="w-full md:w-1/2 lg:w-1/3 rounded-md mx-auto my-4" />
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;