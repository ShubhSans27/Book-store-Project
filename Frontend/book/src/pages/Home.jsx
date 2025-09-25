
import React from "react"
import Hero from "../Component/Home/hero";
import RecentBook from "../Component/Home/RecentallyAddedBook";

const Home = () => {
    return <>
      <div className="bg-zinc-900 text-white px-10 py-8 "> <Hero/>
      <RecentBook/>
      </div>

    </>
}
export default Home;
