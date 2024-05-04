import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
const Profile = ({ team, onClose }) => {
  if (!team || !team.gambar) {
    return <div>Data tidak lengkap</div>
  }

  return (
    <motion.div
      initial={{ opacity: -1, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block align-bottom bg-skin-gray border-2 border-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <button
            type="button"
            className="relative md:block hidden ml-auto m-2 p-2 bg-skin-gray rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="bg-skin-gray px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="card-content">
              <Image
                src={team.gambar}
                width={500}
                height={500}
                alt={`team consume care`}
                className="w-30 h-30 md:w-60 md:h-60 mx-auto"
              />
              <div className="sm:flex">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2
                    className="text-xl leading-6 font-extrabold text-gray-900"
                    id="modal-name"
                  >
                    {team.name}
                  </h2>
                  <h3
                    className="text-lg leading-6 font-bold text-gray-900"
                    id="modal-title"
                  >
                    {team.fakultas}
                  </h3>
                  <div className="mt-2">
                    <p className="text-md text-black">{team.prodi}</p>
                  </div>
                  <div className="mt-2 text-xl">Contact</div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Email: {team.email}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <a
                        href={team.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {team.instagram}
                      </a>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <a
                        href={team.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {team.github}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-skin-gray px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full md:hidden inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Profile
