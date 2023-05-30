
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService'




class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
        
    }

    onCharListLoaded = (newCharList) => {
        
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))

    }
    
    onError = () => {
        this.setState({
            error: true})
    }

    // using ref to set change className to selected character:
    charRefList = [];
    setCharRef = char => {
        if(char) {
            char.setAttribute('tabindex', '0')
            this.charRefList.push(char);
        }
    }

    focusOnChar = (index) => {
        this.charRefList.forEach(item => item.classList.remove('char__item_selected'));
        this.charRefList[index].classList.add('char__item_selected');
    }
    
    renderItems = (list) => {
        return list.map((char, index) => (
            <li 
                ref = {this.setCharRef}  // ref - element li 
                className="char__item"
                key={char.id}
                onClick={() => {
                    this.props.onCharSelected(char.id);
                    this.focusOnChar(index);
                    }}
                onKeyDown = {(event) => {
                    if(event.key === ' ' || event.key === 'Enter') {
                        this.props.onCharSelected(char.id);
                        this.focusOnChar(index);
                    }
                }}>
                    <img src={char.thumbnail} style={char.thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'unset'} : null} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
            </li>
        ))
    }

    render() {
        
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner style={{margin: '0 auto'}}/> : null;
        const items = this.renderItems(charList);
        const content = !(loading || errorMessage) ? items : null;


        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    style={{'display': charEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                        <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;