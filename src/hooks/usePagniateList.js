import { useState } from "react";

const usePaginateList = (dataList = [], dataToShowLimit = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataToShowList =
    dataList && dataList.length > dataToShowLimit
      ? dataList.slice(0, dataToShowLimit * currentPage)
      : dataList;

  function setPaginationPage(page) {
    setCurrentPage(page);
  }
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  return { setPaginationPage, handleNextPage, dataToShowList };
};

export default usePaginateList;
