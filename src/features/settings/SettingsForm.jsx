/*eslint-disable */
import Loader from "../../ui/Loader";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function SettingsForm() {
  const { settings: { priority_price, display_name } = {}, isLoading } =
    useSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();

  if (isLoading) return <Loader size="lg" />;

  return (
    <form className="space-y-6">
      <div className="space-x-3">
        <label htmlFor="priority">Change priority price</label>
        <input
          type="number"
          defaultValue={priority_price}
          className="input"
          onBlur={(e) => updateSettings({ priority_price: e.target.value })}
          disabled={isUpdating}
          id="priority"
          min={0}
        />
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="displayName">Display your full name</label>
        <input
          type="checkbox"
          defaultChecked={display_name}
          className="size-6 hover:cursor-pointer focus:outline-none"
          onChange={() => updateSettings({ display_name: !display_name })}
          disabled={isUpdating}
          id="displayName"
        />
      </div>
    </form>
  );
}

export default SettingsForm;
