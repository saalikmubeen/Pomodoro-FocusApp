import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"

import { fontSizes, spacing } from "../utils/sizes"
import { colors } from "../utils/colors"

export const CountDown = () => {
  return <Text style={styles.text}>30:00</Text>
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
