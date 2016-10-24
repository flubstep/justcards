import Exponent from 'exponent'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native'

export default class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      offsetY: new Animated.Value(0),
      offsetX: new Animated.Value(0),
      scale: new Animated.Value(1)
    }
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    })

    this._rotation = this.state.offsetX.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '45deg']
  })
  }

  onPanResponderGrant = (evt, gs) => {

  }

  onPanResponderMove = (evt, gs) => {
    this.state.offsetX.setValue(gs.dx)
    this.state.offsetY.setValue(gs.dy)
  }

  onPanResponderRelease = (evt, gs) => {
    if (Math.abs(gs.dx) < 100) {
      Animated.parallel([
        Animated.spring(this.state.offsetX, { toValue: 0, duration: 100 }),
        Animated.spring(this.state.offsetY, { toValue: 0, duration: 100 })
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(this.state.offsetX, { toValue: gs.dx * 3, duration: 100 }),
        Animated.spring(this.state.offsetY, { toValue: gs.dy * 3, duration: 100 })
      ]).start()
      setTimeout(this.props.onNext, 50)
    }
  }

  componentDidMount() {
    this.state.scale.setValue(0.5)
    Animated.timing(
      this.state.scale,
      { toValue: 1, duration: 100 }
    ).start()
  }

  render() {
    return (
      <Animated.View style={[styles.card, {
        backgroundColor: this.props.color,
        transform: [
          { scale: this.state.scale },
          { translateX: this.state.offsetX },
          { translateY: this.state.offsetY },
          { rotate: this._rotation }
        ]
      }]}
      { ...this._panResponder.panHandlers }
      >
        <Text style={styles.cardText}>{this.props.text}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 300,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center'
  }
})

Card.defaultProps = {
  color: '#FFEEEE',
  text: "Put card text here"
}