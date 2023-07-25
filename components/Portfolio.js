import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from "framer-motion";

const Portfolio = ({ items }) => {
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-wrap mx-4 justify-center md:space-x-8">
        {items.map((item) => (
          <div key={item.sys.id} className="bg-gray-100 rounded-lg shadow-md p-5 md:px-5 pt-5 pb-10">
            <h2 className="text-xl text-gray-600 font-semibold mb-2">{item.fields.name}</h2>
            <p className="text-gray-600 mb-1">{item.fields.description}</p>
            <motion.img
              src={item.fields.image.fields.file.url}
              alt={item.name}
              className="max-w-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-gray-500 text-sm">{item.fields.tech}</p>
            <div className="mt-4">
              <a href={item.fields.deployed} rel="noopener noreferrer" target="_blank" className="rounded-full bg-white hover:bg-white text-black font-bold py-2 px-4 lg:px-6 rounded mr-2">
                Demo
                <FontAwesomeIcon icon={faEye} className="ml-2" />
              </a>
              <a href={item.fields.github} rel="noopener noreferrer" target="_blank" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 lg:px-6 rounded transition duration-300">
                GitHub
                <FontAwesomeIcon icon={faGithub} className="ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



export default Portfolio;
