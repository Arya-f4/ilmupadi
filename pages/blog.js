import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './components/Footer';
import Container from './components/Container';
import { motion } from 'framer-motion'; // Menambahkan import motion dari framer-motion

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true); // Menambahkan state loading
  const timeOptions = [
    { label: 'All Time', value: null },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' },
  ];
  const [sortingOption, setSortingOption] = useState('latest'); // Adding state for sorting option

  useEffect(() => {
    const fetchData = async (blogId) => {
      try {
        const response = await fetch('/api/getblog');
        const data = await response.json();
        setBlogData(data);
        setLoading(false); // Mengubah loading menjadi false setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false); // Mengubah loading menjadi false jika terjadi error
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async (blogId) => {
      try {
        const response = await fetch('/api/getblog');
        const data = await response.json();
        setBlogData(data);
        setLoading(false); // Mengubah loading menjadi false setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false); // Mengubah loading menjadi false jika terjadi error
      }
    };

    fetchData();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filteredBlogData = selectedTag ? blogData.filter(blog => blog.data.tags.includes(selectedTag)) : blogData;

  // Sort the filtered blog data based on the selected sorting option
  let sortedFilteredBlogData = [];
  if (sortingOption === 'latest') {
    sortedFilteredBlogData = filteredBlogData && filteredBlogData.sort((a, b) => b.data.publish_date.seconds - a.data.publish_date.seconds);
  } else {
    sortedFilteredBlogData = filteredBlogData && filteredBlogData.sort((a, b) => a.data.publish_date.seconds - b.data.publish_date.seconds);
  }

  return (
    <div className='h-screen bg-skin-gray'>
      <Head>
        <title>Blog - Consume Care</title>
        <meta
          name="description"
          content="Consume Care blog merupakan tempat untuk membaca artikel-artikel terbaru seputar dunia konsumsi."
        />


        <link rel="canonical" href="https://consumecare.site/blog/" />
        <meta
          name="og:title"
          content='Blog Post Consume Care'
        />
        <meta
          name='og:description'
          content='Detail blog post page with specific content'
        />
        <meta
          name='og:url'
          content='https://consumecare.site/blog/'
        />
        <meta
          name='og:type'
          content='article'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content="postingan consume care" />
        <meta name='twitter:description' content="Detail blog post page with specific content" />
        <meta name='twitter:url' content="https://consumecare.site/blog" />
        <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="author" content="Consume Care" />




        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className='h-fit bg-skin-gray'>

        <Container className="h-full bg-skin-gray flex flex-wrap pt-24 ">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-4xl my-4 font-bold leading-snug text-center'>Blog Page</motion.h1>
          <div className="right mt-10 ml-10">
            <div className="flex items-center bg-skin-gray rounded-full px-3 py-1">
              <span className="text-sm font-semibold mr-2">Filter by Tag:</span>
              <select
                className="outline-none bg-transparent"
                value={selectedTag}
                onChange={(e) => handleTagClick(e.target.value)}
              >
                <option value="">All</option>
                {blogData &&
                  [...new Set(blogData.flatMap((blog) => blog.data.tags))].map(
                    (tag, index) => (
                      <option key={index} value={tag} className="bg-skin-gray">
                        {tag}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="flex items-center bg-skin-gray rounded-full px-3 py-1 mt-4">
              <span className="text-sm font-semibold mr-2">Sort by:</span>
              <button
                className={`border rounded-2xl border-gray-700 text-gray-700 p-2   ${sortingOption === 'latest' ? 'border' : 'bg-amber-200 border rounded-2xl border-gray-700 text-gray-700 p-2 '}`}
                onClick={() => setSortingOption('latest')}
              >
                Latest
              </button>
              <button
                className={`border rounded-2xl border-gray-700 text-gray-700 p-2  ${sortingOption === 'oldest' ? 'border' : 'bg-amber-200 border rounded-2xl border-gray-700 text-gray-700 p-2 '}`}
                onClick={() => setSortingOption('oldest')}
              >
                Oldest
              </button>
            </div>
          </div>
          {loading ? ( // Menampilkan "loading content" saat loading
            <div className='h-screen flex items-center justify-center'>
              <motion.div
                className='flex items-center'
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className='w-8 h-8 border-4 border-t-4 border-gray-700 rounded-full mx-2'
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className='w-8 h-8 border-4 border-t-4 border-gray-700 rounded-full mx-2'
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                  className='w-8 h-8 border-4 border-t-4 border-gray-700 rounded-full mx-2'
                ></motion.div>
              </motion.div>
            </div>
          ) : (
            sortedFilteredBlogData && sortedFilteredBlogData.map((blog) => (

              <motion.div key={blog.id} className="bg-skin-gray p-4 my-4 rounded-lg shadow-md ml-4 mr-4 hover:border-black hover:border-2 hover:bg-skin-gray-200 hover:cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                style={{ x: 100 }}
              >

                <div className="flex items-start">
                  <Link href={`/blog/${blog.id}`} className="flex items-start">
                    <motion.img src={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${blog.data.header_image.split('/').pop()}?alt=media`} alt={blog.data.header_image}
                      className="hover:cursor-pointer w-1/4 h-auto rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      width={100}
                      height={100}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      title='Consume Care Image'
                    />
                    <div className="flex flex-col items-start ml-4">

                      <h2 className="text-xl font-bold mt-2 hover:cursor-pointer">{blog.data.name}</h2>

                      <p className="text-gray-600">Dipublikasikan pada {new Date(blog.data.publish_date.seconds * 1000).toLocaleDateString()}</p>


                    </div>
                  </Link>
                  <div className="mt-2">
                    Tags: {blog.data.tags.map((tag, index) => (
                      <span key={index} onClick={() => handleTagClick(tag)} className="border-slate-900 hover:bg-amber-100 hover:cursor-pointer inline-block bg-skin-gray border-2 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </Container >



        <Footer />
      </div>
      {/* Display blogData in the component */}
    </div>
  );
};

export default Blog;