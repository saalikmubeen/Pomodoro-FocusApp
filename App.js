import { StatusBar } from "expo-status-bar"
import React, { useState, useEffect } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FocusHistory } from "./src/features/FocusHistory"
import { FocusInput } from "./src/features/FocusInput"
import { Timer } from "./src/features/Timer"
import { colors } from "./src/utils/colors"
import { spacing } from "./src/utils/sizes"

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  const [focusList, setFocusList] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("focusList")
        if (value) {
          setFocusList(JSON.parse(value))
        }
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("focusList", JSON.stringify(focusList))
      } catch (err) {
        console.log(err)
      }
    }

    storeData()
  }, [focusList])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          clearFocusSubject={() => setFocusSubject(null)}
          addFocusItem={(item) => setFocusList([...focusList, item])}
          focusList={focusList}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FocusInput addSubject={(subject) => setFocusSubject(subject)} />
          <FocusHistory
            focusHistory={focusList}
            setFocusHistory={() => setFocusList([])}
          />
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
