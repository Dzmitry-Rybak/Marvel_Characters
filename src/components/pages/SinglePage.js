import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        onUpdateData()
    }, [id])

    const onUpdateData = () => {
        clearError();

        switch (dataType){
            case 'comic':
                getComic(id).then(onDataLoaded);
                break
            case 'char':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = data => {
        setData(data);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SinglePage;