import React from "react";
import CategorySection from "../Components/CategorySection";
import RecentComplaints from "../Components/RecentComplaints";
import CommunityStats from "../Components/CommunityStats";
import VolunteerCTA from "../Components/VolunteerCTA";

const HomePage = () => {
  return (
    <div>
      <CategorySection />
      <RecentComplaints />
      <CommunityStats />
      <VolunteerCTA />
    </div>
  );
};

export default HomePage;
