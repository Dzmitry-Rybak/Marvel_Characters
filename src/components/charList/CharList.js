
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService'

const CharList = (props) =>  {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newCharList) => {
        
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => charList = [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);

    }

    // using ref to set change className to selected character:
    const charRefList = useRef([]);

    // const setCharRef = char => {
    //     if(char) {
    //         char.setAttribute('tabindex', '0')
    //         this.charRefList.push(char);
    //     }
    // }
 
    const focusOnChar = (index) => {
        charRefList.current.forEach(item => item.classList.remove('char__item_selected'));
        charRefList.current[index].classList.add('char__item_selected');
    }
    
    const renderItems = (list) => {
        return list.map((char, index) => (
            <li 
                ref = {el => charRefList.current[index] = el}  // el - link on DOM-element
                className="char__item"
                key={char.id}
                onClick={() => {
                    props.onCharSelected(char.id);
                    focusOnChar(index);
                    }}
                onKeyDown = {(event) => {
                    if(event.key === ' ' || event.key === 'Enter') {
                        props.onCharSelected(char.id);
                        focusOnChar(index);
                    }
                }}>
                    <img src={char.thumbnail} style={char.thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'unset'} : null} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
            </li>
        ))
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading   ? <Spinner style={{margin: '0 auto'}}/> : null;


    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid">
                {items}
            </ul>
            <button 
                className="button button__main button__long"
                style={{'display': charEnded ? 'none' : 'block'}}
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;