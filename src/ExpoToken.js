import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const PUSH_ENDPOINT = "";

export default async function registerForPushNotificationAsync() {
  const { status: exisitingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = exisitingStatus;

  //ios
  if (exisitingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // 허락 안해주면 배째
  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  console.log(token);
}
