import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const TwitterIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.3-1.2 1.8-3.3 1.4-5.1-.3-1.6.8-3.2 2.4-3.6 1.6-.4 3.2.3 4.4 1.5 1.4-.2 2.7-.8 3.8-1.6.5 1.7-.1 3.5-1.5 4.7 1.3-.2 2.5-.8 3.5-1.4z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1.5-3.5c2.9-.3 6-1.4 6-6 0-1.7-.6-3.2-1.4-4.2.2-.6.7-2.1-.1-5-1.8 0-3.2 1-4 2.1-.8-.3-1.6-.5-2.5-.5-.9 0-1.7.2-2.5.5-.8-1.1-2.2-2.1-4-2.1-.8 2.9-.3 4.4-.1 5-1 .9-1.5 2.4-1.5 4.2 0 4.6 3 5.7 5.9 6-1 .8-1.3 1.9-1.3 3.1v4" />
  </svg>
);

const MailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Footer = () => {
  const sections = [
    { title: "Company", links: ["About Us", "Careers", "Blog"] },
    { title: "Products", links: ["All Apps", "Volunteers", "Roadmap"] },
    {
      title: "Support",
      links: ["Contact", "Help Center", "Privacy Policy", "Terms of Service"],
    },
  ];

  const socialIcons = [TwitterIcon, GithubIcon, MailIcon];

  return (
    <footer className="bg-[#1A1A2E] text-white pt-16 pb-8 border-t border-indigo-800 font-[Inter]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
        
          <Zoom>
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-extrabold flex items-center">
                <Typewriter
                  words={["BDClean🌿"]}
                  loop={1}
                  cursor
                  cursorStyle=""
                  typeSpeed={100}
                />
              </h2>
              <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
                BD Clean is a community initiative making Bangladesh cleaner and
                greener. It lets citizens report local cleanliness issues and
                join cleanup activities. Users can track their contributions and
                see ongoing efforts nearby. By promoting awareness, BD Clean
                aims for a healthier, litter-free Bangladesh.
              </p>
            </div>
          </Zoom>

          {sections.map((section) => (
            <Zoom key={section.title} delay={200}>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Zoom>
          ))}
        </div>

        <div className="mt-16 mb-8 border-t border-indigo-800/50"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; 2025 BDClean, All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialIcons.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-400 hover:text-[#7E30E3] transition-colors duration-200"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
