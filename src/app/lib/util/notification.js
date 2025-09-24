import { notifications } from "@mantine/notifications";

let lastNotification;

export function notificationError(title, message) {
  // In test environment we avoid triggering UI notifications to keep tests clean
  if (process.env.NODE_ENV === "test") return;

  if (lastNotification === message) return;
  lastNotification = message;

  notifications.show({
    title: title,
    message: message,
    position: "top-right",
    withCloseButton: true,
    autoClose: 5000,
    color: "red",
    loading: false,
  });
}
