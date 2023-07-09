import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import avantagers from '../../resources/img/Avengers.png';
import avantagersLogo from '../../resources/img/Avengers_logo.png';


import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(21);
    const {loading, error, getAllComics} = useMarvelService();

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        setNewComicsLoading(true)
        getAllComics(offset)
            .then(comicsesLoaded)
    }

    const comicsesLoaded = (newComics) => {
        setComicsList(comicsList => [...comicsList, ...newComics]);
        setNewComicsLoading(false)
        setOffset(offset => offset + 9)
    }

    const renderComics = (items) => {
        return items.map((item, i) => (
            <li className="comics__item" key={i}>
            <Link to={`/comics/${item.id}`}>
                <img src={item.thumbnail} style={item.thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'unset'} : null} alt={item.title} className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{`${item.price !== 0 ? `${item.price}$` : 'NOT AVAILABLE'} `}</div>
            </Link>
        </li>
        ))
    } 

     const items = renderComics(comicsList);

    return (
        <main>
            <div className="comics__list">
                {spinner}
                {errorMessage}
                <ul className="comics__grid">
                    {items}
                </ul>
                <button className="button button__main button__long"
                        onClick={() => onRequest(offset)}
                        disabled={newComicsLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        </main>
    )
}

export default ComicsList