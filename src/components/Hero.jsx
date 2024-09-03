/* eslint-disable react/no-unescaped-entities */
import { Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

function Hero() {
  const contentStyle = {
    height: "40rem",
  };

  return (
    <div className="grid mb-40 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl  text-4xl font-bold tracking-tight sm:text-5xl">
          Transforming Furniture Shopping
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          At FurniConnect, we're revolutionizing how furniture is designed and
          acquired. By bridging the gap between capital providers and furniture
          makers with users seeking high-quality pieces, we offer a seamless
          platform that brings exceptional craftsmanship directly to your
          doorstep. Explore our curated selection and discover how we can make
          your furnishing dreams a reality.
        </p>
        <div className="mt-10">
          <Link to="/products">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Explore Our Products
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden lg:block h-[28rem] lg:p-4 space-x-4 rounded-box">
        <Carousel autoplay>
          <div className={contentStyle}>
            <img
              src={hero1}
              alt="hero1"
              className="h-[30rem] w-full object-cover"
            />
          </div>
          <div className={contentStyle}>
            <img
              src={hero2}
              alt="hero2"
              className="h-[30rem] w-full object-cover"
            />
          </div>
          <div className={contentStyle}>
            <img
              src={hero3}
              alt="hero3"
              className="h-[30rem] w-full object-cover"
            />
          </div>
          <div className={contentStyle}>
            <img
              src={hero4}
              alt="hero4"
              className="h-[30rem] w-full object-cover"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;
