import { writeFile } from "node:fs/promises";
// Pass the real Play App Signing SHA-256, NOT the upload/debug certificate.
const fingerprints = (process.env.CEA_ANDROID_CERT_SHA256 || "")
  .split(",")
  .map((v) => v.trim().toUpperCase());
if (!fingerprints.length || fingerprints.some((v) => !/^([A-F0-9]{2}:){31}[A-F0-9]{2}$/.test(v))) {
  throw new Error(
    "Set CEA_ANDROID_CERT_SHA256 to the real colon-separated SHA-256 signing fingerprint(s). Nothing was written.",
  );
}
const output = process.argv[2];
if (!output)
  throw new Error(
    "Specify an output JSON path for review before hosting at /.well-known/assetlinks.json.",
  );
await writeFile(
  output,
  JSON.stringify(
    [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "ng.cea.app",
          sha256_cert_fingerprints: fingerprints,
        },
      },
    ],
    null,
    2,
  ) + "\n",
);
console.log(
  "Review this file and publish on https://www.cea.ng/.well-known/assetlinks.json only after verifying signing ownership.",
);
