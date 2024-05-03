import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Menambahkan import untuk Markdown
import { createRoot } from 'react-dom'; // Mengubah import untuk createRoot
import Footer from '../components/Footer';
import Container from '../components/Container';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion'; // Menambahkan import motion dari framer-motion
const DetailedBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogData, setBlogData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`../api/getblog?id=${id}`); // Mengambil data dari direktori api dengan menggunakan 'id' sebagai parameter
        const data = await response.json();
        setBlogData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  console.log(blogData)


  return (
    <div className='h-full bg-skin-gray'>
      <Head>
        <title>{blogData ? blogData.name : 'Detail Blog Post'}</title>
        <meta
          name="description"
          content={blogData ? blogData.description : 'Detail blog post page with specific content'}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {blogData && blogData.map((blog) => (
        <motion.div className='bg-skin-gray h-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Container Name="flex flex-wrap">
            <div className="drop-shadow-lg container mx-auto p-4 py-12 md:py-16 dark:bg-trueGray-800 rounded-2xl"> {/* Menambahkan dark mode */}
              <h1 className="text-2xl font-bold text-blue-600 mb-4">{blogData.title}</h1>
              <div className="bg-skin-gray p-4 border border-black dark:bg-trueGray-800 my-4 rounded-lg text-left"> {/* Menengahkan gambar */}
                <img src={`https://firebasestorage.googleapis.com/v0/b/consume-care.appspot.com/o/images%2F${blog.data.header_image.split('/').pop()}?alt=media`} alt={blog.data.name} className="w-1/2 drop-shadow-xl border-black h-auto rounded-md mx-auto" /> {/* Menengahkan gambar */}
                <div className="flex-col items-start ml-4  ">
                  <h2 className="text-4xl font-bold mt-2">{blog.data.name}</h2>
                  <p className="text-gray-600 mt-4">Dipublikasikan pada {new Date(blog.data.publish_date.seconds * 1000).toLocaleDateString()}</p>
                  <div className="mt-4">
                    {blog.data.content.map((content, index) => (
                      <div key={index} id='content' >
                        {<Markdown components={{
                          h1: ({ children }) => <h1 className="text-4xl left-0 font-bold ">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-3xl font-bold  text-gray-950">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-2xl font-bold  text-gray-900">{children}</h3>,
                          h4: ({ children }) => <h4 className="text-xl font-bold  text-gray-850">{children}</h4>,
                          h5: ({ children }) => <h5 className="text-lg font-bold  text-gray-800">{children}</h5>,
                          h6: ({ children }) => <h6 className="text-md font-bold  text-gray-750">{children}</h6>,
                          p: ({ children }) => <p className="text-base text-gray-600 ">{children}</p>,
                          code: ({ children }) => <div className='p-4 card rounded-2xl mt-4 bg-trueGray-950 overflow-auto'><code className='text-xs text-yellow-500 text-left rounded-md'>{children}</code></div>,
                          // Tambahkan definisi kelas untuk elemen-elemen lain seperti h4, h5, h6 di sini
                        }} remarkPlugins={[remarkGfm]}>{content.value}</Markdown>} {/* Mengubah createRoot menjadi Markdown */}
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
      ))}

      <Footer />

    </div>
  );
}

export default DetailedBlog;



