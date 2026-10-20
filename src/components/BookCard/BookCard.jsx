import styles from './BookCard.module.css'
import {Link} from "react-router";
export default function  BookCard({id, img, title, author, year}) {
    return (
        <li>
            <Link className={styles.bookCard} to={"/book/" + id} >
                <img className={styles.bookCover} src={img} alt="" />
                <div className={styles.bookContent}>
                    <h3 className={styles.bookTitle}>{title}</h3>
                    <p className={styles.bookMeta}>
                        <span className={styles.bookAuthor}>{author}</span>
                        <time dateTime="1851">{year}</time>
                    </p>
                </div>
            </Link>
        </li>
    )
}
