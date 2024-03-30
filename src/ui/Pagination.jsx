/* eslint-disable */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (count <= 10) return null;

  return (
    <div className="flex items-center justify-center gap-4 px-4 py-3">
      <button
        className="buttonDefault"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <HiChevronLeft className="stroke-2" />
      </button>
      <div>
        Page {currentPage} of {pageCount}
      </div>
      <button className="buttonDefault" onClick={nextPage}>
        <HiChevronRight className="stroke-2" />
      </button>
    </div>
  );
}

export default Pagination;
