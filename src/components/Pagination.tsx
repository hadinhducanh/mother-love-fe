// Pagination.tsx
import React from "react";

interface PaginationProps {
  pageNo: number;
  totalPages: number;
  onPageClick: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNo,
  totalPages,
  onPageClick,
}) => {
  return (
    <div className="col-12 d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${pageNo === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageClick(pageNo)}
            disabled={pageNo === 0}
          >
            Previous
          </button>
        </li>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${pageNumber === pageNo ? "active" : ""}`}
            style={{ backgroundColor: "transparent" }}
          >
            <button
              className="page-link"
              onClick={() => onPageClick(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${pageNo === totalPages - 1 ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageClick(pageNo + 1)}
            disabled={pageNo === totalPages - 1}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
