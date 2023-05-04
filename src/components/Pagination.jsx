import "../styles/pagination.css"

function Pagination({GotoNextPage,GotoPreviousPage}) {
    return (
      <div className="pagination-container">
          {GotoPreviousPage && <button className="pagination-button"  onClick={GotoPreviousPage}>Prev</button>}
          {GotoNextPage && <button className="pagination-button" onClick={GotoNextPage}>Next</button>}
      </div>
    )
  }
  
  export default Pagination