import React, { useState, useEffect, useRef } from "react"
import { Text, View, StyleSheet } from "react-native"

import { fontSizes, spacing } from "../utils/sizes"
import { colors } from "../utils/colors"

const formatTime = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000)
  const remaining = milliSeconds - minutes * 60000
  const seconds = remaining / 1000

  const mins = minutes < 10 ? `0${minutes}` : minutes
  const secs = seconds < 10 ? `0${seconds}` : seconds
  return { mins, secs }
}

export const CountDown = ({ minutes, isStarted, setProgress, onTimeEnd }) => {
  const [milliSeconds, setMilliSeconds] = useState(minutes * 60 * 1000)
  const interval = useRef(null)

  const startCountDown = () => {
    setMilliSeconds((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        // onTimeEnd()
        return 0
      } else {
        timeLeft = time - 1000
        return timeLeft
      }
    })
  }

  useEffect(() => {
    if (!isStarted) {
      interval.current && clearInterval(interval.current)
      return
    }

    interval.current = setInterval(startCountDown, 1000)

    return () => interval.current && clearInterval(interval.current)
  }, [isStarted])

  useEffect(() => {
    setProgress(milliSeconds / (minutes * 60 * 1000))
    if (milliSeconds === 0) {
      onTimeEnd()
    }
  }, [milliSeconds])

  useEffect(() => {
    setMilliSeconds(minutes * 60 * 1000)
  }, [minutes])

  return (
    <Text style={styles.text}>
      {formatTime(milliSeconds).mins}: {formatTime(milliSeconds).secs}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
})
