import ProfileImg from './assets/ippo.jpg'

function Card(){
    return(
        <div className="card">
            <img className='cardImg' src={ProfileImg} alt="card image" />
            <h2>KraftReport</h2>
            <p>I am junior developer</p>
        </div>
    )
}

export default Card