import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: []
  }

  getPokemons = async () => {
    const response = await fetch('http://localhost:3000/pokemon')
    const pokemons = await response.json()
    this.setState({ pokemons })
  }

  componentDidMount() {
    this.getPokemons()
  }

  render() {
    const { pokemons } = this.state
    const { getPokemons } = this
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={pokemons} />
        <br />
        <PokemonForm getPokemons={getPokemons}/>
      </div>
    )
  }
}

export default PokemonPage
