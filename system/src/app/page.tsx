import Navbar from "@/components/Navbar"; // Import the Navbar
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar /> {/* Place it at the very top */}
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}