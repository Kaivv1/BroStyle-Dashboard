/*eslint-disable */
import Loader from "../../ui/Loader";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function SettingsForm() {
  const { settings: { priority_price } = {}, isLoading } = useSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();

  if (isLoading) return <Loader size="lg" />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSettings({ [field]: value });
  }
  return (
    <form>
      <div className="space-x-3">
        <label htmlFor="priority">Change priority price</label>
        <input
          type="number"
          defaultValue={priority_price}
          className="input"
          onBlur={(e) => handleUpdate(e, "priority_price")}
          disabled={isUpdating}
          id="priority"
          min={0}
        />
      </div>
    </form>
  );
}

export default SettingsForm;
