import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import HomeCard from "./Components/HomeCard";
import JobListings from "./Components/JobListings";

const App = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <HomeCard />

      <JobListings />

      <section className="m-auto max-w-lg my-10 px-6">
        <a
          href="jobs.html"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Jobs
        </a>
      </section>
    </>
  );
};

export default App;
