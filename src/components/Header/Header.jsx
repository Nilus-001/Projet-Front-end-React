import styles from './Header.module.css'
import {Link} from "react-router";
import {useFavoritesContext} from "../../contexts/FavoritesContext.jsx";

export default function Header() {

    const {favorites} = useFavoritesContext();
    return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/" aria-current="page">Bibliothèque</Link></li>
          <li><Link to="/" aria-current="page">Contact</Link></li>
            <li><span>{favorites}</span></li>
        </ul>
      </nav>

    </header>
  )
}
