import { Notify } from "quasar";

export function showNotif(Notification) {
  Notify.create({
    message: Notification,
    color: "negative",
    multiLine: true,
    position: "center"
  });
}
