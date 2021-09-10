import React from "react";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import "./Pagination.css";

const Pagination = ({ onBack, onForward, backDisabled, forwardDisabled }) => {
  return (
    <div className='pagination'>
      <div
        className={`pagination__button ${
          backDisabled ? "pagination__hidden" : "pagination__shown"
        }`}
        onClick={onBack}
      >
        <ChevronLeftIcon fontSize='inherit' color='inherit' />
      </div>
      <div
        className={`pagination__button ${
          forwardDisabled ? "pagination__hidden" : "pagination__shown"
        }`}
        onClick={onForward}
      >
        <ChevronRightIcon fontSize='inherit' color='inherit' />
      </div>
    </div>
  );
};

export default Pagination;
