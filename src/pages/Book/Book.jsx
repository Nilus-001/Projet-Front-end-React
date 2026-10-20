import bookCover from '../../assets/moby-dick.png'
import styles from './Book.module.css'
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBookById} from "../../api/search/book.js";

export default function Book() {
  const id = useParams().id;
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");

  function UpdateBook(b){
    setName(b.volumeInfo.title ?? "");
    setAuthor(b.volumeInfo.authors ?? "");
    setImg(b.volumeInfo.imageLinks?.thumbnail ?? null);
    setDate(b.volumeInfo.publishedDate)
    setSummary(b.volumeInfo.description)
    setLanguage(b.volumeInfo.language)
    setGenre(b.volumeInfo.categories)
  }

  useEffect(() => {
    getBookById(id).then(book => {
        UpdateBook(book);
    });

  })

  return (
    <main className={styles.page}>
      <article className={styles.bookDetail}>
        <div className={styles.bookSidebar}>
          <img
            className={styles.detailCover}
            src={img}
            alt={"Couverture du roman "+ name}
            width="667"
            height="1000"
          />
          <div className={styles.bookActions}>
            <button
              className={[styles.bookAction, styles.primary].join(' ')}
              type="button"
              command="show-modal"
              commandFor="command-dialog"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add_circle
              </span>
              Commander le livre
            </button>
            <a className={styles.bookAction} href="#resume">
              <span className="material-symbols-outlined" aria-hidden="true">
                menu_book
              </span>
              Lire le résumé
            </a>
          </div>
        </div>

        <div className={styles.bookInformation}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <ol>
              <li><Link to="/">Bibliothèque</Link></li>
              <li aria-current="page">{name}</li>
            </ol>
          </nav>

          <h1>{name}</h1>
          <p className={styles.detailAuthor}>{author}</p>

          <dl className={styles.detailMetadata}>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                calendar_today
              </span><span className={styles.visuallyHidden}>Première publication</span>
              </dt>
              <dd><time dateTime="1851">{date}</time></dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                translate
              </span><span className={styles.visuallyHidden}>Langue originale</span>
              </dt>
              <dd>{language}</dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                auto_stories
              </span><span className={styles.visuallyHidden}>Genre</span>
              </dt>
              <dd>{genre}</dd>
            </div>
          </dl>

          <section className={styles.bookSummary} id="resume">
            <h2 className={styles.visuallyHidden}>Présentation</h2>
            <div dangerouslySetInnerHTML={{ __html: summary }} />


          </section>
        </div>
      </article>

      <dialog
        className={styles.orderDialog}
        id="command-dialog"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title">Commande enregistrée</h2>
        <p>Merci pour votre intérêt pour Moby-Dick.</p>
        <form method="dialog">
          <button className={[styles.bookAction, styles.primary].join(' ')} type="submit">Fermer</button>
        </form>
      </dialog>
    </main>
  )
}
