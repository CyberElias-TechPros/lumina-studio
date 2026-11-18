# CEA Lesson Note — CEA-HWS-002 · Session 7: Software & System Servicing

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-HWS-002-S7       |
| Version     | 1.0 · Session 7 of 8 · Week 4 |

## 0–10 · Review & warm-up

SFC screenshots waved proudly — or read the error; room advises on the erroring ones.

## 10–25 · Teaching block

**OS installation.** USB from Media Creation Tool (official ISO only) · BIOS boot order (F12 menu) · partitions:
fresh = delete-all, clean install (KEEPS nothing — hence backup rule) · unattended + drivers injection optional · activation (license key location taught).

**Drivers & updates.** Chipset → LAN/Wi-Fi → GPU → audio → peripherals; Windows Update once online;
vendor pages for the rest; `devmgmt.msc` for check; no "driver booster" apps — ever (adware factories).

**Backup before ANY service.** User folders (Documents/Desktop/Pictures + browser profiles + WhatsApp Desktop folder!) →
external drive or cloud; verify by opening two files; write "backed up 2026-11-16" on the job card — the ugliest call is "we reinstalled and lost your photos".

**User accounts.** Local vs Microsoft account; admin vs standard; create for the user, password hand-dealt in an envelope, kids' accounts standard;
Guest off. Malware awareness: antivirus sanity (Defender fine), don't open "invoice.exe", show the customer ONE phishing example they almost fell for — eyes open forever.

**Performance honesty.** What actually speeds old machines: SSD swap (night and day), RAM to 8GB+, uninstall 3 junk toolbars, power plan High Performance;
what does NOT: RAM "cleaners", registry "optimizers", 40 startup apps wishfully disabled manually — show Startup tab method instead.

## 25–45 · Guided demonstration

Live clean-install in VM/sandbox machine: USB boot → partition → install → first login → updates → drivers → verify internet → create standard user → envelope ritual.

## 45–70 · Guided practice

Pairs: each performs the full sequence on their bench unit (no personal data); log timings; deliberately mis-set boot order once to learn the F12 rescue.

## 70–95 · Independent practice

Solo: complete the **service documentation template** for your bench unit — intake condition, backup proof, work done, verification, handover instructions. File to workbook.

## 95–110 · Correction & check

KC7: (1) USB installer source rule. (2) Driver order priority. (3) Backup before/after rule with proof. (4) Admin vs standard — which for kids. (5) One fake-fix app to avoid.

## 110–120 · Summary & next session

Software is the half customers feel daily. Next: service like a business — workflow, documentation, the final faulted machine.

## Answers — KC7

1. Official Microsoft media only; third-party ISOs = your problem. 2) Chipset → LAN → GPU → audio → peripherals. 3) Verify by opening files before erasing anything; write the date on the job card. 4) Standard — admin lives with adults only. 5) Any of: registry cleaners, driver boosters, RAM cleaners.

## Homework (15 min)

List your own startup programs; kill the two most useless.
