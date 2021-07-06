import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


const UpdateMovie = props => {
    //console.log('list:',props.list, 'movies:',props.movies, props)
    const [input, setInput] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const { id } = useParams();
    //console.log('id',id)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setInput(res.data))
            .catch(err => console.log(err.response));

    

    //const movieToUpdate = props.movies.find(item => `${item.id}` === id && item)
    //console.log(movieToUpdate)

        // if (movieToUpdate) {
        //     setInput(movieToUpdate)
        // }
    }, [id])

    input.stars.filter(item => `${item.id}` === id && input.stars.push(item.stars))
    console.log(input.stars)

    const handleChange = e => {
        e.preventDefault();
        setInput({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, input)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

        props.history.push(`/movies/${id}`)
    }

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                value={input.title}
                placeholder='title'
                onChange={handleChange}
                />

                <input
                type='text'
                name='director'
                value={input.director}
                placeholder='director'
                onChange={handleChange}
                />

                <input
                type='text'
                name='metascore'
                value={input.metascore}
                placeholder='metascore'
                onChange={handleChange}
                />

                <h3>Actors</h3>
                    {input.stars.map((star, index) => (
                        <input
                        key={index}
                        type='text'
                        name='star'
                        defaultValue={star}
                        placeholder='actor'
                         />
                    ))}
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
