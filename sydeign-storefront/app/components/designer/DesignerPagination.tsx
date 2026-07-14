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
    <div
      className="
        mt-20
        flex
        flex-col
        items-center
        gap-6
      "
    >
      <div
        className="
          flex
          w-full
          items-center
          justify-center
          gap-4
        "
      >
        <div
          className="
            h-px
            max-w-[100px]
            flex-1
            bg-gradient-to-r
            from-transparent
            to-[#9c522b]/30
          "
        />

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
            className={`
              cursor-pointer
              transition-all
              duration-300
              hover:scale-125
              focus:outline-none

              ${
                page <= activePage
                  ? 'scale-125 font-bold text-[#9c522b] drop-shadow-[0_0_3px_rgba(156,82,43,0.4)]'
                  : 'text-[#9c522b]/30 hover:text-[#9c522b]/60'
              }
            `}
          >
            ✦
          </button>
        ))}

        <div
          className="
            h-px
            max-w-[100px]
            flex-1
            bg-gradient-to-l
            from-transparent
            to-[#9c522b]/30
          "
        />
      </div>

      {visibleCount < totalProducts && (
        <button
          type="button"
          onClick={onLoadMore}
          className="
            border-b
            border-[#9c522b]/40
            pb-1
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-[#9c522b]
            transition
            hover:text-[#b05c32]
            cursor-pointer
          "
        >
          Load More Products (
          {totalProducts - visibleCount}{' '}
          remaining)
        </button>
      )}
    </div>
  );
}