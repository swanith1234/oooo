import { useState } from "react";
import Globe from "react-globe.gl";
import { iconPaths, platformIcons } from "../constants/index.js";
import Button from "../components/Button.jsx";

const About = ({ userData }) => {
  const [showContactIcons, setShowContactIcons] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const calculateIconSize = (technologies) => {
    const baseSize = 14; // Max size in rem
    const minSize = 5; // Min size in rem
    const iconCount = technologies.length;
    return Math.max(baseSize - iconCount, minSize); // Decrease size with more icons
  };
  const toggleContactIcons = () => {
    console.log(showContactIcons);
    setShowContactIcons((prev) => !prev);
  };
  const getIcons = (technologies) => {
    // Define platform-to-icon mapping

    // Process each technology (URL)
    return technologies.map((tech) => {
      const matchingPlatform = platformIcons.find((platform) =>
        tech.toLowerCase().includes(platform.domain)
      );

      if (matchingPlatform) {
        return (
          <a href={tech}>
            {" "}
            <img
              key={tech}
              src={matchingPlatform.icon}
              alt={matchingPlatform.name}
              className="tech-logo-about w-16 h-16"
            />
          </a>
        );
      }

      return (
        <span key={tech} className="tech-text">
          {tech}
        </span>
      ); // Fallback for unknown platforms
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userData.emailId);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };
  const getTechnologyIcons = (technologies) => {
    const iconSize = calculateIconSize(technologies);

    return technologies.map((tech) => {
      const matchingIcon = iconPaths.find(
        (icon) => icon.name.toLowerCase() === tech.toLowerCase()
      );
      if (matchingIcon) {
        return (
          <img
            key={tech}
            src={matchingIcon.path}
            alt={tech}
            className="tech-logo-about "
            style={{
              width: `${iconSize}rem`,
              height: `${iconSize}rem`,
            }}
          />
        );
      }
      return (
        <span key={tech} className="tech-text">
          {tech}
        </span>
      ); // Fallback for unknown technologies
    });
  };
  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src={userData.profilePhoto}
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Hi, I’m {userData.name}!</p>
              <p className="grid-subtext overflow-hidden break-words">
                {userData.about}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            {/* <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" /> */}
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
              <p className="flex gap-4">{getIcons(userData.codingProfiles)}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 40,
                    lng: -100,
                    text: "Rjieka, Croatia",
                    color: "white",
                    size: 15,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I’m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I&apos;m based in Rjieka, Croatia and open to remote work
                worldwide.
              </p>
              <div className="relative">
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-10"
                  onClick={toggleContactIcons}
                />
                <div
                  className={`absolute top-[-120%] left-0 w-full flex justify-center items-center transition-transform duration-500 ${
                    showContactIcons
                      ? "translate-y-10 opacity-100"
                      : "translate-y-0 opacity-0"
                  }`}
                  style={{ display: showContactIcons ? "flex" : "none" }}
                >
                  <div className="p-4 bg-white rounded-xl shadow-md space-x-4 flex">
                    {getIcons(userData.contactDetails)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            {/* <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" /> */}

            <div>
              <p className="grid-headtext">Tech Stacks</p>
              <div
                className="flex gap-4 justify-center items-center overflow-x-auto flex-wrap"
                style={{
                  scrollbarWidth: "none", // Hide scrollbar for Firefox
                  msOverflowStyle: "none", // Hide scrollbar for IE
                }}
              >
                {getTechnologyIcons(userData.techStacks)}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <a href={`tel:+${userData.phoneNo}`}>
              {" "}
              <img
                src="assets/grid4.png"
                alt="grid-4"
                className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
              />
              <div>Phone Me</div>
            </a>
            <div className="space-y-2">
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  {userData.emailId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
