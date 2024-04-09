import { useRouter } from 'next/router';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const router = useRouter();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (number) => {
    paginate(number);
    router.push(`/products?page=${number}`);
  };

  return (
    <nav>
      <ul className="flex pl-0 rounded list-none flex-wrap space-x-5">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600">
            <button onClick={() => handlePagination(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Pagination;