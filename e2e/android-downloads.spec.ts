import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
test("native export adapter captures detached anchors before blob URLs are revoked", async ({
  page,
}) => {
  await page.setContent("<h1>Export test</h1>");
  await page.evaluate(() => {
    Object.assign(window, {
      captured: [],
      Capacitor: {
        nativePromise: async (plugin: string, method: string, data: unknown) => {
          (window as unknown as { captured: unknown[] }).captured.push({ plugin, method, data });
        },
      },
    });
  });
  await page.addScriptTag({
    content: await readFile("apps/android/android/app/src/main/assets/native/downloads.js", "utf8"),
  });
  await page.evaluate(() => {
    const url = URL.createObjectURL(
      new Blob(["name,value\nCEA,210"], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
  await expect
    .poll(() => page.evaluate(() => (window as unknown as { captured: unknown[] }).captured.length))
    .toBe(1);
  const exports = await page.evaluate(
    () =>
      (
        window as unknown as {
          captured: {
            plugin: string;
            method: string;
            data: { name: string; mime: string; base64: string };
          }[];
        }
      ).captured,
  );
  expect(exports[0].plugin).toBe("CeaDocuments");
  expect(exports[0].method).toBe("save");
  expect(exports[0].data.name).toBe("report.csv");
  expect(exports[0].data.mime).toBe("text/csv");
  expect(Buffer.from(exports[0].data.base64, "base64").toString()).toBe("name,value\nCEA,210");
});
