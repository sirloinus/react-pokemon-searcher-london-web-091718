import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleChange = event => {
    const value = event.target.value
    if (event.target.name === 'name') {this.setState({ name: value })}
    if (event.target.name === 'hp') {this.setState({ hp: value })}
    if (event.target.name === 'frontUrl') {this.setState({ frontUrl: value })}
    if (event.target.name === 'backUrl') {this.setState({ backUrl: value })}
  }

  handleSubmit = async () => {
    const newPokemon = {
      name: this.state.name,
      stats: [
        {
          name: 'hp',
          value: this.state.hp
        }
      ],
      sprites: {
        front: this.state.frontUrl,
        back: this.state.backUrl
      }
    }
    const pokemon = await this.createPokemon(newPokemon)
    this.props.addPokemonToPage(pokemon)
  }

  createPokemon = async pokemon => {
    const response = await fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    return response.json()
  }

  render() {
    const { handleChange, handleSubmit } = this
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input onChange={handleChange} fluid label="Name" placeholder="Name" name="name" />
            <Form.Input onChange={handleChange} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input onChange={handleChange} fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input onChange={handleChange} fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
