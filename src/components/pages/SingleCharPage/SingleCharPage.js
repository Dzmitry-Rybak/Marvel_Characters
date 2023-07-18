import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../../services/MarvelService";
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import "./singleCharPage.scss";

const SingleCharPage = () => {

    const {id} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [id])

    const updateChar = () => {
        clearError()
        getCharacter(id)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    return(
        <>
            <div className="single-comic">
                <img src={char.thumbnail} alt={char.name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{char.name}</h2>
                    <p className="single-comic__descr">{char.description}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharPage;