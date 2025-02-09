import React, { useContext } from 'react'
import PaginationNumberButtons from '../utility/PaginationNumberButtons'
import PaginationArrowButton from '../utility/PaginationArrowButton'
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PaginationContext } from '../PaginationContext';

// This component renders the all the pagination buttons. The PaginationProvider MUST be used for this component to function properly.
const PaginationButtons = () => {
    const { curPage, setCurPage, totalPages } = useContext(PaginationContext)

    return (
        <span className='flex justify-end gap-3'>
            {/** First Page button */}
            <PaginationArrowButton
                onClick={() => setCurPage(1)} 
                disabled={curPage === 1}
            >
                <FiChevronsLeft size={24}/>
            </PaginationArrowButton>

            {/** Previous Page button */}
            <PaginationArrowButton  
                onClick={() => setCurPage(curPage - 1)}
                disabled={curPage === 1} 
            >
                <FaChevronLeft size={16}/>
            </PaginationArrowButton>

            <PaginationNumberButtons 
                totalPages={totalPages} 
                page={curPage} 
                setPage={setCurPage}
            />

            {/** Next Page button */}
            <PaginationArrowButton 
                onClick={() => setCurPage(curPage + 1)} 
                disabled={curPage === totalPages}
            >
                <FaChevronRight size={16}/>
            </PaginationArrowButton>

            {/** Last Page button */}
            <PaginationArrowButton
                onClick={() => setCurPage(totalPages)} 
                disabled={curPage === totalPages}
            >
                <FiChevronsRight size={24}/>
            </PaginationArrowButton>
        </span>
  )
}

export default PaginationButtons
