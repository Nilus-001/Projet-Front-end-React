import bookCover from '../../assets/moby-dick.png'
import styles from './Home.module.css'
import BookCard from "../../components/BookCard/BookCard.jsx";
import {useEffect, useState} from "react";
import searchBooks from "../../api/search/book.js";

export default function Home() {

    const listOfBooks = [
        { img : bookCover , title : "Moby-Dick" , author : "Herman Melville" , year : 1851 },
        { img : bookCover , title : "Vingt mille lieues sous les mers" , author : "Jules Verne" , year : 1870 },
        { img : bookCover , title : "L’Île au trésor" , author : "Robert Louis Stevenson" , year : 1883 }
    ];

    const [searchContent, setSearchContent] = useState('');
    const [query,setQuery] = useState('normal');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchBooks = async () => {
            setLoading(true)
            setBooks([])
            setError(null)

            const data = await searchBooks(query);
            console.log("data : " + data.items ?? "null");
            if (data.error) {
                setError(data.error.message);
                return;
            }
            setBooks(data.items)
            setLoading(false)
        }

        fetchBooks();

    }, [query])


    function handleSearch(e) {
      e.preventDefault()
      let search = searchContent.trim() === "" ? "normal" : searchContent.trim();
      setQuery(search.trim());


    }


    return (
    <main className={styles.page}>
      <h1 className={styles.title}>Bibliothèque</h1>
      <p className={styles.description}>
        Bienvenue dans notre bibliothèque. Découvrez notre{' '}
        <strong>sélection de romans d’aventure</strong> et consultez la fiche
        d’un livre pour en savoir plus. Cette sélection vous invite à explorer
        des récits d’aventure et des univers imaginaires.{' '}
        <em>Quel sera votre prochain voyage ?</em>
      </p>

      <form action="index.html" method="get" onSubmit={handleSearch}>
        <div className={styles.searchField}>
          <input
            type="search"
            name="q"
            id="book-name"
            aria-label="Rechercher un livre"
            placeholder="Rechercher un titre, un auteur..."
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}

          />
          <button type="submit" aria-label="Rechercher" >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
        </div>
      </form>




      <section className={styles.catalogue}>
        <h2>Les livres de la bibliothèque</h2>
          {error ? <span>{error}</span>: null}
          {loading === true ? <span>...loading</span> : null}
        <ul className={styles.bookList}>
          {
              books?.map((book, index) => (
                <BookCard
                    key={index}
                    img={book.volumeInfo?.imageLinks?.thumbnail ?? null}
                    author={book.volumeInfo.authors ?? "none"}
                    id={book.id}
                    title={book.volumeInfo.title.slice(0,22) + (book.volumeInfo.title.length > 15 ? "..." : "")}
                    year={book.volumeInfo.publishedDate}
                />
            ))
          }
        </ul>
      </section>
    </main>
  )
}
