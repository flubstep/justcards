import Exponent from 'exponent'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import CardScreen from './components/CardScreen'

class App extends React.Component {

  render() {
    return (
      <CardScreen />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Exponent.registerRootComponent(App)
