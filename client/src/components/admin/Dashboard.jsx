import { useState } from "react";
import ContentBox from "./ContentBox";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  return (
    <main className="Dashboard">
      <div className="maxWidth">
        <ContentBox />
      </div>
    </main>
  );
};

export default Dashboard;
