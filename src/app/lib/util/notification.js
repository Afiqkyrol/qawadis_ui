import { notifications } from "@mantine/notifications";

export function notificationError(title, message) {
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
