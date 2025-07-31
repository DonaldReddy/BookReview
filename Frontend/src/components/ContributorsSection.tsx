import React, { useEffect, useState } from 'react';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

const CONTRIBUTORS_PER_PAGE = 6;

const ContributorsSection: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const repoOwner = 'DonaldReddy'; // Replace with the upstream repo owner
  const repoName = 'BookReview';       

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`);
        console.log(response)
        const data: Contributor[] = await response.json();

        if (!Array.isArray(data)) {
        console.error("Unexpected response:", data);
        setContributors([]); // fallback to empty array
        return;
      }
        setContributors(data);
      } catch (error) {
        console.error('Failed to fetch contributors:', error);
      }
    };

    fetchContributors();
  }, []);

  const totalPages = Math.ceil(contributors.length / CONTRIBUTORS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONTRIBUTORS_PER_PAGE;
  const currentContributors = contributors.slice(startIndex, startIndex + CONTRIBUTORS_PER_PAGE);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Contributors</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {currentContributors.map((contributor) => (
            <a
              href={contributor.html_url}
              key={contributor.login}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300 dark:border-gray-700"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{contributor.login}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Contributor</p>
            </a>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContributorsSection;
