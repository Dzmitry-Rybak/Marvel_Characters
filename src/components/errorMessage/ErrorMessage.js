import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={img} alt='Error' style={{margin: "0 auto", width: "150px", display: 'block'}}/>
    )
}

export default ErrorMessage;