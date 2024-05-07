import Repo from "./Repo";

const Repos = ({ repos, alwaysFullWidth = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(repos.length / 10)); // 假设每页显示10个
  const className = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full";

  // 计算当前页码显示的Repo列表
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentRepos = repos.slice(startIndex, endIndex);

  // 页码导航点击事件
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`${className} bg-glass rounded-lg px-8 py-6`}>
      <ol className="relative border-s border-gray-200">
        {currentRepos.map((repo) => (
          <Repo key={repo.id} repo={repo} />
        ))}
        {currentRepos.length === 0 && (
          <p className="flex items-center justify-center h-32 ">No repos found</p>
        )}
      </ol>
      <div className="flex justify-center mt-6">
        <nav className="flex justify-center gap-1 text-xs font-medium">
          {currentPage > 1 && (
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href="#"
              className={`block size-8 rounded ${
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border border-gray-100 bg-white text-gray-900"
              } text-center leading-8`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </a>
          ))}
          {currentPage < totalPages && (
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Repos;

// import Repo from "./Repo";

// const Repos = ({ repos, alwaysFullWidth = false }) => {
// 	//alwaysFullWidth = false 自定义的一个属性
//	const className = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full";
	// return (
	// 	<div className={`${className} bg-glass rounded-lg px-8 py-6`}>
	// 		<ol className='relative border-s border-gray-200'>
	// 			{repos.map((repo) => (
	// 				<Repo key={repo.id} repo={repo} />
	// 			))}
	// 			{repos.length === 0 && <p className='flex items-center justify-center h-32 '>No repos found</p>}
	// 		</ol>
	// 	</div>
	// );
//};
// export default Repos;
