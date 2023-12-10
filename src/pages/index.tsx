import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

const HomePage = () => {
  return (
    <div id="App">
      <Menu />
      <div id="main-container">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
