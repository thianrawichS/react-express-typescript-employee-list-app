import ReactPaginate from "react-paginate";
import '../styles/pagination.css'

interface PaginationProps {
    handleChangeItemPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangePage: (selectedPage: {selected:number}) => void;
    totalPage: number;
    itemPerPage: number;
    currentPage: number;
}

const PaginationPage: React.FC<PaginationProps> = (props) => {
    const {
        itemPerPage,
        handleChangeItemPerPage,
        totalPage,
        handleChangePage,
        currentPage
    } = props

    return (
        <>
            <div className='d-flex container-sm'>
                <h6>Items per page : </h6>
                <select 
                    className='form-select' 
                    value={itemPerPage}
                    onChange={handleChangeItemPerPage}
                    >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <ReactPaginate
                renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
                breakLabel="..."
                nextLabel=">>"
                previousLabel="<<"
                pageCount={totalPage}
                onPageChange={handleChangePage}
                containerClassName='pagination'
                activeClassName='active-page'
                previousLinkClassName='link'
                nextLinkClassName='link'
                pageClassName='link'
                forcePage={currentPage}
            />
        </>
    )
}

export default PaginationPage;