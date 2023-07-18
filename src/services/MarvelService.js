import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d80b7335fbee49b526e9ee4e348b104a';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?&${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            pageCount: comics.pageCount
            ? `${comics.pageCount} p.`
            : "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us",
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description ? `${comics.description.slice(0, 210)}...` : 'Sorry.. there is no description about this character :/',
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry.. there is no description about this character :/',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10),
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName}

}

export default useMarvelService;
