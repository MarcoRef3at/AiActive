import { Notify } from "quasar";

export function showNotif(Notification, Caption) {
  Notify.create({
    message: Notification.charAt(0).toUpperCase() + Notification.slice(1),
    caption: Caption,
    color: "negative",
    multiLine: true,
    position: "top"
  });
}
