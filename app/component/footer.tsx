import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full sm:w-[90%] ml-auto mr-auto rounded-md bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="text-center text-sm sm:text-base sm:text-left">
          &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
        </p>

        <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 gap-4">
          <p className="text-lg font-mono text-center sm:text-left">
            For Contact
          </p>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/in/sikandar-tahir-356a56273/" passHref>
              <FaLinkedin
                size={25}
                className="hover:text-blue-500 transition-colors duration-200"
              />
            </Link>
            <Link href="https://github.com/SikandarTahir23" passHref>
              <FaGithub
                size={25}
                className="hover:text-gray-400 transition-colors duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
