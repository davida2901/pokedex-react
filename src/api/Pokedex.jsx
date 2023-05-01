import axios from "axios"

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
})

// export const getPokemon = async () =>{
//   const response = await api.get("/pokemon")
//   return response.data
  
// }
export const getPokemon = async()=>{
  const response = await api.get("/pokemon")
  const pokemonList = response.data
  // const pokemonData = await Promise.all(
  //   pokemonList.map(async (pokemon)=>{
  //     const {data} = await axios.get(pokemon.url)
  //     return data
  //   })
  // )


  return pokemonList
}
