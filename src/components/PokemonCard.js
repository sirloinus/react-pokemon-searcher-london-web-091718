import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    spriteToggle: true
  }

  getHP = pokemon => {
    const hp = pokemon.stats.filter(stat => stat.name === 'hp')
    return hp[0].value

  }

  render() {
    const { pokemon } = this.props
    const sprite = this.state.spriteToggle ? pokemon.sprites.front : pokemon.sprites.back
    return (
      <Card>
        <div>
          <div className="image" onMouseOver={() => this.setState({ spriteToggle: false })} onMouseOut={() => this.setState({ spriteToggle: true })}>
            <img src={sprite}/>
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHP(pokemon)}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
