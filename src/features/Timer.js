import React, { useState } from "react"
import { View, StyleSheet, Text, Vibration, Platform } from "react-native"
import { ProgressBar } from "react-native-paper"

import { colors } from "../utils/colors"
import { spacing } from "../utils/sizes"
import { CountDown } from "../components/CountDown"
import { RoundedButton } from "../components/RoundedButton"

import { Timings } from "./Timings"

const DEFAULT_TIME = 0.1
export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar progress={1} color='#5E84E2' style={{ height: 10 }} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timings />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton title='start' />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='-' size={50} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
})
