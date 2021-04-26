import React, { useState } from "react"
import { View, StyleSheet, Text, Vibration, Platform } from "react-native"
import { ProgressBar } from "react-native-paper"
import { useKeepAwake } from "expo-keep-awake"

import { colors } from "../utils/colors"
import { spacing } from "../utils/sizes"
import { CountDown } from "../components/CountDown"
import { RoundedButton } from "../components/RoundedButton"
import { Timings } from "./Timings"

const vibrate = () => {
  if (Platform.OS === "ios") {
    const interval = setInterval(() => Vibration.vibrate(), 1000)
    setTimeout(() => clearInterval(interval), 5000)
  } else {
    Vibration.vibrate(5000)
  }

  //   const interval = setInterval(() => Vibration.vibrate(), 1000)
  //   setTimeout(() => clearInterval(interval), 5000)
}

const DEFAULT_TIME = 0.1

export const Timer = ({
  focusSubject,
  clearFocusSubject,
  addFocusItem,
  focusList,
}) => {
  const [isStarted, setIsStarted] = useState(false)
  const [minutes, setMinutes] = useState(DEFAULT_TIME)
  const [progress, setProgress] = useState(1)

  useKeepAwake()

  const onTimeEnd = () => {
    setIsStarted(false)
    setProgress(1)
    setMinutes(DEFAULT_TIME)
    addFocusItem({
      key: String(focusList.length + 1),
      subject: focusSubject,
      status: "completed",
    })
    clearFocusSubject()
    vibrate()
  }

  const onTimeChange = (mins) => {
    setProgress(1)
    setMinutes(mins)
    setIsStarted(false)
  }

  const discardTimer = () => {
    clearFocusSubject()
    addFocusItem({
      key: String(focusList.length + 1),
      subject: focusSubject,
      status: "pending",
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isStarted={isStarted}
          setProgress={setProgress}
          onTimeEnd={onTimeEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color='#5E84E2'
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timings onChangeTime={onTimeChange} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? "Pause" : "Start"}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='-' size={50} onPress={discardTimer} />
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
