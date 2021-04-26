import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { FocusInput } from "./src/features/FocusInput"
import { Timer } from "./src/features/Timer"
import { colors } from "./src/utils/colors"
import { spacing } from "./src/utils/sizes"

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} />
      ) : (
        <View style={{ flex: 1 }}>
          <FocusInput addSubject={(subject) => setFocusSubject(subject)} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
})
