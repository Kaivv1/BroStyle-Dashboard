import SettingsForm from "../features/settings/SettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Settings</Heading>
      <SettingsForm />
    </div>
  );
}

export default Settings;
