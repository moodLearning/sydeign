interface DesignerPaginationProps {
  totalProducts: number;
  visibleCount: number;
  totalPages: number;
  activePage: number;

  onPageClick: (page: number) => void;
  onLoadMore: () => void;
}

export function DesignerPagination({
  totalProducts,
  visibleCount,
  totalPages,
  activePage,
  onPageClick,
  onLoadMore,
}: DesignerPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="designer-pagination">
      <div className="designer-pagination-row">
        <div className="designer-pagination-line" />

        {Array.from({
          length: totalPages,
        }).map((_, page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              onPageClick(page)
            }
            title={`Page ${page + 1}`}
            className={`designer-pagination-dot ${
              page <= activePage
                ? 'designer-pagination-dot-active'
                : 'designer-pagination-dot-inactive'
            }`}
          >
            ✦
          </button>
        ))}

        <div className="designer-pagination-line-reverse" />
      </div>

      {visibleCount < totalProducts && (
        <button
          type="button"
          onClick={onLoadMore}
          className="designer-pagination-load-more"
        >
          Load More Products (
          {totalProducts - visibleCount}{' '}
          remaining)
        </button>
      )}
    </div>
  );
}