import Navbar from "../nav/nav-bar";
import Home from "../home/home";
import { Footer } from "../footer/footer";
import { AboutUs } from "../about/about-us";
import { Services } from "../services/services";
import { BlogPost } from "../blogs/blog-post";
import { ContactUs } from "../contact/contact-us";

export const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <section id="home"><Home /></section>
            <section id="about"><AboutUs /></section>
            <section id="services"><Services /></section>
            <section id="blogs"><BlogPost /></section>
            <section id="contact"><ContactUs /></section>
            <Footer />
        </div>
    );
};