import "../styles/pagination.css"


function Pagination({GoToNextPage, GoToPreviusPage}) {
    return (
      <div className="pagination-container">
          {GoToPreviusPage && <button  onClick={GoToPreviusPage}>Prev</button>}
          {GoToNextPage && <button onClick={GoToNextPage}>Next</button>}
      </div>
    )
  }
  
  export default Pagination