import "../styles/pagination.css"

function Pagination({GotoNextPage,GotoPreviousPage}) {
    return (
      <div className="pagination-container">
          {GotoPreviousPage && <button  onClick={GotoPreviousPage}>Prev</button>}
          {GotoNextPage && <button onClick={GotoNextPage}>Next</button>}
      </div>
    )
  }
  
  export default Pagination