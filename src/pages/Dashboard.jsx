import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <div>
      <Heading as="h1">Dashboard</Heading>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
