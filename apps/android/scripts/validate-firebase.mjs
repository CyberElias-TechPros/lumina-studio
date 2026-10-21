import { readFile } from "node:fs/promises";
const filename = new URL("../android/app/google-services.json", import.meta.url);
const config = JSON.parse(await readFile(filename, "utf8"));
if ("private_key" in config || config.type === "service_account")
  throw new Error("Never put a service-account key in the Android app.");
if (
  config.project_info?.project_id !== "cyber-elias-academy-app" ||
  config.project_info?.project_number !== "327984401909"
)
  throw new Error("Unexpected Firebase project.");
const clients = config.client?.filter(
  (c) => c.client_info?.android_client_info?.package_name === "ng.cea.app",
);
if (
  clients?.length !== 1 ||
  !clients[0].client_info.mobilesdk_app_id?.startsWith("1:327984401909:android:") ||
  !clients[0].api_key?.[0]?.current_key
)
  throw new Error("Firebase Android client must match ng.cea.app.");
console.log(
  "Firebase Android client verified: cyber-elias-academy-app / ng.cea.app. This does not configure server-side FCM delivery.",
);
