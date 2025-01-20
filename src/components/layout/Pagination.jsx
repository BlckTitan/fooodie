'use client'
import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@/app/GlobalRedux/paginationSlice/paginationSlice';

export default function PaginationComponent({data, loadingState, pageSize, totalItemsNum}) {
    const currentPageData = useSelector((state) => state.currentPageData)

    const dispatch = useDispatch()
    
    // pagination states
    // const [currentPage, setCurrentPage] = useState(currentPageData.currentPage)
    const [totalItems, setTotalItems] = useState(0); // Total number of items

    useEffect(() => {
        if(loadingState) return <LoadingSpinner/>

        if((data?.data !== null || data?.data !== undefined) ){
            setTotalItems(totalItemsNum) //data.length
        }

    }, [loadingState, totalItemsNum, data])

    // Calculate total pages,
    // eg divide 100 items from the db into 5 items per page we get 20 pages to display 100 items
    const totalPages = Math.ceil(totalItems / pageSize);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    // setCurrentPage(pageNumber);
    dispatch(setCurrentPage(pageNumber))
  };
  
  return (
        
    <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPageData.currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPageData.currentPage - 1)} disabled={currentPageData.currentPage === 1} />
        {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPageData.currentPage}
                onClick={() => handlePageChange(page + 1)}
            >
                {page + 1}
            </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPageData.currentPage + 1)} disabled={currentPageData.currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPageData.currentPage === totalPages} />
    </Pagination>
    )
}
