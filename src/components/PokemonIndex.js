import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filter: ''
  }

  getPokemons = async () => {
    const response = await fetch('http://localhost:3000/pokemon')
    const pokemons = await response.json()
    this.setState({ pokemons })
  }

  componentDidMount() {
    this.getPokemons()
  }

  updateFilter = event => {
    const filter = event.target.value
    this.setState({ filter })
    console.log(filter)
  }

  filterPokemon = () => {
    const pokemons = [...this.state.pokemons]
    return pokemons.filter( pokemon => pokemon.name.includes(this.state.filter))
  }

  addPokemonToPage = pokemon => {
    const pokemons = [...this.state.pokemons]
    pokemons.push(pokemon)
    this.setState({ pokemons: pokemons })
    console.log(this.state.pokemon)
  }

  render() {
    const { filterPokemon, updateFilter, addPokemonToPage } = this
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={event => updateFilter(event)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={filterPokemon()}/>
        <br />
        <PokemonForm addPokemonToPage={addPokemonToPage}/>
      </div>
    )
  }
}

export default PokemonPage
