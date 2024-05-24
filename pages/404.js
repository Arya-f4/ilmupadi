// pages/404.js
import Link from 'next/link';
import Navbar from './components/navbar';
import Footercomponent from "./components/Footer";

const Custom404 = () => {
  return (
    <div className='bg-skin-gray h-screen'>
      <Navbar />
      <div className='px-12 md:px-24 py-44'>

        <a className='text-2xl'>404 - Page Not Found</a>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Footercomponent />
    </div>
  );
};

export default Custom404;