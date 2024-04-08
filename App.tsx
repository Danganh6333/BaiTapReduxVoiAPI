import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import QuanLyChiTieu from './src/screens/QuanLyChiTieu'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store} >
    <QuanLyChiTieu />
  </Provider>
  )
}

export default App

const styles = StyleSheet.create({})