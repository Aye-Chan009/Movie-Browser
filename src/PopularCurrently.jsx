import Hero from './HeroSection';
import MovieCard from './MovieCards.jsx';

const PopularCurrently = ({ Movies, heroText, currentPage, totalPages, setPage }) => {
  let resultsHTML = 'Found Nothing';

  if (Movies && Movies.length > 0) {
    resultsHTML = Movies.map((movie, index) => (
      <div key={index} className="col-lg-3 mb-4">
        <MovieCard movie={movie} />
      </div>
    ));
  }

  // Function to generate page numbers to display
  const generatePaginationPages = () => {
    let pages = [];
  
    // Always show the first page (1), but don't add it again if it's the current page
    if (currentPage !== 1) {
      pages.push(1);
    }
  
    // Show two pages before the current page
    for (let i = currentPage - 1; i < currentPage; i++) {
      if (i > 1) pages.push(i); // Skip the first page since it's already included
    }
  
    // Show the current page
    pages.push(currentPage);
  
    // Show two pages after the current page
    for (let i = currentPage + 1; i <= currentPage + 1; i++) {
      if (i < totalPages) pages.push(i); // Skip if beyond the total pages
    }
  
    // Always show the last page (totalPages)
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  
    // Add "..." if necessary (if there's a gap between pages)
    if (pages[1] > 2) {
      pages = [1, '...', ...pages.slice(1)];
    }
    if (pages[pages.length - 2] < totalPages - 1) {
      pages = [...pages.slice(0, pages.length - 1), '...', totalPages];
    }
  
    return pages;
  };
  

  const paginationPages = generatePaginationPages();

  return (
    <div>
      <Hero text={heroText} />
      <div id="services" className="container py-5">
        <div className="row">{resultsHTML}</div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="text-center mt-4">
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <div className="btn-group">
              {/* Left Arrow */}
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                &#8592; Prev
              </button>

              {/* Page Numbers */}
              {paginationPages.map((page, index) => {
                if (page === '...') {
                  return (
                    <button key={index} className="btn btn-outline-primary btn-sm" disabled>
                      ...
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                    onClick={() => setPage(page)}
                    disabled={page === currentPage}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Right Arrow */}
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next &#8594;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularCurrently;
