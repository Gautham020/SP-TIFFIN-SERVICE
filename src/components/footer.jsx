import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../img/logo.png";
import map from "../img/map.png";
import { MdOutlineAddIcCall } from "react-icons/md";

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-primary p-6">
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-y-6 gap-x-12 bg-primary text-center md:text-left">
        <div className="w-full md:w-auto text-center">
          <Link to={"/"} className="flex items-center gap-1 justify-center">
            <img src={Logo} className="w-100 h-28  object-cover " alt="logo" />
          </Link>
          {/* <p className="text-headingColor text-2xl font-bold">
            SP TIFFIN SERVICE
          </p> */}
        </div>

        <div className="w-full md:w-auto text-center md:text-left">
          <p className="text-xl font-semibold">Contact Us:</p>
          <h3 className="text-red-700 text-xl flex items-center">
            <a
              style={{ marginLeft: "40px" }}
              href="tel:96111 91300"
              className="flex items-center  "
            >
              <MdOutlineAddIcCall className="mr-2 " />
              +91 96111 91300
            </a>
          </h3>
          <div className="container">
            <p className="mt-4 text-center">
              Vijayanagar 1st Stage, Vijayanagar, Mysuru, Karnataka 571428
            </p>
            <a href="https://www.google.com/maps/place/sp+tiffin+services/@12.3310676,76.6183703,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf7b7ac31e5ed5:0x58301aabc4faa133!8m2!3d12.3310676!4d76.6183703!16s%2Fg%2F11kqt6c8qy?entry=ttu">
              <img
                src={map}
                style={{ height: "130px", display: "block", margin: "0 auto" }}
                alt="Map Location"
              />
            </a>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-blue-600 text-xl hover:text-blue-800" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-blue-600 text-xl hover:text-blue-800" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-500 text-xl hover:text-pink-700" />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-red-600 text-xl hover:text-red-800" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-blue-gray-50" />

      <p className="text-center font-normal text-blue-gray-600 mt-8">
        &copy; Since 2022 SP TIFFIN SERVICE
      </p>
    </footer>
  );
}
