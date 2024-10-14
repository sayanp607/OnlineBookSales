import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import B1Child from "../assets/image/B1Child.jpeg";
import AuthorImage from "../assets/image/author1.jpeg";
import Spinner from "./Spinner";
import SearchBar from "../Components/SearchBar";
import Preloader from "../Components/Preloader";
import Newarrivals, { books as newbooks } from "./Newarrivals";
import Review from "./Review";
import Trending from "../Components/Trending";
import Book from "../Components/Card/Book";


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookNotFound, setBookNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const [highlightedBookId, setHighlightedBookId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setData({
        featuredAuthor: {
          name: "Stephen King",
          bio: "Stephen King is a prolific author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.",
          image: B1Child,
        },
      });
      setBooks(newbooks);
      setFilteredBooks(newbooks);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    if (query) {
      const results = books.filter((book) =>
        book.bookTitle.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(results);
      setBookNotFound(results.length === 0);
      setEmptySearch(false); // Reset empty search state if query is provided
      if (results.length > 0) {
        setHighlightedBookId(null);
        setTimeout(() => {
          setHighlightedBookId(results[0].bookTitle);
        }, 100);
      } else {
        setHighlightedBookId(null);
      }
    } else {
      setEmptySearch(true); 
      setFilteredBooks(books);
      setBookNotFound(false);
      setHighlightedBookId(null);
    }
  };


  return (
    <>
      <Preloader />
      <div className="bg-gray-100 dark:bg-[rgb(51,51,51)]">
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />
            {emptySearch && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Please Enter a Book Name..!!
                  </h2>
                  <p className="text-gray-900 text-md mb-4">
                    You must type a book name in the search bar to search for books.
                  </p>
                  <button
                    onClick={() => setEmptySearch(false)}
                    className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform duration-300 ease-in-out neon-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {bookNotFound && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" // Sample 'Book Not Found' icon
                    alt="Book Not Found"
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Oops! Book Not Found
                  </h2>
                  <p className="text-gray-600 text-md mb-6">
                    Sorry, the book you're looking for isn't available right now.
                  </p>
                  <button
                    onClick={() => setBookNotFound(false)}
                    className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform duration-300 ease-in-out neon-btn"
                  >
                    Close
                  </button>

                </div>
              </div>
            )}
            {/* Image Container */}
            <header className="bg-white shadow dark:bg-inherit">
              <div className="container mx-auto p-6">
                <img
                  src={B1Child}
                  alt="Book Store"
                  className="w-full max-h-[720px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </header>

            {/* Book Categories Section */}
            <section className="container mx-auto my-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Book Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/romance">

                  <Book
                    genre="Romance"
                    description="Explore our collection of romantic novels."
                  />

                </Link>

                <Link to="/action">
                  <Book
                    genre="Action"
                    description="Dive into thrilling action-packed stories."
                  />
                </Link>

                <Link to="/thriller">
                  <Book
                    genre="Thriller"
                    description="Get your adrenaline pumping with our thrillers."
                  />
                </Link>

                <Link to="/fiction">
                  <Book
                    genre="Fiction"
                    description="Discover imaginative and captivating fiction."
                  />
                </Link>

                <Link to="/tech">
                  <Book
                    genre="Tech"
                    description="Stay updated with the latest in technology."
                  />
                </Link>

                <Link to="/philosophy">
                  <Book
                    genre="Philosophy"
                    description="Dive deep into philosophical thoughts and ideas."
                  />
                </Link>

                <Link to="/manga">
                  <Book
                    genre="Manga"
                    description="Explore our extensive collection of Manga."
                  />
                </Link>
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="bg-gray-200 py-8 dark:bg-[rgb(40,40,40)]">
              <div className="container mx-auto ">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                  New Arrivals
                </h2>
                <Newarrivals onBookClick={(bookTitle) => navigate(`/book/${bookTitle}`)}
                  highlightedBookId={highlightedBookId} />
              </div>
            </section>

            {/* Top Trending Books Section */}

            {/* <section className="container mx-auto my-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Top Trending Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-900 dark:bg-[rgb(30,30,30)]">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Trending Book 1</h3>
                <p className="text-gray-600 dark:text-white">Description of the trending book.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1000 dark:bg-[rgb(30,30,30)]">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Trending Book 2</h3>
                <p className="text-gray-600 dark:text-white">Description of the trending book.</p>
              </div>
            </div>
          </section> */}

            <section className="bg-gray-200 py-8 dark:bg-[rgb(40,40,40)]">
              <div className="container mx-auto ">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                  Trending
                </h2>

                <Trending />

              </div>
            </section>

            {/* Featured Author Section */}
            <section className="container mx-auto my-8 ">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Featured Author
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center dark:bg-[rgb(30,30,30)]">
                <img
                  src={data.featuredAuthor.image}
                  alt={data.featuredAuthor.name}
                  className="w-32 h-32 object-cover rounded-full shadow-lg mr-6"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">
                    {data.featuredAuthor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    {data.featuredAuthor.bio}
                  </p>
                </div>
              </div>
            </section>

            <Review />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
