import * as Notifications from "expo-notifications"

export const triggerLocalNotification = async (time) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your Focus time is up! 🎉",
      body: `Yay, you successfully managed to focus for ${time} minutes ✨. Try focussing for another ${time} minutes. 👍`,
      data: { data: "goes here" },
    },
    trigger: { seconds: 3 },
  })
}
