
import { Component } from 'react';
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
        activeChar: null,
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

    selectedChar = (i) => {
        this.setState({
            activeChar: i
        })
        this.props.onCharSelected(i);
    }



    renderItems = (list) => {
        return list.map(char => (
            <li 
                className={ this.state.activeChar === char.id ? "char__item char__item_selected" : "char__item"} 
                key={char.id}
                onClick={() => this.selectedChar(char.id)}>
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