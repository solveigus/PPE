import { useRouter } from 'next/router';


const Pagination = ({ unitPerPage, totalUnits, paginate }) => {
  const router = useRouter();
  const pageNumbers = [];

  //The array pageNumbers is a list of the numbers of the pages
  for (let i = 1; i <= Math.ceil(totalUnits / unitPerPage); i++) {
    pageNumbers.push(i);
  }

  //This function allows us to change to the following page of units
  const handlePagination = (number) => {
    paginate(number);
    router.push(`products/?page=${number}`); // Replaces with your query parameters
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