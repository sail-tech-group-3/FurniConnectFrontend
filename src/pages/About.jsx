/* eslint-disable react/no-unescaped-entities */
import { Carousel } from "antd";
import aboutImage from "../assets/about.jpeg";
import aboutImage1 from "../assets/hero1.webp";
import { SectionTitle } from "../components";

const About = () => {
  return (
    <div className="align-element py-20">
      <SectionTitle text="About" />

      <div className=" mt-10">
        <Carousel autoplay>
          <img
            src={aboutImage}
            alt="About Us"
            className="w-full h-[15rem] rounded-lg shadow-lg object-cover lg:h-[20rem]"
          />
          <img
            src={aboutImage1}
            alt="About Us"
            className="w-full h-[15rem] rounded-lg shadow-lg object-cover lg:h-[20rem]"
          />
        </Carousel>
      </div>
      <div className="mt-10">
        <p className="text-lg leading-8 mb-6">
          At FurniConnect, we are dedicated to transforming the furniture
          industry by connecting capital providers with talented furniture
          makers and users who seek exceptional, custom-made pieces. Our
          platform is designed to bridge the gap between creators and customers,
          ensuring a seamless and enriching experience for all parties involved.
        </p>
        <p className="text-lg leading-8">
          Our mission is to foster innovation and creativity in furniture design
          while providing a reliable and efficient marketplace for both makers
          and buyers. We believe in the power of collaboration and strive to
          make high-quality furniture accessible to everyone, whether you're
          looking to invest in unique designs or find the perfect addition to
          your home.
        </p>
      </div>
    </div>
  );
};

export default About;
