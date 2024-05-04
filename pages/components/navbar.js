import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion"; // Import Framer Motion

const Navbar = () => {
  const navigation = [

    "blog",
    "team",
    "about",
    ,
  ];

  return (
    <div className="z-50 w-full fixed bg-opacity-100 backdrop-filter backdrop-blur">

      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium  text-black">
                    <span>
                      <Image
                        src="/favnobg.png"
                        alt="logo ilmu padi"
                        width={300}
                        height={300}
                        className="w-10"
                      />
                    </span>
                    <div className="text-green-700">Consume Care</div>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto rounded-md lg:hidden  focus:outline-none text-black focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel as={motion.div} // Apply animation to the panel
                  initial={{ opacity: 0, scale: 0.8 }} // Set initial opacity to 0
                  animate={{ scale: 1, opacity: 1 }} // Animate opacity based on open state
                  exit={{ opacity: 0, scale: 0.8 }}

                  transition={{ type: "spring", duration: 1 }} // Set transition duration
                  className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href={`/${item.toLowerCase()}`} className="w-full px-4 py-2 -ml-4  rounded-md  hover:text-skin-main  focus:bg-tru focus:outline-none">
                        {item}
                      </Link>
                    ))}
                    <Link href="/quiz" className="w-full px-6 py-2 mt-3 text-center text-white bg-skin-main rounded-md lg:ml-5">
                      Test Assesment Sekarang!
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index} href={`/${menu.toLowerCase()}`}>
                <Link href={`/${menu.toLowerCase()}`} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md hover:text-green-500 focus:outline-none ">
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href="/quiz" className="px-6 py-2 text-white bg-skin-main rounded-md md:ml-5">
            To the Test!
          </Link>


        </div>
      </nav>
    </div>
  );
}

export default Navbar;
