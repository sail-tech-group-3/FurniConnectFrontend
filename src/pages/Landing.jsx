import { Hero, ProductList, SectionTitle } from "../components";

const Landing = () => {
  return (
    <div className="align-element py-20 ">
      <Hero />
      <SectionTitle text="Featured Products" />
      <ProductList />
    </div>
  );
};

export default Landing;
