import React from 'react'
import {useParams} from 'react-router-dom'

function PokemonDetail() {
    const {id} = useParams() 
  return (
    <div><h1>I am ({id})</h1></div>
  )
}

export default PokemonDetail