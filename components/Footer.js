import React from 'react';
// import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Separator } from "@/components/ui/separator";

function Footer() {
    return (
        <footer className=" text-white py-8 w-full">
            <Separator />
            <div className="container mx-auto px-4 pt-4">
                <div className="flex flex-wrap justify-between items-center">
                    {/* Brand and Description */}
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="text-2xl font-bold text-black">PassChain</a>
                        <p className="mt-2 text-gray-400">
                            Securing your digital life with cutting-edge blockchain technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    {/* <div className="flex flex-wrap items-center">
            <div className="mx-3">
              <h6 className="uppercase font-semibold">Quick Links</h6>
              <ul className="mt-2 text-gray-400">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="mx-3">
              <h6 className="uppercase font-semibold">Follow us</h6>
              <ul className="flex mt-2">
                <li className="mr-3">
                  <a href="https://twitter.com/PassChain" aria-label="Twitter"></a>
                </li>
                <li className="mr-3">
                  <a href="https://facebook.com/PassChain" aria-label="Facebook"></a>
                </li>
                <li className="mr-3">
                  <a href="https://linkedin.com/company/PassChain" aria-label="LinkedIn"></a>
                </li>
                <li>
                  <a href="https://github.com/PassChain" aria-label="GitHub"></a>
                </li>
              </ul>
            </div>
          </div> */}
                </div>

                {/* Legal Notice */}
                <div className="text-center mt-8 text-gray-400 text-sm">
                    © {new Date().getFullYear()} PassChain. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
