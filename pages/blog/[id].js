import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Menambahkan import untuk Markdown
import { createRoot } from 'react-dom'; // Mengubah import untuk createRoot
import Footer from '../components/Footer';
import Container from '../components/Container';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Menambahkan import motion dari framer-motion
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../../config/firebaseConfig';

const DetailedBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogData, setBlogData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`../api/getblog?id=${id}`);
      const data = await response.json();
      setBlogData(data);

      if (data && data.length > 0) {
        const headerImage = data[0].data.header_image;
        if (headerImage && !imageUrl && !loadingImage) {
          setLoadingImage(true);
          const storage = getStorage();
          const imageRef = ref(storage, `${headerImage}`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
          setLoadingImage(false);
          setLoadingData(true);
        }
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      // Jika gagal, panggil fetchData lagi setelah jeda
      setTimeout(fetchData, 1000); // Atur jeda 1 detik sebelum mencoba lagi
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id], [imageUrl], [loadingImage]);

  return (
    <div className='h-full bg-skin-gray'>
      <Head>

        {blogData && blogData.map((blog) => (
          <>
            <title>{blog.data.name}</title>
            <link rel="canonical" href={`https://consumecare.site/blog/${blog.id}`} />
            <link rel="alternate" type='application/json' href={`https://consumecare.site/api/getblog?id=${blog.id}`} />
            <meta
              name="description"
              content={blogData ? blog.data.description : 'Detail blog post page with specific content'}
            />
             <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="author" content="Consume Care" />
            <meta
              name="og:title"
              content={blogData ? blog.data.name : 'Blog Post'}
            />
            <meta
              name='og:description'
              content={blogData ? blog.data.description : 'Detail blog post page with specific content'}
            />
            <meta
              name='og:url'
              content={`https://consumecare.site/blog/${blog.id}`}
            />
            <meta
              name='og:image'
              content={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${(blog.data.header_image.split('/').pop())}?alt=media`}
            />
            <meta
              name='og:type'
              content='article'
            />
            <meta name='og:updated_time' content={new Date(blog.data.created_on.seconds * 1000).toISOString()} />
            <meta name='og:published_time' content={new Date(blog.data.publish_date.seconds * 1000).toISOString()} />
            <meta name='article:published_time' content={new Date(blog.data.publish_date.seconds * 1000).toISOString()} />
            <meta name='article:updated_time' content={new Date(blog.data.created_on.seconds * 1000).toISOString()} />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={blog.data.name} />
            <meta name='twitter:description' content={blog.data.description} />
            <meta name='twitter:url' content={`https://consumecare.site/blog/${blog.id}`} />

            <link rel="icon" href="/favicon.ico" />
          </>
        ))}
      </Head>
      <Navbar />
      {loadingData ? (



        blogData && blogData.map((blog, index) => (
          // eslint-disable-next-line react/jsx-key
          <motion.div className='bg-skin-gray h-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container Name="flex flex-wrap">
              <div key={blog.id} className="drop-shadow-lg container mx-auto p-4 py-12 md:py-16 dark:bg-trueGray-800 rounded-2xl"> {/* Menambahkan dark mode */}
                <h1 className="text-2xl font-bold text-blue-600 mb-4">{blogData.title}</h1>
                <div className="bg-skin-gray p-4 border border-black dark:bg-trueGray-800 my-4 rounded-lg text-left"> {/* Menengahkan gambar */}
                  {imageUrl && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      width={300}
                      height={300}
                      src={imageUrl}
                      alt={blogData.header_image}
                      className="w-1/2 h-auto mx-auto"
                    />
                  )} <div className="flex-col items-start ml-4  ">
                    <div className="text-4xl font-bold mt-2">{blog.data.name}</div>
                    <div className="text-gray-600 mt-4">Dipublikasikan pada {new Date(blog.data.publish_date.seconds * 1000).toLocaleDateString()}</div>
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
                              code: ({ node, ...props }) => <Image width={500} height={500} alt={"Consume care image"} className='p-4 card rounded-2xl mt-4 bg-trueGray-950 overflow-auto'><code className='text-xs text-yellow-500 text-left rounded-md' {...props} /></Image>,
                              img: ({ node, ...props }) => <Image {...props} width={500} height={500} alt='secondary image' className="w-full h-auto rounded-md mx-auto" />
                            }} remarkPlugins={[remarkGfm]}>{content.value}</Markdown>
                          )}
                          {content.type === 'images' && content.value.map((image, imgIndex) => (

                            <Image
                              key={imgIndex}
                              width={300}
                              height={300}
                              src={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${(image.split('/').pop())}?alt=media`}
                              alt="Blog Image"
                              className="w-full md:w-1/2 lg:w-1/3 rounded-md mx-auto my-4" />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      Tags: {blog.data.tags.map((tag, index) => (
                        <span key={index} className="hover:bg-gray-300 hover:cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mt-2">{blogData.title}</h2>
                  <p className="mb-4">{blogData.content}</p>
                  <div className="flex flex-wrap">
                    {blogData && blogData.tags && blogData.tags.map((tag, index) => (
                      <span key={index} className="inline-block dark:bg-gray-800 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold dark:text-gray-500 text-gray-700 mr-2">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        ))


      ) : (
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

      )}



      <Footer />

    </div>
  );
}

export default DetailedBlog;



