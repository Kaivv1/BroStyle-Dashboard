import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
