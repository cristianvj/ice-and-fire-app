import React, {FC} from 'react'

interface PaginationProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  page: number;
  isLastPage: boolean;
}

const Pagination: FC<PaginationProps> = ({ handleNextPage, handlePreviousPage, page, isLastPage}) => {
  return (
    <div className="flex justify-end m-10 gap-5">
      <button
        className="bg-purple-700 text-gray-200 px-4 py-2 rounded disabled:opacity-50"
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        Previous
      </button>
      {page > 1 ? "..." : null} <b>{page}</b> {!isLastPage ? "..." : null}
      <button
        className="bg-purple-700 text-gray-200 px-4 py-2 rounded disabled:opacity-50"
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination