import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCaracter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])


   const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if(!charId){
            return;
        }

        clearError()
        getCaracter(charId)
            .then(onCharLoaded)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton} 
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const notFoundImageStyle = thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'contain'} : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={notFoundImageStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <Comicses char={char}/>
            </ul>
        </>
    )
}

const Comicses = ({char}) => {
    if(char.comics.length < 1) {
        return (
                "Sorry... There is no comic with this caracter"
        )
    }
    return char.comics.map((comics,i) => {
        return  (
        <li className="char__comics-item" key={i}>
            {comics.name}
        </li>
        )
    })
}

CharInfo.propTypes = {
    charId: PropTypes.number // set the type of props
}

export default CharInfo;