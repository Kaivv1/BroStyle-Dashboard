/* eslint-disable  */
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleSort(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} onChange={handleSort} value={sortBy} />;
}

export default Sort;
