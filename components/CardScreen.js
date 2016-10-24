import Exponent from 'exponent'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { shuffle } from 'lodash'
import Card from './Card'

export default class CardScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      cards: [
        "Hey",
        "There",
        "I hope",
        "Your day",
        "Is going",
        "Fantastic!"
      ]
    }
  }

  shuffle = () => {
    this.setState({
      currentIndex: 0,
      cards: shuffle(this.state.cards)
    })
  }

  onNext = () => {
    this.setState({
      currentIndex: (this.state.currentIndex + 1) % this.state.cards.length
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.shuffleButton} onPress={this.shuffle}>
          <Text style={styles.shuffleText}>Shuffle!</Text>
        </TouchableHighlight>
        <Card key={this.state.currentIndex} onNext={this.onNext} text={this.state.cards[this.state.currentIndex]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse'
  },
  shuffleButton: {
    marginTop: 48,
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  shuffleText: {
    fontSize: 16
  }
})