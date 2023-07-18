import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss'

const validate = values => {

    const error = {};

    if(!values.charName) {
        error.charName = 'This field is required'
    }

    return error;
}

const CharSearchForm = () => {
    const [charInfo, setCharInfo] = useState(null);

    const {error, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setCharInfo(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const formik = useFormik({
        initialValues: {
            charName: ''
        },
        validate,
        onSubmit: values => updateChar(values.charName)
    })

    const errorMessage = error ? <ErrorMessage/> : null;
    const result = !charInfo ? null : charInfo.length > 0 ? 
                            <div className="search__wrapper">
                                <div className='search-success'>There is! Visit <span style={{textDecoration: 'underline'}}>{charInfo[0].name}</span> page?</div>
                                <Link to={`/characters/${charInfo[0].id}`} className="button button__secondary">
                                    <div className="inner">To page</div>
                                </Link>
                            </div>
                             : 
                            <div className='error'>The character was not found. Check the name and try again</div>

    return (
        <form className='form' onSubmit={formik.handleSubmit}>
            <h2 className='form__title'>Or find a character by name:</h2>
            <input 
                id='charName' 
                type='text' 
                name='charName' 
                placeholder='Enter name'
                value={formik.values.charName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}/>
            <button type='submit' className="button button__main">
                    <div className="inner">Find</div>
            </button>
            {formik.errors.charName && formik.touched.charName ? <div className='error'>{formik.errors.charName}</div> : null}
            {errorMessage}
            {result}
        </form>
    )
}

export default CharSearchForm