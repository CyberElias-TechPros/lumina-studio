# Actor: Operations Manager

## 1. Identity & Role Definition

**Actor Name:** Operations Manager  
**System Role ID:** `role_operations_manager`  
**Description:** The Operations Manager oversees the day-to-day operational functions of Cyber Elias Academy across all physical and digital infrastructure. This role manages branches, inventory, facilities, vendor relationships, task workflows, process automation, and generates operational reports. The Operations Manager ensures the academy runs smoothly, efficiently, and cost-effectively.

**Operations Areas:**

1. **Branch Management** — Multi-campus operations, capacity, compliance
2. **Inventory Management** — Supplies, equipment, software licenses, consumables
3. **Facilities Management** — Building maintenance, room scheduling, safety, utilities
4. **Task Management** — Work orders, assignments, deadlines, team coordination
5. **Process Automation** — Workflow design, triggers, approval chains, bots
6. **Vendor Management** — Contracts, SLAs, performance, payments
7. **Operational Reports** — Dashboards, KPIs, audits, compliance

**Employment States:**

1. **Active** — Currently managing operations
2. **On Leave** — Temporarily away
3. **Inactive** — No longer in role

---

## 2. Primary Goals & Success KPIs

**Goal 1: Maintain Operational Efficiency**

- KPI: Facility uptime ≥ 99.5%
- KPI: Work order completion rate ≥ 95% within SLA
- KPI: Inventory stockout incidents = 0 per month
- KPI: Branch utilization rate ≥ 80%

**Goal 2: Optimize Inventory & Procurement**

- KPI: Inventory accuracy (cycle count) ≥ 98%
- KPI: Procurement lead time ≤ 5 business days
- KPI: Cost per order reduction YoY ≥ 5%
- KPI: Vendor on-time delivery rate ≥ 95%

**Goal 3: Streamline Facilities Management**

- KPI: Maintenance request response time ≤ 2 hours
- KPI: Preventive maintenance compliance ≥ 90%
- KPI: Room booking utilization ≥ 75%
- KPI: Energy cost reduction YoY ≥ 3%

**Goal 4: Automate Operational Processes**

- KPI: Processes automated per quarter ≥ 3
- KPI: Automation error rate ≤ 1%
- KPI: Manual processing hours reduced ≥ 20% YoY

**Goal 5: Manage Vendor Relationships**

- KPI: Vendor SLA compliance ≥ 90%
- KPI: Contract renewal rate ≥ 85%
- KPI: Vendor spend variance ≤ ±5%

**Goal 6: Generate Actionable Reports**

- KPI: Report delivery on-time = 100%
- KPI: Insight-to-action conversion rate ≥ 70%
- KPI: Audit findings resolved within 30 days = 100%

---

## 3. Complete Screen Inventory

### Screen 3.1: Operations Hub (`/ops/dashboard`)

**Purpose:** Executive overview of all operational domains with real-time status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Operations Hub                                    [Period: Today ▼]│
│  Welcome, David — Operations Manager                    [Settings ▼]│
├────────────────┬────────────────┬────────────────┬──────────────────┤
│  Branches (3)  │  Inventory     │  Facilities    │  Vendors (24)    │
│  ┌──────────┐  │  ┌──────────┐  │  ┌──────────┐  │  ┌────────────┐  │
│  │ Main     │  │  │ Stock    │  │  │ Work     │  │  │ Active     │  │
│  │ Campus   │  │  │ Items:   │  │  │ Orders:  │  │  │ Contracts: │  │
│  │ 85% cap  │  │  │ 1,245    │  │  │ 8 open   │  │  │ 18         │  │
│  │ [Manage] │  │  │ 3 low    │  │  │ 2 over   │  │  │ 2 expiring │  │
│  ├──────────┤  │  ├──────────┤  │  │ due   ⚠  │  │  ├────────────┤  │
│  │ Satellite│  │  │ [Manage] │  │  │ [Manage] │  │  │ [Manage]   │  │
│  │ 62% cap  │  │  └──────────┘  │  └──────────┘  │  └────────────┘  │
│  ├──────────┤  │                │                │                   │
│  │ Online   │  │  Tasks (12)   │  Automation    │  Reports         │
│  │ Virtual  │  │  ┌──────────┐  │  ┌──────────┐  │  ┌────────────┐  │
│  │ N/A      │  │  │ 8 active │  │  │ 4 active  │  │  │ 3 sched    │  │
│  └──────────┘  │  │ 3 overdue│  │  │ flows     │  │  │ reports    │  │
│  [Manage All]  │  │ [View]   │  │  │ 2 failed ⚠│  │  │ due this   │  │
│                │  └──────────┘  │  │ [Manage]  │  │  │ week      │  │
│                │                │  └──────────┘  │  │ [View]     │  │
├────────────────┴────────────────┴────────────────┴──────────────────┤
│  Alerts (4)                                                            │
│  🔴 Server Room Temp > 30°C — HVAC maintenance overdue              │
│  🟡 Printer toner low across all branches — reorder needed          │
│  🟡 Vendor contract "SecurityCam Inc" expiring in 30 days           │
│  🔴 Fire extinguisher inspection overdue at Main Campus             │
├──────────────────────────────────────────────────────────────────────┤
│  Quick Actions                                                          │
│  [New Work Order] [Order Supplies] [Schedule Maintenance]            │
│  [New Vendor Contract] [Create Automation] [Generate Report]          │
└──────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/dashboard`

**States:**

- **Loading:** 4-column metric card skeleton + alert skeleton
- **Error:** "Unable to load operations overview. [Retry]"
- **Empty (new):** "Welcome! Configure your branches and inventory to get started."
- **No alerts:** Green "All systems operational" banner

### Screen 3.2: Branch Management (`/ops/branches`)

**Purpose:** Manage all campus locations, capacity, hours, operational status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Branch Management                                        [+ Add]   │
├─────────────────────────────────────────────────────────────────────┤
│  Branch Cards                                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🏢 Main Campus (HQ)                                        │  │
│  │  123 Cyber Lane, Tech City, ST 12345                        │  │
│  │  Status: 🟢 Open | Hours: 7AM - 10PM | Capacity: 85% (340/400)│  │
│  │  Facilities: 12 classrooms, 4 labs, 2 auditoriums           │  │
│  │  [View Details] [Edit] [Close Branch] [View Schedule]        │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🏢 Satellite Campus - Downtown                             │  │
│  │  456 Business Ave, Tech City, ST 12345                      │  │
│  │  Status: 🟢 Open | Hours: 8AM - 6PM | Capacity: 62% (62/100)│  │
│  │  Facilities: 3 classrooms, 1 lab                            │  │
│  │  [View Details] [Edit] [Close Branch] [View Schedule]        │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Branch Detail: Main Campus                                           │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Operating Hours:                                              │  │
│  │  Mon-Thu: 7AM-10PM | Fri: 7AM-8PM | Sat: 9AM-5PM | Sun: Closed│
│  │  Holiday Schedule: [Configure]                                │  │
│  │                                                              │  │
│  │  Capacity Alerts:                                             │  │
│  │  ● Weekdays 2-5PM: Near capacity (90%) — consider staggering │  │
│  │  ● Lab 3 (Room 204): Over capacity on Tuesdays               │  │
│  │                                                              │  │
│  │  Compliance:                                                  │  │
│  │  ✅ Fire Safety — Up to date | Last inspection: Oct 1        │  │
│  │  ✅ ADA Compliance — Certified | Last audit: Sep 15          │  │
│  │  ⚠ Security Audit — Due Nov 15                               │  │
│  │                                                              │  │
│  │  [Edit Hours] [Set Capacity] [Manage Rooms] [Compliance Log] │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/branches`, `POST /api/ops/branches`, `PUT /api/ops/branches/:id`

### Screen 3.3: Inventory Management (`/ops/inventory`)

**Purpose:** Track all physical stock — supplies, equipment, consumables, software licenses.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Inventory Management                         [Add Item] [Order]    │
│  [All] [Low Stock] [Out of Stock] [Overstock]  🔍 [Search...]     │
│  Category: [All ▼]  |  Location: [All ▼]                         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐│
│  │ Item     │ SKU      │ Category │ Stock   │ Min / Max│ Actions  ││
│  ├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤│
│  │ Printer  │ TON-HP26│ Consum.  │ 12 units │ 20 / 100 │ [Order]  ││
│  │ Toner    │         │          │ 🟡 Low   │          │ [Edit]   ││
│  │ Lab VM   │ SW-VMW  │ Software │ 48 lic   │ 50 / 200 │ [Renew]  ││
│  │ License  │         │          │ 🟡 Low   │          │          ││
│  │ White-   │ BRD-WHT │ Supplies │ 500      │ 100 / 500│ [Order]  ││
│  │ boards   │ 3x4     │          │ ✅ OK    │          │          ││
│  │ Network  │ CBL-CAT6│ Equip.   │ 200      │ 50 / 300 │ [Reorder]││
│  │ Cables   │         │          │ ✅ OK    │          │          ││
│  │ Lab      │ EQ-LAB  │ Equip.   │ 0        │ 5 / 20   │ [Order   ││
│  │ Routers  │ RTR-01  │          │ 🔴 OOS  │          │  Urgent] ││
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Inventory Summary                                                      │
│  Total Items: 1,245 | Low Stock: 3 | Out of Stock: 1 | Overstock: 0 │
│  Estimated Value: $245,000 | Monthly Consumption: $12,500           │
│  [Run Cycle Count] [Export Inventory] [Configure Alerts]            │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/inventory`, `POST /api/ops/inventory`, `PUT /api/ops/inventory/:id`, `POST /api/ops/inventory/:id/order`

### Screen 3.4: Facilities Management (`/ops/facilities`)

**Purpose:** Manage maintenance, room bookings, utilities, safety compliance.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Facilities Management                                 [+ Work Order]│
│  [Work Orders] [Rooms] [Maintenance] [Safety] [Utilities]          │
├─────────────────────────────────────────────────────────────────────┤
│  Open Work Orders (8)                                                 │
│  ┌──────────┬──────────┬──────────┬────────┬──────────┬──────────┐  │
│  │ ID       │ Issue    │ Location │ Prio.  │ Status   │ Actions  │  │
│  ├──────────┼──────────┼──────────┼────────┼──────────┼──────────┤  │
│  │ WO-1042  │ HVAC     │ Server   │ 🔴    │ Assigned │ [Track]  │  │
│  │          │ failure  │ Room     │ Crit   │ to Jim   │          │  │
│  │ WO-1041  │ Leaky    │ Room 204 │ 🟡    │ In Progr │ [Track]  │  │
│  │          │ faucet   │          │ Med    │ ess      │          │  │
│  │ WO-1040  │ Light    │ Hallway  │ 🟢    │ Completed│ [Close]  │  │
│  │          │ out      │ B        │ Low    │ ✅      │          │  │
│  └──────────┴──────────┴──────────┴────────┴──────────┴──────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Preventive Maintenance Schedule                                       │
│  ┌────────────┬──────────────┬────────────┬────────────┬──────────┐  │
│  │ Asset      │ Task         │ Due Date   │ Assigned   │ Status   │  │
│  ├────────────┼──────────────┼────────────┼────────────┼──────────┤  │
│  │ HVAC Unit2 │ Filter       │ Nov 15     │ Ext. Co.   │ ⏳ Upcoming││
│  │            │ replacement  │            │            │          │  │
│  │ Generator  │ Monthly test │ Nov 5      │ Jim        │ ⏳ Upcoming││
│  │ Fire       │ Annual       │ Oct 30     │ Safety Inc │ 🔴 Overdue││
│  │ Extinguis. │ inspection   │            │            │          │  │
│  └────────────┴──────────────┴────────────┴────────────┴──────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Room Utilization                                                       │
│  ┌────────────┬──────────┬────────────┬───────────┬──────────────┐  │
│  │ Room       │ Type     │ Capacity   │ Util.    │ Today's      │  │
│  │            │          │            │ Rate     │ Bookings     │  │
│  ├────────────┼──────────┼────────────┼──────────┼──────────────┤  │
│  │ Room 101   │ Classrm  │ 30         │ 82%      │ 4/6 slots    │  │
│  │ Room 204   │ Lab      │ 20         │ 95% 🔴   │ 6/6 slots    │  │
│  │ Auditorium │ Event    │ 200        │ 45% 🟢   │ 1/4 slots    │  │
│  └────────────┴──────────┴────────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/facilities/work-orders`, `POST /api/ops/facilities/work-orders`, `GET /api/ops/facilities/rooms`, `GET /api/ops/facilities/maintenance`

### Screen 3.5: Task Management (`/ops/tasks`)

**Purpose:** Assign, track, and manage operational tasks and projects.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Task Management                                          [+ Task]  │
│  [My Tasks] [All Tasks] [By Assignee] [Overdue] [Completed Today]  │
├─────────────────────────────────────────────────────────────────────┤
│  Filter: [Assignee ▼] [Priority ▼] [Status ▼] [Due ▼]            │
├─────────────────────────────────────────────────────────────────────┤
│  Overdue (3)                                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🔴 Fire extinguisher inspection — Due Oct 28 (3 days overdue) │  │
│  │    Assignee: Jim | Priority: Critical                         │  │
│  │    [Reassign] [Mark Complete] [Add Note]                     │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🟡 Q4 budget forecast — Due Oct 30 (1 day overdue)          │  │
│  │    Assignee: David (self) | Priority: High                   │  │
│  │    [Complete] [Add Note]                                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Today (5)                                                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🟢 Order printer toner — Due Today 5PM                      │  │
│  │    Assignee: Jim | Priority: Medium                          │  │
│  │    [Start] [Delegated]                                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Task Statistics                                                       │
│  Active: 12 | Overdue: 3 | Completed today: 5 | Avg completion: 2.4d│
│  Completion rate this week: 78% | On-time rate: 82%                │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/tasks`, `POST /api/ops/tasks`, `PUT /api/ops/tasks/:id`

### Screen 3.6: Process Automation (`/ops/automation`)

**Purpose:** Design, deploy, and monitor automated workflows.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Process Automation                                      [+ New Flow]│
│  [Active] [Drafts] [Failed] [All]                                  │
├─────────────────────────────────────────────────────────────────────┤
│  Active Automations (4)                                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🟢 Inventory Auto-Reorder                                   │  │
│  │  Trigger: Stock < min threshold                              │  │
│  │  Action: Create purchase order → Notify procurement          │  │
│  │  Status: Running | Last run: 2h ago | Success rate: 98%     │  │
│  │  [View Runs] [Edit] [Pause] [Delete]                         │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🟢 Facility Work Order Assignment                           │  │
│  │  Trigger: New work order created                             │  │
│  │  Action: Assign based on skills → Notify technician          │  │
│  │  Status: Running | Last run: 30m ago | Success rate: 95%    │  │
│  │  [View Runs] [Edit] [Pause]                                  │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 🔴 Weekly Backup Verification (FAILED)                     │  │
│  │  Trigger: Every Sunday 2AM                                   │  │
│  │  Action: Run backup check → Email report                     │  │
│  │  Status: Failed (last run) | Error: Backup destination full  │  │
│  │  [View Error] [Retry] [Edit]                                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Automation Log (Last 24h)                                            │
│  ┌──────────┬──────────────────┬──────────┬──────────────────────┐  │
│  │ Time     │ Flow             │ Status   │ Details              │  │
│  ├──────────┼──────────────────┼──────────┼──────────────────────┤  │
│  │ 10:00 AM │ Inventory Reorder│ ✅       │ Ordered 3 items     │  │
│  │ 9:30 AM  │ WO Assignment   │ ✅       │ Assigned WO-1042    │  │
│  │ 2:00 AM  │ Weekly Backup   │ ❌       │ Disk full error     │  │
│  └──────────┴──────────────────┴──────────┴──────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/automation`, `POST /api/ops/automation`, `PUT /api/ops/automation/:id`, `POST /api/ops/automation/:id/run`

### Screen 3.7: Vendor Management (`/ops/vendors`)

**Purpose:** Manage vendor contracts, SLAs, performance, payments.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Vendor Management                                      [+ Add Vendor]│
│  [All] [Active] [Contract Expiring] [Inactive]  🔍 [Search...]    │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────┬──────────┬──────────┬──────────┬──────────┬────────┐│
│  │ Vendor     │ Service  │ Contract │ Spend    │ SLA      │ Actions│
│  ├────────────┼──────────┼──────────┼──────────┼──────────┼────────┤│
│  │ Acme       │ Janitor. │ $48k/yr  │ $4.2k/mo │ 95% ✅  │ [View] │
│  │ Cleaning   │          │ Dec 2027 │          │          │        │
│  │ SecuriCam  │ Security │ $24k/yr  │ $2.1k/mo │ 88% 🟡  │ [View] │
│  │ Inc        │ Cameras  │ Nov 2026 │          │ ⚠ Expiring│[Renew]│
│  │ TechSupp  │ IT Supp │ $60k/yr  │ $5.0k/mo │ 99% ✅  │ [View] │
│  │ ly        │ ort      │ Jun 2027 │          │          │        │
│  │ OfficeMax │ Supplies │ $12k/yr  │ $1.0k/mo │ 92% ✅  │ [View] │
│  │           │          │ Mar 2027 │          │          │        │
│  └────────────┴──────────┴──────────┴──────────┴──────────┴────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Selected: SecuriCam Inc                                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Contract: SEC-2026-001 | Start: Dec 1, 2025 | End: Nov 30, 2026│  │
│  │ Services: Security camera maintenance, 24/7 monitoring    │  │
│  │ Contact: John@securicam.com | 555-0200 | 30-day notice    │  │
│  │ SLA Performance: 88% overall (target: 95%)                │  │
│  │ ● Response time: Avg 4.2h (SLA: 2h) — Below target       │  │
│  │ ● Resolution time: Avg 8.1h (SLA: 8h) — At target        │  │
│  │ ● Uptime: 99.2% (SLA: 99.5%) — Below target              │  │
│  │ Spend YTD: $21,000 of $24,000 | Remaining: $3,000        │  │
│  │ [Edit Contract] [Log Performance] [Send Message] [End Contract]│  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Contract Renewals Due (1)                                             │
│  ● SecuriCam Inc — Expires Nov 30, 2026 (30 days)                  │
│    [Start Renewal] [Send RFI] [Do Not Renew]                         │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/vendors`, `POST /api/ops/vendors`, `PUT /api/ops/vendors/:id`

### Screen 3.8: Reports & Analytics (`/ops/reports`)

**Purpose:** Generate, schedule, and view operational reports.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Operational Reports                                     [+ Generate]│
│  [Standard] [Custom] [Scheduled] [Audit]                            │
├─────────────────────────────────────────────────────────────────────┤
│  Standard Reports                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 📊 Weekly Operations Summary                                │  │
│  │  Last: Oct 28 | Schedule: Every Monday 8AM                   │  │
│  │  Sections: Branch status, inventory alerts, work orders,     │  │
│  │  vendor SLA, upcoming renewals                               │  │
│  │  [View] [Download PDF] [Edit Schedule]                      │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Monthly Inventory Report                                │  │
│  │  [Generate] [View Last] [Configure]                          │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Quarterly Vendor Performance Review                     │  │
│  │  [Generate] [View Last]                                      │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 📊 Annual Facilities Compliance Audit                      │  │
│  │  [Generate] [View Last]                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Operational KPIs                                                      │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐│
│  │ Facility │ Stock     │ WO       │ Vendor   │ Auto.    │ Cost/    ││
│  │ Uptime   │ Accuracy  │ Compl.   │ SLA      │ Success  | Student ││
│  │ 99.7%    │ 98.2%    │ 94%      │ 91%      │ 96%      │ $245     ││
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘│
│  [Drill Down] [Set Targets] [Export Dashboard]                       │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/ops/reports`, `POST /api/ops/reports/generate`

---

## 4. Full Database Schema

### Table: `branches`

| Column                 | Type           | Constraints      | Default             | Description                          |
| ---------------------- | -------------- | ---------------- | ------------------- | ------------------------------------ |
| `id`                   | `UUID`         | PK               | `gen_random_uuid()` | —                                    |
| `name`                 | `VARCHAR(255)` | NOT NULL         | —                   | Branch name                          |
| `code`                 | `VARCHAR(20)`  | UNIQUE, NOT NULL | —                   | "MAIN", "SAT-DT"                     |
| `address_line1`        | `VARCHAR(255)` | NOT NULL         | —                   | —                                    |
| `address_line2`        | `VARCHAR(255)` | NULLABLE         | —                   | —                                    |
| `city`                 | `VARCHAR(100)` | NOT NULL         | —                   | —                                    |
| `state`                | `VARCHAR(50)`  | NOT NULL         | —                   | —                                    |
| `zip_code`             | `VARCHAR(20)`  | NOT NULL         | —                   | —                                    |
| `phone`                | `VARCHAR(20)`  | NULLABLE         | —                   | —                                    |
| `capacity`             | `INTEGER`      | NOT NULL         | `0`                 | Max simultaneous occupants           |
| `current_occupancy`    | `INTEGER`      | NOT NULL         | `0`                 | Current count                        |
| `status`               | `VARCHAR(50)`  | NOT NULL         | `'open'`            | open, closed, maintenance, emergency |
| `operating_hours`      | `JSONB`        | NOT NULL         | —                   | Per-day schedule with open/close     |
| `holiday_schedule`     | `JSONB`        | NULLABLE         | —                   | Holiday exceptions                   |
| `features`             | `JSONB`        | NULLABLE         | —                   | Array of features (lab, gym, etc.)   |
| `last_inspection_date` | `DATE`         | NULLABLE         | —                   | —                                    |
| `next_inspection_date` | `DATE`         | NULLABLE         | —                   | —                                    |
| `created_at`           | `TIMESTAMPTZ`  | NOT NULL         | `NOW()`             | —                                    |
| `updated_at`           | `TIMESTAMPTZ`  | NOT NULL         | `NOW()`             | —                                    |

### Table: `inventory_items`

| Column                | Type            | Constraints                | Default | Description                                                   |
| --------------------- | --------------- | -------------------------- | ------- | ------------------------------------------------------------- |
| `id`                  | `UUID`          | PK                         | —       | —                                                             |
| `branch_id`           | `UUID`          | FK → branches.id, NOT NULL | —       | —                                                             |
| `sku`                 | `VARCHAR(100)`  | UNIQUE, NOT NULL           | —       | Stock keeping unit                                            |
| `name`                | `VARCHAR(255)`  | NOT NULL                   | —       | Item name                                                     |
| `description`         | `TEXT`          | NULLABLE                   | —       | —                                                             |
| `category`            | `VARCHAR(100)`  | NOT NULL                   | —       | supplies, equipment, consumables, software, furniture, safety |
| `unit`                | `VARCHAR(50)`   | NOT NULL                   | —       | "each", "box", "liter", "license"                             |
| `quantity`            | `INTEGER`       | NOT NULL                   | `0`     | Current stock                                                 |
| `min_quantity`        | `INTEGER`       | NOT NULL                   | `10`    | Reorder threshold                                             |
| `max_quantity`        | `INTEGER`       | NOT NULL                   | `100`   | Max stock                                                     |
| `reorder_quantity`    | `INTEGER`       | NOT NULL                   | `20`    | Amount to reorder                                             |
| `unit_cost`           | `DECIMAL(10,2)` | NULLABLE                   | —       | Cost per unit                                                 |
| `total_value`         | `DECIMAL(12,2)` | NULLABLE                   | —       | Computed: quantity * unit_cost                                |
| `location`            | `VARCHAR(200)`  | NULLABLE                   | —       | Storage location                                              |
| `preferred_vendor_id` | `UUID`          | FK → vendors.id, NULLABLE  | —       | —                                                             |
| `last_ordered_at`     | `TIMESTAMPTZ`   | NULLABLE                   | —       | —                                                             |
| `last_counted_at`     | `TIMESTAMPTZ`   | NULLABLE                   | —       | Last cycle count                                              |
| `is_active`           | `BOOLEAN`       | NOT NULL                   | `true`  | —                                                             |
| `created_at`          | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()` | —                                                             |
| `updated_at`          | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()` | —                                                             |

**Indexes:**

- `idx_inv_sku` ON `sku`
- `idx_inv_branch` ON `branch_id`
- `idx_inv_category` ON `category`
- `idx_inv_stock` ON `quantity` WHERE `quantity <= min_quantity`

### Table: `inventory_transactions`

| Column           | Type          | Constraints                       | Default | Description                                     |
| ---------------- | ------------- | --------------------------------- | ------- | ----------------------------------------------- |
| `id`             | `UUID`        | PK                                | —       | —                                               |
| `item_id`        | `UUID`        | FK → inventory_items.id, NOT NULL | —       | —                                               |
| `type`           | `VARCHAR(50)` | NOT NULL                          | —       | receipt, issuance, transfer, adjustment, return |
| `quantity`       | `INTEGER`     | NOT NULL                          | —       | Positive or negative                            |
| `balance_after`  | `INTEGER`     | NOT NULL                          | —       | Running balance                                 |
| `reference_type` | `VARCHAR(50)` | NULLABLE                          | —       | purchase_order, work_order, cycle_count         |
| `reference_id`   | `UUID`        | NULLABLE                          | —       | —                                               |
| `notes`          | `TEXT`        | NULLABLE                          | —       | —                                               |
| `performed_by`   | `UUID`        | FK → users.id, NOT NULL           | —       | —                                               |
| `created_at`     | `TIMESTAMPTZ` | NOT NULL                          | `NOW()` | —                                               |

### Table: `work_orders`

| Column             | Type            | Constraints                | Default             | Description                                                        |
| ------------------ | --------------- | -------------------------- | ------------------- | ------------------------------------------------------------------ |
| `id`               | `UUID`          | PK                         | `gen_random_uuid()` | —                                                                  |
| `wo_number`        | `VARCHAR(20)`   | UNIQUE, NOT NULL           | —                   | "WO-1042"                                                          |
| `branch_id`        | `UUID`          | FK → branches.id, NOT NULL | —                   | —                                                                  |
| `title`            | `VARCHAR(255)`  | NOT NULL                   | —                   | —                                                                  |
| `description`      | `TEXT`          | NOT NULL                   | —                   | —                                                                  |
| `category`         | `VARCHAR(50)`   | NOT NULL                   | —                   | hvac, plumbing, electrical, it, furniture, safety, cleaning, other |
| `location`         | `VARCHAR(255)`  | NOT NULL                   | —                   | Room or area                                                       |
| `priority`         | `VARCHAR(20)`   | NOT NULL                   | `'medium'`          | low, medium, high, critical                                        |
| `status`           | `VARCHAR(50)`   | NOT NULL                   | `'open'`            | open, assigned, in_progress, completed, cancelled                  |
| `assigned_to`      | `UUID`          | FK → users.id, NULLABLE    | —                   | Technician                                                         |
| `assigned_at`      | `TIMESTAMPTZ`   | NULLABLE                   | —                   | —                                                                  |
| `started_at`       | `TIMESTAMPTZ`   | NULLABLE                   | —                   | —                                                                  |
| `completed_at`     | `TIMESTAMPTZ`   | NULLABLE                   | —                   | —                                                                  |
| `resolution_notes` | `TEXT`          | NULLABLE                   | —                   | —                                                                  |
| `cost_estimate`    | `DECIMAL(10,2)` | NULLABLE                   | —                   | —                                                                  |
| `actual_cost`      | `DECIMAL(10,2)` | NULLABLE                   | —                   | —                                                                  |
| `vendor_id`        | `UUID`          | FK → vendors.id, NULLABLE  | —                   | If external                                                        |
| `reported_by`      | `UUID`          | FK → users.id, NOT NULL    | —                   | —                                                                  |
| `created_at`       | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()`             | —                                                                  |
| `updated_at`       | `TIMESTAMPTZ`   | NOT NULL                   | `NOW()`             | —                                                                  |

**Indexes:**

- `idx_wo_status` ON `status`
- `idx_wo_priority` ON `priority`
- `idx_wo_branch` ON `branch_id`
- `idx_wo_assigned` ON `assigned_to`

### Table: `preventive_maintenance`

| Column              | Type           | Constraints                | Default      | Description                           |
| ------------------- | -------------- | -------------------------- | ------------ | ------------------------------------- |
| `id`                | `UUID`         | PK                         | —            | —                                     |
| `branch_id`         | `UUID`         | FK → branches.id, NOT NULL | —            | —                                     |
| `asset`             | `VARCHAR(255)` | NOT NULL                   | —            | "HVAC Unit 2"                         |
| `task`              | `VARCHAR(255)` | NOT NULL                   | —            | "Filter replacement"                  |
| `frequency`         | `VARCHAR(50)`  | NOT NULL                   | —            | weekly, monthly, quarterly, annually  |
| `due_date`          | `DATE`         | NOT NULL                   | —            | Next due                              |
| `last_completed_at` | `TIMESTAMPTZ`  | NULLABLE                   | —            | —                                     |
| `assigned_to`       | `VARCHAR(255)` | NULLABLE                   | —            | Internal or vendor                    |
| `status`            | `VARCHAR(50)`  | NOT NULL                   | `'upcoming'` | upcoming, overdue, completed, skipped |
| `notes`             | `TEXT`         | NULLABLE                   | —            | —                                     |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`      | —                                     |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`      | —                                     |

### Table: `rooms`

| Column         | Type           | Constraints                | Default | Description                                                   |
| -------------- | -------------- | -------------------------- | ------- | ------------------------------------------------------------- |
| `id`           | `UUID`         | PK                         | —       | —                                                             |
| `branch_id`    | `UUID`         | FK → branches.id, NOT NULL | —       | —                                                             |
| `name`         | `VARCHAR(200)` | NOT NULL                   | —       | "Room 204"                                                    |
| `room_type`    | `VARCHAR(50)`  | NOT NULL                   | —       | classroom, lab, auditorium, office, meeting_room, common_area |
| `capacity`     | `INTEGER`      | NOT NULL                   | —       | Max occupants                                                 |
| `features`     | `JSONB`        | NULLABLE                   | —       | projector, whiteboard, computers, etc.                        |
| `is_available` | `BOOLEAN`      | NOT NULL                   | `true`  | —                                                             |
| `created_at`   | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()` | —                                                             |

### Table: `room_bookings`

| Column       | Type           | Constraints             | Default       | Description                     |
| ------------ | -------------- | ----------------------- | ------------- | ------------------------------- |
| `id`         | `UUID`         | PK                      | —             | —                               |
| `room_id`    | `UUID`         | FK → rooms.id, NOT NULL | —             | —                               |
| `title`      | `VARCHAR(255)` | NOT NULL                | —             | —                               |
| `booked_by`  | `UUID`         | FK → users.id, NOT NULL | —             | —                               |
| `start_at`   | `TIMESTAMPTZ`  | NOT NULL                | —             | —                               |
| `end_at`     | `TIMESTAMPTZ`  | NOT NULL                | —             | —                               |
| `status`     | `VARCHAR(50)`  | NOT NULL                | `'confirmed'` | confirmed, cancelled, completed |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL                | `NOW()`       | —                               |

### Table: `vendors`

| Column            | Type            | Constraints | Default             | Description                                                       |
| ----------------- | --------------- | ----------- | ------------------- | ----------------------------------------------------------------- |
| `id`              | `UUID`          | PK          | `gen_random_uuid()` | —                                                                 |
| `name`            | `VARCHAR(255)`  | NOT NULL    | —                   | Company name                                                      |
| `contact_name`    | `VARCHAR(255)`  | NULLABLE    | —                   | —                                                                 |
| `email`           | `VARCHAR(255)`  | NULLABLE    | —                   | —                                                                 |
| `phone`           | `VARCHAR(20)`   | NULLABLE    | —                   | —                                                                 |
| `service_type`    | `VARCHAR(100)`  | NOT NULL    | —                   | janitorial, security, it_support, supplies, maintenance, catering |
| `status`          | `VARCHAR(50)`   | NOT NULL    | `'active'`          | active, inactive, suspended                                       |
| `contract_start`  | `DATE`          | NULLABLE    | —                   | —                                                                 |
| `contract_end`    | `DATE`          | NULLABLE    | —                   | —                                                                 |
| `contract_value`  | `DECIMAL(12,2)` | NULLABLE    | —                   | Annual contract value                                             |
| `spend_ytd`       | `DECIMAL(12,2)` | NOT NULL    | `0`                 | —                                                                 |
| `sla_performance` | `DECIMAL(5,2)`  | NULLABLE    | —                   | 0-100%                                                            |
| `sla_target`      | `DECIMAL(5,2)`  | NOT NULL    | `95.00`             | Target percentage                                                 |
| `payment_terms`   | `VARCHAR(100)`  | NULLABLE    | —                   | "Net 30"                                                          |
| `notes`           | `TEXT`          | NULLABLE    | —                   | —                                                                 |
| `created_at`      | `TIMESTAMPTZ`   | NOT NULL    | `NOW()`             | —                                                                 |
| `updated_at`      | `TIMESTAMPTZ`   | NOT NULL    | `NOW()`             | —                                                                 |

### Table: `automation_flows`

| Column            | Type           | Constraints             | Default   | Description                             |
| ----------------- | -------------- | ----------------------- | --------- | --------------------------------------- |
| `id`              | `UUID`         | PK                      | —         | —                                       |
| `name`            | `VARCHAR(255)` | NOT NULL                | —         | Flow name                               |
| `description`     | `TEXT`         | NULLABLE                | —         | —                                       |
| `trigger_type`    | `VARCHAR(100)` | NOT NULL                | —         | schedule, webhook, event, condition     |
| `trigger_config`  | `JSONB`        | NOT NULL                | —         | Trigger-specific config                 |
| `actions`         | `JSONB`        | NOT NULL                | —         | Array of action steps                   |
| `status`          | `VARCHAR(50)`  | NOT NULL                | `'draft'` | draft, active, paused, failed, archived |
| `last_run_at`     | `TIMESTAMPTZ`  | NULLABLE                | —         | —                                       |
| `last_run_status` | `VARCHAR(50)`  | NULLABLE                | —         | success, failed, running                |
| `last_error`      | `TEXT`         | NULLABLE                | —         | —                                       |
| `success_count`   | `INTEGER`      | NOT NULL                | `0`       | —                                       |
| `failure_count`   | `INTEGER`      | NOT NULL                | `0`       | —                                       |
| `created_by`      | `UUID`         | FK → users.id, NOT NULL | —         | —                                       |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()`   | —                                       |
| `updated_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()`   | —                                       |

### Table: `automation_runs`

| Column          | Type          | Constraints                        | Default | Description              |
| --------------- | ------------- | ---------------------------------- | ------- | ------------------------ |
| `id`            | `UUID`        | PK                                 | —       | —                        |
| `flow_id`       | `UUID`        | FK → automation_flows.id, NOT NULL | —       | —                        |
| `status`        | `VARCHAR(50)` | NOT NULL                           | —       | running, success, failed |
| `started_at`    | `TIMESTAMPTZ` | NOT NULL                           | —       | —                        |
| `completed_at`  | `TIMESTAMPTZ` | NULLABLE                           | —       | —                        |
| `result`        | `JSONB`       | NULLABLE                           | —       | Output data              |
| `error_message` | `TEXT`        | NULLABLE                           | —       | —                        |
| `duration_ms`   | `INTEGER`     | NULLABLE                           | —       | —                        |

### Table: `operations_tasks`

| Column            | Type           | Constraints             | Default    | Description                                                  |
| ----------------- | -------------- | ----------------------- | ---------- | ------------------------------------------------------------ |
| `id`              | `UUID`         | PK                      | —          | —                                                            |
| `title`           | `VARCHAR(255)` | NOT NULL                | —          | —                                                            |
| `description`     | `TEXT`         | NULLABLE                | —          | —                                                            |
| `category`        | `VARCHAR(50)`  | NOT NULL                | —          | inventory, facilities, vendor, automation, compliance, admin |
| `priority`        | `VARCHAR(20)`  | NOT NULL                | `'medium'` | low, medium, high, critical                                  |
| `status`          | `VARCHAR(50)`  | NOT NULL                | `'open'`   | open, assigned, in_progress, completed, cancelled            |
| `assigned_to`     | `UUID`         | FK → users.id, NULLABLE | —          | —                                                            |
| `due_date`        | `TIMESTAMPTZ`  | NULLABLE                | —          | —                                                            |
| `completed_at`    | `TIMESTAMPTZ`  | NULLABLE                | —          | —                                                            |
| `related_to_type` | `VARCHAR(50)`  | NULLABLE                | —          | work_order, vendor, inventory                                |
| `related_to_id`   | `UUID`         | NULLABLE                | —          | —                                                            |
| `created_by`      | `UUID`         | FK → users.id, NOT NULL | —          | —                                                            |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()`    | —                                                            |
| `updated_at`      | `TIMESTAMPTZ`  | NOT NULL                | `NOW()`    | —                                                            |

### Table: `ops_reports`

| Column              | Type           | Constraints             | Default | Description                                                                  |
| ------------------- | -------------- | ----------------------- | ------- | ---------------------------------------------------------------------------- |
| `id`                | `UUID`         | PK                      | —       | —                                                                            |
| `name`              | `VARCHAR(255)` | NOT NULL                | —       | —                                                                            |
| `type`              | `VARCHAR(50)`  | NOT NULL                | —       | weekly_summary, inventory, vendor_performance, facilities_compliance, custom |
| `format`            | `VARCHAR(10)`  | NOT NULL                | `'pdf'` | pdf, csv                                                                     |
| `schedule`          | `VARCHAR(100)` | NULLABLE                | —       | Cron expression                                                              |
| `last_generated_at` | `TIMESTAMPTZ`  | NULLABLE                | —       | —                                                                            |
| `file_url`          | `VARCHAR(500)` | NULLABLE                | —       | R2 URL                                                                       |
| `parameters`        | `JSONB`        | NULLABLE                | —       | Report config                                                                |
| `recipients`        | `JSONB`        | NULLABLE                | —       | Email recipients                                                             |
| `created_by`        | `UUID`         | FK → users.id, NOT NULL | —       | —                                                                            |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL                | `NOW()` | —                                                                            |

---

## 5. Complete API Contract

### `GET /api/ops/dashboard`

**Auth:** Required (operations_manager role)

**Response:**

```typescript
interface OpsDashboardResponse {
  branches: {
    total: number;
    open: number;
    avgCapacity: number;
    items: { id: string; name: string; status: string; capacityPct: number }[];
  };
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  facilities: {
    openWorkOrders: number;
    overdueWorkOrders: number;
    pmOverdue: number;
  };
  vendors: {
    total: number;
    activeContracts: number;
    expiringSoon: number;
    avgSla: number;
  };
  automation: {
    activeFlows: number;
    failedFlows: number;
  };
  tasks: {
    active: number;
    overdue: number;
  };
  alerts: OpsAlert[];
  quickStats: Record<string, number>;
}

interface OpsAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  category: string;
  message: string;
  link: string;
}
```

### `GET /api/ops/branches`

**Auth:** Required (ops manager)

**Response:** `{ branches: BranchDetail[] }`

### `POST /api/ops/branches`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateBranchRequest {
  name: string;
  code: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  capacity: number;
  operatingHours: Record<string, { open: string; close: string }>;
  features?: string[];
}
```

### `PUT /api/ops/branches/:id`

**Auth:** Required (ops manager)

### `POST /api/ops/branches/:id/set-status`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface SetBranchStatusRequest {
  status: "open" | "closed" | "maintenance" | "emergency";
  reason?: string;
  notifyOccupants?: boolean;
}
```

### `GET /api/ops/inventory`

**Auth:** Required (ops manager)

**Query:** `category?: string`, `stockStatus?: 'all' | 'low' | 'out' | 'over'`, `branchId?: string`

**Response:**

```typescript
interface InventoryResponse {
  items: InventoryItemDetail[];
  summary: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    overstock: number;
    totalValue: number;
    monthlyConsumption: number;
  };
}

interface InventoryItemDetail {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  reorderQuantity: number;
  unitCost: number | null;
  totalValue: number | null;
  location: string | null;
  preferredVendor: string | null;
  stockStatus: "ok" | "low" | "out" | "over";
  lastOrderedAt: string | null;
}
```

### `POST /api/ops/inventory`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateInventoryItemRequest {
  branchId: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  quantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  reorderQuantity?: number;
  unitCost?: number;
  location?: string;
  preferredVendorId?: string;
}
```

### `POST /api/ops/inventory/:id/order`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface OrderInventoryRequest {
  quantity: number;
  vendorId?: string;
  urgency?: "normal" | "urgent";
  notes?: string;
}
```

### `POST /api/ops/inventory/:id/adjust`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface AdjustInventoryRequest {
  quantity: number; // positive or negative
  reason: string;
  referenceType?: string;
  referenceId?: string;
}
```

### `GET /api/ops/facilities/work-orders`

**Auth:** Required (ops manager)

**Query:** `status?: string`, `priority?: string`, `branchId?: string`

**Response:**

```typescript
interface WorkOrdersResponse {
  orders: WorkOrderDetail[];
  stats: {
    open: number;
    inProgress: number;
    completed: number;
    overdue: number;
    avgCompletionTime: number;
  };
}

interface WorkOrderDetail {
  id: string;
  woNumber: string;
  title: string;
  description: string;
  category: string;
  location: string;
  priority: string;
  status: string;
  assignedToName: string | null;
  assignedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  costEstimate: number | null;
  actualCost: number | null;
  vendorName: string | null;
  reportedByName: string;
  createdAt: string;
  isOverdue: boolean;
}
```

### `POST /api/ops/facilities/work-orders`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateWorkOrderRequest {
  branchId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  priority?: string;
  assignedTo?: string;
  vendorId?: string;
  costEstimate?: number;
}
```

### `PUT /api/ops/facilities/work-orders/:id`

**Auth:** Required (ops manager)

### `GET /api/ops/facilities/maintenance`

**Auth:** Required (ops manager)

**Query:** `status?: string`

**Response:**

```typescript
interface MaintenanceResponse {
  schedules: MaintenanceSchedule[];
  overdueCount: number;
}

interface MaintenanceSchedule {
  id: string;
  asset: string;
  task: string;
  frequency: string;
  dueDate: string;
  lastCompletedAt: string | null;
  assignedTo: string | null;
  status: string;
}
```

### `POST /api/ops/facilities/maintenance/:id/complete`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CompleteMaintenanceRequest {
  notes?: string;
  completedAt?: string;
}
```

### `GET /api/ops/tasks`

**Auth:** Required (ops manager)

**Query:** `status?: string`, `assigneeId?: string`, `priority?: string`

**Response:**

```typescript
interface OpsTasksResponse {
  tasks: OpsTaskDetail[];
  stats: {
    active: number;
    overdue: number;
    completedToday: number;
    avgCompletionDays: number;
    onTimeRate: number;
  };
}

interface OpsTaskDetail {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string;
  status: string;
  assignedToName: string | null;
  dueDate: string | null;
  completedAt: string | null;
  isOverdue: boolean;
  createdAt: string;
}
```

### `POST /api/ops/tasks`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateOpsTaskRequest {
  title: string;
  description?: string;
  category: string;
  priority?: string;
  assignedTo?: string;
  dueDate?: string;
  relatedToType?: string;
  relatedToId?: string;
}
```

### `GET /api/ops/vendors`

**Auth:** Required (ops manager)

**Query:** `status?: string`, `serviceType?: string`

**Response:**

```typescript
interface VendorsResponse {
  vendors: VendorDetail[];
  expiringSoon: VendorDetail[];
}

interface VendorDetail {
  id: string;
  name: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  serviceType: string;
  status: string;
  contractStart: string | null;
  contractEnd: string | null;
  contractValue: number | null;
  spendYtd: number;
  slaPerformance: number | null;
  slaTarget: number;
  paymentTerms: string | null;
  isExpiringSoon: boolean;
}
```

### `POST /api/ops/vendors`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateVendorRequest {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  serviceType: string;
  contractStart?: string;
  contractEnd?: string;
  contractValue?: number;
  slaTarget?: number;
  paymentTerms?: string;
}
```

### `POST /api/ops/vendors/:id/log-sla`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface LogSlaPerformanceRequest {
  period: string;
  metrics: {
    responseTime: number;
    resolutionTime: number;
    uptime: number;
    overallScore: number;
  };
  notes?: string;
}
```

### `GET /api/ops/automation`

**Auth:** Required (ops manager)

**Response:**

```typescript
interface AutomationResponse {
  flows: AutomationFlowDetail[];
  stats: {
    active: number;
    failed: number;
    totalRuns: number;
    avgSuccessRate: number;
  };
}

interface AutomationFlowDetail {
  id: string;
  name: string;
  description: string | null;
  triggerType: string;
  triggerConfig: any;
  actions: any[];
  status: string;
  lastRunAt: string | null;
  lastRunStatus: string | null;
  lastError: string | null;
  successCount: number;
  failureCount: number;
}
```

### `POST /api/ops/automation`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface CreateAutomationFlowRequest {
  name: string;
  description?: string;
  triggerType: string;
  triggerConfig: Record<string, any>;
  actions: Record<string, any>[];
}
```

### `POST /api/ops/automation/:id/toggle`

**Auth:** Required (ops manager)

**Request:** `{ active: boolean }`

### `POST /api/ops/automation/:id/test-run`

**Auth:** Required (ops manager)

### `GET /api/ops/reports`

**Auth:** Required (ops manager)

### `POST /api/ops/reports/generate`

**Auth:** Required (ops manager)

**Request:**

```typescript
interface GenerateOpsReportRequest {
  type: string;
  format?: "pdf" | "csv";
  parameters?: {
    branchId?: string;
    period?: "week" | "month" | "quarter" | "year";
    includeSections?: string[];
  };
}
```

---

## 6. Component Tree

```
OpsLayout
├── OpsNavBar
│   ├── Logo
│   ├── NavLinks (Dashboard, Branches, Inventory, Facilities, Tasks, Automation, Vendors, Reports)
│   ├── AlertBadge (critical alert count)
│   └── UserMenu (Settings, Help, Logout)
│
├── OpsDashboard
│   ├── PeriodSelector
│   ├── DomainMetricGrid (6 domain cards)
│   │   ├── BranchMetricCard (total, open, avg cap, manage)
│   │   ├── InventoryMetricCard (items, low, oos, value, manage)
│   │   ├── FacilitiesMetricCard (WO open, overdue, PM status)
│   │   ├── TaskMetricCard (active, overdue)
│   │   ├── AutomationMetricCard (active, failed)
│   │   └── VendorMetricCard (total, expiring, avg SLA)
│   ├── AlertsWidget
│   │   └── AlertItem[] (severity icon, message, link, dismiss)
│   └── QuickActionsGrid
│       └── ActionButton[]
│
├── BranchManagementPage
│   ├── BranchCardList
│   │   └── BranchCard[] (name, address, status, hours, capacity bar, actions)
│   ├── BranchDetailPanel (slide-over or full page)
│   │   ├── BranchInfo (name, address, contact)
│   │   ├── OperatingHoursEditor (per day, editable)
│   │   ├── CapacityMeter (current/max with trend)
│   │   ├── ComplianceStatus (inspections, safety, ADA)
│   │   ├── RoomList (name, type, capacity, utilization)
│   │   ├── StatusControl (open/closed/maintenance/emergency)
│   │   └── EditButton
│   └── AddBranchModal (form)
│
├── InventoryPage
│   ├── FilterBar (category, stock status, branch, search)
│   ├── InventoryTable (sku, name, category, stock, min/max, value, status, actions)
│   ├── StockStatusIndicator (color dots)
│   ├── AddItemModal (form)
│   ├── OrderModal (quantity, vendor, urgency)
│   ├── AdjustModal (quantity change, reason, reference)
│   ├── InventorySummaryCards (total, low, oos, value, consumption)
│   └── BulkActionsBar (export, cycle count)
│
├── FacilitiesPage
│   ├── TabBar (Work Orders, Rooms, Maintenance, Safety, Utilities)
│   ├── WorkOrderSection
│   │   ├── WorkOrderTable (WO#, title, location, priority, status, assigned, actions)
│   │   ├── NewWorkOrderModal (branch, title, desc, category, location, priority, assignee)
│   │   ├── WorkOrderDetailPanel (timeline, notes, cost, completion)
│   │   └── WOStatsHeader (open, in-progress, completed, overdue)
│   ├── RoomSection
│   │   ├── RoomTable (name, type, capacity, utilization, status)
│   │   └── RoomUtilizationChart (bar chart per room)
│   └── MaintenanceSection
│       ├── MaintenanceScheduleTable (asset, task, frequency, due, assigned, status)
│       └── CompleteMaintenanceModal (notes, date)
│
├── TaskManagementPage
│   ├── TabBar (My Tasks, All, By Assignee, Overdue, Completed)
│   ├── FilterBar (assignee, priority, status, due)
│   ├── TaskList (grouped by overdue/today/upcoming)
│   │   └── TaskCard[] (title, priority color, assignee, due, status, actions)
│   ├── NewTaskModal (title, desc, category, priority, assignee, due, related)
│   ├── TaskStatsHeader (active, overdue, completed today, rate)
│   └── KanbanViewToggle (list → kanban board)
│
├── AutomationPage
│   ├── TabBar (Active, Drafts, Failed, All)
│   ├── FlowCard[]
│   │   ├── FlowStatusIndicator (green/red/yellow)
│   │   ├── FlowName, Description
│   │   ├── TriggerSummary
│   │   ├── ActionCount
│   │   ├── LastRunStatus, LastRunTime
│   │   ├── SuccessRate (success/total)
│   │   └── Actions (View Runs, Edit, Toggle, Delete)
│   ├── NewFlowModal
│   │   ├── FlowNameInput, DescriptionInput
│   │   ├── TriggerBuilder (type, config per type)
│   │   ├── ActionStepBuilder (add/remove/reorder steps)
│   │   └── SaveButton
│   ├── FlowDetailPanel
│   │   ├── FlowConfig (trigger + actions)
│   │   ├── RunHistory (time, status, duration, error)
│   │   └── TestRunButton
│   └── FlowStatsWidget
│
├── VendorManagementPage
│   ├── TabBar (All, Active, Expiring, Inactive)
│   ├── SearchInput, ServiceTypeFilter
│   ├── VendorTable (name, service, contract, spend, SLA, actions)
│   ├── VendorDetailPanel (slide-over)
│   │   ├── ContactInfo
│   │   ├── ContractDetails (start, end, value, terms)
│   │   ├── SLAPerformance (metrics with trend)
│   │   ├── SpendHistory (monthly spend chart)
│   │   ├── Documents (contract PDFs)
│   │   └── Actions (Edit, Log SLA, Send Message, Renew, End)
│   ├── AddVendorModal
│   ├── LogSLAModal (period, metrics per category)
│   ├── RenewContractModal (negotiate terms)
│   └── ExpiringSoonWidget
│
├── ReportsPage
│   ├── TabBar (Standard, Custom, Scheduled, Audit)
│   ├── StandardReportList
│   │   └── ReportCard[] (title, description, last gen, schedule, actions)
│   ├── CustomReportBuilder (type, branch, period, sections, format)
│   ├── ScheduledReportManager (list of scheduled reports, cron, recipients)
│   └── KPIWidgetCards (facility uptime, stock accuracy, WO completion, vendor SLA, automation success)
│
└── OpsSettingsPage
    ├── GeneralSettings (default branch, fiscal year)
    ├── InventoryDefaults (min/max defaults per category)
    ├── SLAThresholds (per vendor type)
    ├── WorkOrderCategories (manage categories list)
    └── NotificationPreferences
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Creating a Work Order

```
Step 1: Ops Manager sees dashboard alert: "Server Room Temp > 30°C"
  → Clicks alert → opens facilities page

Step 2: Clicks "New Work Order"
  → Branch: Main Campus (pre-selected)
  → Title: "HVAC repair in Server Room"
  → Description: "Server room temperature at 32°C. HVAC unit not cooling."
  → Category: HVAC
  → Location: Server Room (Basement)
  → Priority: Critical
  → Assigned To: Jim (facilities tech)

Step 3: Clicks "Create Work Order"
  → WO-1042 created
  → Jim notified: "New critical work order: HVAC repair in Server Room"
  → Status: "Assigned"

Step 4: Jim starts work → updates status to "In Progress"
  → Ops Manager sees real-time update on dashboard

Step 5: Work completed → Ops Manager closes WO
  → Resolution notes: "Replaced compressor fan motor. Temp back to 22°C."
  → Actual Cost: $850 (logged for budget tracking)
  → Status: "Completed"

Alternative:
  Step 1a: Manual creation from facilities page
  Step 3a: Cost estimate entered: $800
  Step 5a: Work requires external vendor → assign to vendor instead
  Step 5b: Work cannot be completed → mark as "Cancelled" with reason
```

### Journey 7.2: Inventory Reorder

```
Step 1: Dashboard shows: "3 items low stock, 1 out of stock"
  → Clicks inventory metric → /ops/inventory

Step 2: Filters: "Low Stock" + "Out of Stock"
  → Sees: Printer Toner (12 units, min 20), Lab VM Licenses (48, min 50), Lab Routers (0, min 5)

Step 3: Clicks "Order" on Printer Toner
  → Quantity: 20 (default reorder qty)
  → Vendor: OfficeMax (preferred)
  → Urgency: Normal
  → Clicks "Order" → purchase order created
  → Vendor notified automatically

Step 4: Clicks "Order Urgent" on Lab Routers
  → Quantity: 5
  → Vendor: TechSupply (preferred)
  → Urgency: Urgent
  → Notes: "Need for Friday lab session"
  → Purchase order created with expedited flag

Step 5: Clicks "Order" on Lab VM Licenses
  → Quantity: 10 (brings to 58, within range)
  → Vendor: TechSupply
  → Clicks "Order"

Alternative:
  Step 2a: Runs cycle count → adjusts quantities for discrepancies
  Step 3a: No preferred vendor → select from vendor list
  Step 5a: Stock received → receptionist logs receipt → inventory auto-updates
```

### Journey 7.3: Vendor Contract Renewal

```
Step 1: Dashboard shows: "SecuriCam Inc contract expiring in 30 days"
  → Clicks alert → /ops/vendors

Step 2: Views SecuriCam Inc detail:
  - SLA: 88% (target: 95%) — below target
  - Response time avg 4.2h (SLA: 2h) — critical miss
  - Contract: $24k/yr, expires Nov 30

Step 3: Reviews performance history
  → Consistently below SLA for response time last 3 months
  → Decides not to renew

Step 4: Clicks "Do Not Renew"
  → Reason: "SLA consistently below target for response time"
  → Notes: "Will issue RFP for new security vendor"

Step 5: Clicks "Send RFI" → generates request for information
  → System notifies procurement team
  → Contract end date flagged in calendar

Alternative:
  Step 3a: Performance good → "Start Renewal"
  → Negotiates terms (price increase capped at 3%)
  → New contract generated, signed digitally
  Step 4a: Needs more info → "Request Proposal" from vendor
  Step 5a: Vendor improved → give 3-month probation period
```

### Journey 7.4: Creating an Automation Flow

```
Step 1: Ops Manager notices manual process: daily inventory check
  → Opens /ops/automation → "New Flow"

Step 2: Configures flow:
  Name: "Inventory Auto-Reorder"
  Trigger: Event → "Inventory item quantity < min_quantity"
  Action 1: "Create purchase order for reorder_quantity"
  Action 2: "Send notification to procurement team"
  Action 3: "Log transaction in inventory_transactions"

Step 3: Saves as draft → "Test Run"
  → Simulates trigger → actions execute (dry run)
  → Success: "Flow executed successfully. Purchase order would be created for 3 items."

Step 4: Clicks "Activate"
  → Flow status: "Active"
  → Run count begins

Step 5: Later, flow fails:
  → Alert: "Inventory Auto-Reorder failed: Vendor API timeout"
  → Ops Manager reviews error → adjusts vendor timeout setting
  → Retries → success

Alternative:
  Step 2a: Schedule trigger: "Every Monday 8AM: Generate weekly inventory report"
  Step 3a: Test run fails → debug action steps
  Step 5a: Flow has recurring failures → auto-pause after 3 consecutive failures
```

### Journey 7.5: Monthly Operations Report

```
Step 1: 1st of month → reminder: "Monthly Operations Report due"
  → Opens /ops/reports → "Monthly Inventory Report"

Step 2: Clicks "Generate"
  → Parameters: Period = "October 2026", Branch = "All"
  → Includes: stock levels, low/out items, consumption trends, order history

Step 3: Report generates (10 seconds)
  → Shows: 2% stock decrease, 3 items frequently low, $12,500 monthly consumption

Step 4: Downloads PDF
  → Shares with CFO
  → Action item: "Increase min quantity for printer toner from 20 to 30"

Step 5: Schedules report for auto-generation
  → "Generate on 1st of each month"
  → Recipients: david@cea, cfo@cea

Alternative:
  Step 4a: Exports CSV → creates pivot table in Excel for deeper analysis
  Step 5a: Adds custom section: "Branch comparison table"
```

---

## 8. Business Rules Engine

### BR-OP-001: Inventory Reorder Thresholds

- Auto-reorder triggers when quantity ≤ min_quantity
- Order quantity = max( reorder_quantity, max_quantity - quantity )
- Urgent orders (< min_quantity and no stock): expedited shipping
- Cycle count required monthly for high-value items (>$1,000)
- Inventory accuracy target: 98%, below triggers full count

### BR-OP-002: Work Order SLAs

- Critical: response within 30 min, resolution within 4 hours
- High: response within 1 hour, resolution within 8 hours
- Medium: response within 4 hours, resolution within 48 hours
- Low: response within 24 hours, resolution within 5 business days
- Overdue escalation: ×1.5 SLA time → supervisor notified, ×2 → Ops Manager

### BR-OP-003: Preventive Maintenance Schedule

- Weekly: Generator test, fire alarm test
- Monthly: HVAC filter check, emergency light test
- Quarterly: Fire extinguisher inspection, electrical panel check
- Annually: Full HVAC service, roof inspection, elevator certification
- Overdue > 7 days: warning; > 30 days: critical alert

### BR-OP-004: Vendor SLA Management

- SLA measured monthly per vendor
- Below 90% → warning, improvement plan requested
- Below 80% → probation, renegotiate or terminate
- Below 70% → immediate termination review
- Three consecutive months below target → auto-trigger renegotiation

### BR-OP-005: Automation Flow Governance

- Flows cannot modify financial records without approval
- Flows with destructive actions require confirmation step
- Failed flows auto-pause after 3 consecutive failures
- All flows log to automation_runs for audit trail
- Flow changes require re-approval for critical processes

### BR-OP-006: Branch Operations

- Emergency closure requires Ops Manager approval
- Capacity > 90% triggers expansion review
- Fire safety inspection quarterly, must be < 100% compliance
- ADA compliance audit annually
- Branch opening/closing hours consistent within 1-hour variance

### BR-OP-007: Task Management

- Tasks overdue > 7 days escalate to Ops Manager
- Tasks can be reassigned if not started within 48 hours
- Completed tasks require resolution notes
- Max 10 active tasks per assignee (prevents overload)
- Weekly task review meeting (auto-generated agenda)

### BR-OP-008: Procurement Rules

- Orders < $1,000: immediate approval
- Orders $1,000-$10,000: Ops Manager approval
- Orders > $10,000: requires CFO approval
- Single vendor purchases > $5,000 require competitive quote
- Emergency procurement: any amount with post-facto justification

### BR-OP-009: Report Scheduling

- Weekly: Branch ops summary (Monday 8AM)
- Monthly: Inventory report (1st), Vendor performance (15th)
- Quarterly: Facilities compliance, Vendor business review
- Annually: Full operations audit
- Reports retained for 7 years per compliance

---

## 9. Notification Specifications

### N-OP-01: Critical Work Order Created

| Field         | Value                                                                     |
| ------------- | ------------------------------------------------------------------------- |
| **Trigger**   | Work order with priority "critical" created                               |
| **Channel**   | In-app + Push + SMS (to assigned tech)                                    |
| **Template**  | `wo_critical`                                                             |
| **Variables** | `{{woNumber}}`, `{{title}}`, `{{location}}`, `{{assignedTo}}`, `{{link}}` |

### N-OP-02: Inventory Low Stock Alert

| Field         | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| **Trigger**   | Item quantity drops below min_quantity                                   |
| **Channel**   | In-app + Email                                                           |
| **Template**  | `inventory_low`                                                          |
| **Variables** | `{{itemName}}`, `{{sku}}`, `{{quantity}}`, `{{minQuantity}}`, `{{link}}` |

### N-OP-03: Vendor Contract Expiring

| Field         | Value                                                                   |
| ------------- | ----------------------------------------------------------------------- |
| **Trigger**   | 60, 30, 14, 7 days before contract end                                  |
| **Channel**   | In-app + Email                                                          |
| **Template**  | `vendor_contract_expiring`                                              |
| **Variables** | `{{vendorName}}`, `{{contractEnd}}`, `{{serviceType}}`, `{{renewLink}}` |

### N-OP-04: Maintenance Overdue

| Field         | Value                                                                 |
| ------------- | --------------------------------------------------------------------- |
| **Trigger**   | Preventive maintenance past due date                                  |
| **Channel**   | In-app + Email                                                        |
| **Template**  | `maintenance_overdue`                                                 |
| **Variables** | `{{asset}}`, `{{task}}`, `{{dueDate}}`, `{{daysOverdue}}`, `{{link}}` |

### N-OP-05: Automation Flow Failed

| Field         | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| **Trigger**   | Automation flow execution fails                             |
| **Channel**   | In-app + Push                                               |
| **Template**  | `automation_failed`                                         |
| **Variables** | `{{flowName}}`, `{{errorMessage}}`, `{{runId}}`, `{{link}}` |

### N-OP-06: Task Overdue Escalation

| Field         | Value                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| **Trigger**   | Task overdue > 7 days                                                         |
| **Channel**   | In-app + Email                                                                |
| **Template**  | `task_overdue`                                                                |
| **Variables** | `{{taskTitle}}`, `{{assignee}}`, `{{dueDate}}`, `{{daysOverdue}}`, `{{link}}` |

### N-OP-07: Weekly Operations Summary

| Field         | Value                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Every Monday 8:00 AM                                                                                            |
| **Channel**   | Email                                                                                                           |
| **Template**  | `weekly_ops_summary`                                                                                            |
| **Variables** | `{{branchCount}}`, `{{inventoryAlerts}}`, `{{woOpen}}`, `{{vendorExpiring}}`, `{{taskStats}}`, `{{reportLink}}` |

### N-OP-08: Branch Emergency Closure

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Branch status set to "emergency" or "closed"                        |
| **Channel**   | In-app + Push + SMS (to all staff at branch)                        |
| **Template**  | `branch_emergency`                                                  |
| **Variables** | `{{branchName}}`, `{{status}}`, `{{reason}}`, `{{estimatedReopen}}` |

---

## 10. Permission Matrix

| Entity                 | Action              | Ops Manager | Branch Staff  | Admin | Tech          |
| ---------------------- | ------------------- | ----------- | ------------- | ----- | ------------- |
| Branches               | CRUD                | ✅          | ❌            | ✅    | ❌            |
| Branches               | Set Status          | ✅          | ❌            | ✅    | ❌            |
| Inventory              | Read                | ✅          | ✅            | ✅    | ❌            |
| Inventory              | Create/Edit         | ✅          | ❌            | ✅    | ❌            |
| Inventory              | Order               | ✅          | ❌            | ✅    | ❌            |
| Inventory              | Adjust              | ✅          | ❌            | ✅    | ❌            |
| Inventory Transactions | Read                | ✅          | ❌            | ✅    | ❌            |
| Work Orders            | Create              | ✅          | ✅            | ✅    | ✅            |
| Work Orders            | Read                | ✅          | ✅ (assigned) | ✅    | ✅ (assigned) |
| Work Orders            | Update Status       | ✅          | ❌            | ✅    | ✅ (assigned) |
| Work Orders            | Close               | ✅          | ❌            | ✅    | ❌            |
| Preventive Maint.      | CRUD                | ✅          | ❌            | ✅    | ❌            |
| Preventive Maint.      | Complete            | ✅          | ❌            | ✅    | ✅ (assigned) |
| Rooms                  | Read                | ✅          | ✅            | ✅    | ❌            |
| Rooms                  | Book                | ✅          | ✅            | ✅    | ❌            |
| Vendors                | CRUD                | ✅          | ❌            | ✅    | ❌            |
| Vendors                | Log SLA             | ✅          | ❌            | ✅    | ❌            |
| Vendors                | Renew/Terminate     | ✅          | ❌            | ✅    | ❌            |
| Automation Flows       | CRUD                | ✅          | ❌            | ✅    | ❌            |
| Automation Flows       | Activate/Deactivate | ✅          | ❌            | ✅    | ❌            |
| Automation Runs        | View                | ✅          | ❌            | ✅    | ❌            |
| Ops Tasks              | CRUD                | ✅          | ✅            | ✅    | ✅            |
| Ops Reports            | Generate            | ✅          | ❌            | ✅    | ❌            |
| Ops Reports            | Schedule            | ✅          | ❌            | ✅    | ❌            |
| Ops Settings           | Edit                | ✅          | ❌            | ✅    | ❌            |

---

## 11. State Management

### Redux Slice

```typescript
interface OpsState {
  dashboard: {
    data: OpsDashboardResponse | null;
    loading: boolean;
  };
  branches: {
    list: BranchDetail[];
    selectedBranch: BranchDetail | null;
    loading: boolean;
    saving: boolean;
  };
  inventory: {
    items: InventoryItemDetail[];
    summary: InventoryResponse["summary"] | null;
    loading: boolean;
    ordering: boolean;
    filter: { category: string; stockStatus: string; branchId: string };
  };
  facilities: {
    workOrders: WorkOrderDetail[];
    maintenance: MaintenanceSchedule[];
    rooms: any[];
    loading: boolean;
    selectedWO: WorkOrderDetail | null;
  };
  vendors: {
    list: VendorDetail[];
    selectedVendor: VendorDetail | null;
    loading: boolean;
    loggingSla: boolean;
  };
  automation: {
    flows: AutomationFlowDetail[];
    selectedFlow: AutomationFlowDetail | null;
    loading: boolean;
    testing: boolean;
  };
  tasks: {
    list: OpsTaskDetail[];
    stats: OpsTasksResponse["stats"] | null;
    loading: boolean;
    filter: { status: string; assignee: string; priority: string };
  };
  reports: {
    generating: boolean;
    scheduled: any[];
    error: string | null;
  };
}
```

### RTK Query Endpoints

```typescript
const opsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/ops" }),
  tagTypes: [
    "Dashboard",
    "Branches",
    "Inventory",
    "WorkOrders",
    "Maintenance",
    "Vendors",
    "Automation",
    "Tasks",
    "Reports",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<OpsDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 30000,
    }),
    getBranches: builder.query<BranchDetail[], void>({
      query: () => "/branches",
      providesTags: ["Branches"],
    }),
    createBranch: builder.mutation<void, CreateBranchRequest>({
      query: (body) => ({ url: "/branches", method: "POST", body }),
      invalidatesTags: ["Branches", "Dashboard"],
    }),
    updateBranch: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/branches/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Branches"],
    }),
    setBranchStatus: builder.mutation<void, { id: string; data: SetBranchStatusRequest }>({
      query: ({ id, data }) => ({ url: `/branches/${id}/set-status`, method: "POST", body: data }),
      invalidatesTags: ["Branches", "Dashboard"],
    }),
    getInventory: builder.query<InventoryResponse, string | void>({
      query: (params) => ({ url: "/inventory", params: params ? { stockStatus: params } : {} }),
      providesTags: ["Inventory"],
    }),
    createInventoryItem: builder.mutation<void, CreateInventoryItemRequest>({
      query: (body) => ({ url: "/inventory", method: "POST", body }),
      invalidatesTags: ["Inventory"],
    }),
    orderInventory: builder.mutation<void, { id: string; data: OrderInventoryRequest }>({
      query: ({ id, data }) => ({ url: `/inventory/${id}/order`, method: "POST", body: data }),
      invalidatesTags: ["Inventory"],
    }),
    adjustInventory: builder.mutation<void, { id: string; data: AdjustInventoryRequest }>({
      query: ({ id, data }) => ({ url: `/inventory/${id}/adjust`, method: "POST", body: data }),
      invalidatesTags: ["Inventory"],
    }),
    getWorkOrders: builder.query<WorkOrdersResponse, string | void>({
      query: (params) => ({
        url: "/facilities/work-orders",
        params: params ? { status: params } : {},
      }),
      providesTags: ["WorkOrders"],
    }),
    createWorkOrder: builder.mutation<WorkOrderDetail, CreateWorkOrderRequest>({
      query: (body) => ({ url: "/facilities/work-orders", method: "POST", body }),
      invalidatesTags: ["WorkOrders", "Dashboard"],
    }),
    updateWorkOrder: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/facilities/work-orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["WorkOrders"],
    }),
    getMaintenance: builder.query<MaintenanceSchedule[], string | void>({
      query: (params) => ({
        url: "/facilities/maintenance",
        params: params ? { status: params } : {},
      }),
      providesTags: ["Maintenance"],
    }),
    completeMaintenance: builder.mutation<void, { id: string; data: CompleteMaintenanceRequest }>({
      query: ({ id, data }) => ({
        url: `/facilities/maintenance/${id}/complete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Maintenance", "Dashboard"],
    }),
    getVendors: builder.query<VendorsResponse, string | void>({
      query: (params) => ({ url: "/vendors", params: params ? { status: params } : {} }),
      providesTags: ["Vendors"],
    }),
    createVendor: builder.mutation<void, CreateVendorRequest>({
      query: (body) => ({ url: "/vendors", method: "POST", body }),
      invalidatesTags: ["Vendors"],
    }),
    updateVendor: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/vendors/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Vendors"],
    }),
    logSla: builder.mutation<void, { id: string; data: LogSlaPerformanceRequest }>({
      query: ({ id, data }) => ({ url: `/vendors/${id}/log-sla`, method: "POST", body: data }),
      invalidatesTags: ["Vendors"],
    }),
    getAutomationFlows: builder.query<AutomationFlowDetail[], void>({
      query: () => "/automation",
      providesTags: ["Automation"],
    }),
    createAutomationFlow: builder.mutation<void, CreateAutomationFlowRequest>({
      query: (body) => ({ url: "/automation", method: "POST", body }),
      invalidatesTags: ["Automation"],
    }),
    toggleAutomation: builder.mutation<void, { id: string; active: boolean }>({
      query: ({ id, active }) => ({
        url: `/automation/${id}/toggle`,
        method: "POST",
        body: { active },
      }),
      invalidatesTags: ["Automation"],
    }),
    testAutomationRun: builder.mutation<{ success: boolean; log: string }, string>({
      query: (id) => ({ url: `/automation/${id}/test-run`, method: "POST" }),
    }),
    getTasks: builder.query<OpsTasksResponse, string | void>({
      query: (params) => ({ url: "/tasks", params: params ? { status: params } : {} }),
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation<void, CreateOpsTaskRequest>({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: ["Tasks", "Dashboard"],
    }),
    updateTask: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/tasks/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Tasks"],
    }),
    generateReport: builder.mutation<{ reportUrl: string }, GenerateOpsReportRequest>({
      query: (body) => ({ url: "/reports/generate", method: "POST", body }),
      invalidatesTags: ["Reports"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Branch

```typescript
export const BranchSchema = z.object({
  name: z.string().min(2).max(255),
  code: z
    .string()
    .min(2)
    .max(20)
    .regex(/^[A-Z0-9-]+$/, "Code must be uppercase alphanumeric"),
  addressLine1: z.string().min(5).max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(50),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  phone: z.string().optional(),
  capacity: z.number().int().min(1).max(10000),
  operatingHours: z
    .record(
      z.string(),
      z.object({
        open: z.string().regex(/^\d{2}:\d{2}$/),
        close: z.string().regex(/^\d{2}:\d{2}$/),
      }),
    )
    .refine((hours) => {
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      return days.some((d) => hours[d]);
    }, "At least one day must have operating hours"),
});
```

### Inventory Item

```typescript
export const InventoryItemSchema = z.object({
  branchId: z.string().uuid(),
  sku: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[A-Z0-9-]+$/),
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  category: z.enum(["supplies", "equipment", "consumables", "software", "furniture", "safety"]),
  unit: z.enum(["each", "box", "pack", "liter", "kg", "license", "meter"]),
  quantity: z.number().int().min(0).default(0),
  minQuantity: z.number().int().min(0).default(10),
  maxQuantity: z.number().int().min(1).default(100),
  reorderQuantity: z.number().int().min(1).default(20),
  unitCost: z.number().positive().optional(),
  location: z.string().max(200).optional(),
  preferredVendorId: z.string().uuid().optional(),
});

export const InventoryAdjustSchema = z.object({
  quantity: z
    .number()
    .int()
    .refine((n) => n !== 0, "Quantity change cannot be 0"),
  reason: z.string().min(5).max(2000),
  referenceType: z.string().optional(),
  referenceId: z.string().uuid().optional(),
});
```

### Work Order

```typescript
export const WorkOrderSchema = z.object({
  branchId: z.string().uuid(),
  title: z.string().min(3).max(255),
  description: z.string().min(5).max(5000),
  category: z.enum([
    "hvac",
    "plumbing",
    "electrical",
    "it",
    "furniture",
    "safety",
    "cleaning",
    "other",
  ]),
  location: z.string().min(1).max(255),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  assignedTo: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  costEstimate: z.number().positive().optional(),
});
```

### Vendor

```typescript
export const VendorSchema = z.object({
  name: z.string().min(1).max(255),
  contactName: z.string().max(255).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  serviceType: z.enum([
    "janitorial",
    "security",
    "it_support",
    "supplies",
    "maintenance",
    "catering",
    "other",
  ]),
  contractStart: z.string().datetime().optional(),
  contractEnd: z.string().datetime().optional(),
  contractValue: z.number().positive().optional(),
  slaTarget: z.number().min(0).max(100).default(95),
  paymentTerms: z.string().max(100).optional(),
});

export const SlaLogSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Format: YYYY-MM"),
  metrics: z.object({
    responseTime: z.number().positive(),
    resolutionTime: z.number().positive(),
    uptime: z.number().min(0).max(100),
    overallScore: z.number().min(0).max(100),
  }),
  notes: z.string().max(2000).optional(),
});
```

### Automation Flow

```typescript
export const AutomationFlowSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().max(2000).optional(),
  triggerType: z.enum(["schedule", "webhook", "event", "condition"]),
  triggerConfig: z.record(z.string(), z.any()),
  actions: z
    .array(
      z.object({
        type: z.string(),
        config: z.record(z.string(), z.any()),
      }),
    )
    .min(1, "At least one action required")
    .max(20),
});
```

### Ops Task

```typescript
export const OpsTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(5000).optional(),
  category: z.enum(["inventory", "facilities", "vendor", "automation", "compliance", "admin"]),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  assignedTo: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  relatedToType: z.string().optional(),
  relatedToId: z.string().uuid().optional(),
});
```

---

## 13. Analytics Events

| Event                        | Properties                           | Trigger            |
| ---------------------------- | ------------------------------------ | ------------------ |
| `ops_dashboard_view`         | `alertCount`, `domainMetrics`        | Dashboard loaded   |
| `ops_branch_created`         | `branchName`, `capacity`             | Branch created     |
| `ops_branch_updated`         | `branchId`, `fieldChanged`           | Branch edited      |
| `ops_branch_status_changed`  | `branchId`, `oldStatus`, `newStatus` | Status changed     |
| `ops_inventory_item_created` | `category`, `sku`                    | Item created       |
| `ops_inventory_ordered`      | `itemCount`, `totalValue`, `urgency` | Order placed       |
| `ops_inventory_adjusted`     | `itemCount`, `adjustmentType`        | Inventory adjusted |
| `ops_inventory_low_stock`    | `itemId`, `quantity`, `minQuantity`  | Low stock detected |
| `ops_work_order_created`     | `category`, `priority`               | WO created         |
| `ops_work_order_completed`   | `category`, `completionTime`, `cost` | WO completed       |
| `ops_work_order_overdue`     | `woId`, `priority`, `daysOverdue`    | WO overdue         |
| `ops_maintenance_completed`  | `asset`, `task`, `frequency`         | PM completed       |
| `ops_maintenance_overdue`    | `asset`, `task`, `daysOverdue`       | PM overdue         |
| `ops_vendor_created`         | `serviceType`, `contractValue`       | Vendor added       |
| `ops_vendor_sla_logged`      | `vendorId`, `score`, `period`        | SLA logged         |
| `ops_vendor_renewed`         | `vendorId`, `newValue`, `termMonths` | Contract renewed   |
| `ops_vendor_terminated`      | `vendorId`, `reason`                 | Contract ended     |
| `ops_automation_created`     | `triggerType`, `actionCount`         | Flow created       |
| `ops_automation_activated`   | `flowId`                             | Flow activated     |
| `ops_automation_failed`      | `flowId`, `errorType`                | Flow failed        |
| `ops_automation_test_run`    | `flowId`, `success`                  | Test run           |
| `ops_task_created`           | `category`, `priority`               | Task created       |
| `ops_task_completed`         | `category`, `onTime`                 | Task completed     |
| `ops_report_generated`       | `type`, `format`, `sections`         | Report generated   |
| `ops_report_scheduled`       | `type`, `frequency`                  | Report scheduled   |

---

## 14. Accessibility Requirements

**Global:**

- `role="navigation"` on sidebar with `aria-label="Operations navigation"`
- Dashboard metric cards: `role="group"`, `aria-label="{{domain}}: {{value}}"`
- Alert items: `role="alert"`, `aria-live="polite"` for warnings, `assertive` for critical
- Data tables: `<caption>`, `<th scope>`, `aria-sort` on sortable columns
- Color-coded priority: textual labels alongside color (Critical, High, Medium, Low)

**Key Components:**

- BranchCard: `aria-label="Branch: {{name}}, status {{status}}, capacity {{pct}}"`
- InventoryTable: `aria-label="Inventory items"`, stock status icons with text
- StockStatusDot: `aria-label="Stock status: {{ok/low/out}}"` with color
- WorkOrderCard: `aria-label="Work order {{number}}: {{title}}, priority {{priority}}, status {{status}}"`
- FacilityMap: `aria-label="Branch floor plan"` with room labels
- MaintenanceSchedule: `aria-label="Preventive maintenance: {{task}} for {{asset}}, due {{date}}"`
- VendorDetail: `aria-label="Vendor: {{name}}, service {{type}}, SLA {{score}}%"`
- AutomationFlowCard: `aria-label="Automation: {{name}}, status {{status}}, last run {{time}}"`
- TaskCard: `role="listitem"`, `aria-label="Task: {{title}}, priority {{priority}}, due {{date}}"`
- ReportCard: `aria-label="Report: {{title}}, last generated {{date}}"`
- KanbanBoard: `role="list"`, each column `aria-label="{{status}} column, {{count}} tasks"`
- Drag-and-drop: `aria-roledescription="sortable"`, keyboard `Alt+Arrow` reorder

---

## 15. Error & Edge Case Catalog

| #   | Scenario                                | User Message                                                       | Recovery                                 |
| --- | --------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| E1  | Dashboard fails                         | "Unable to load operations overview. [Retry]"                      | Retry, show cached                       |
| E2  | Branch create fails (duplicate code)    | "Branch code already exists."                                      | Use unique code                          |
| E3  | Branch close with active occupants      | "Cannot close branch: {{count}} people currently on site."         | Evacuate first or set maintenance        |
| E4  | Inventory item not found                | "Item not found."                                                  | Refresh list                             |
| E5  | Order fails (vendor inactive)           | "Cannot order: vendor is inactive."                                | Select different vendor                  |
| E6  | Inventory adjust below zero             | "Cannot reduce quantity below 0."                                  | Adjust to valid quantity                 |
| E7  | Work order assignment conflict          | "Technician already assigned to {{count}} critical WOs."           | Reassign or override                     |
| E8  | Work order completion with missing cost | "Actual cost not entered. Enter cost to close."                    | Must enter cost for budget tracking      |
| E9  | Preventive maintenance past due >30d    | "This maintenance is critically overdue. Escalated to supervisor." | Auto-escalate                            |
| E10 | Vendor contract end in past             | "Contract already expired. Initiate renewal or termination."       | Action required                          |
| E11 | SLA log outside current period          | "Cannot log SLA for a future period."                              | Select current or past period            |
| E12 | Automation flow infinite loop           | "Flow would trigger itself. Add condition to prevent recursion."   | Add guard condition                      |
| E13 | Task reassignment unauthorized          | "Only the task creator or admin can reassign."                     | Request reassignment                     |
| E14 | Report generation timeout               | "Report is taking longer than expected. Will email when ready."    | Background gen → email                   |
| E15 | No data for report period               | "No data available for selected period."                           | Extend period range                      |
| E16 | Room double-booking                     | "Room is already booked at this time."                             | Show conflicts, suggest alternatives     |
| E17 | Vendor payment past due                 | "Invoice for {{vendor}} is past due by {{days}} days."             | Process payment or dispute               |
| E18 | Automation API rate limited             | "External API rate limit reached. Flow paused until {{time}}."     | Auto-resume                              |
| E19 | Cycle count discrepancy >5%             | "Cycle count variance >5%. Recommend full recount."                | Full inventory count triggered           |
| E20 | Multi-branch inventory transfer         | Transfer between branches                                          | Log as issuance + receipt at destination |
| E21 | Emergency equipment unavailable         | "Emergency generator unavailable — maintenance in progress."       | Redundant unit or portable unit          |
| E22 | Facilities sensor offline               | "Temperature sensor in Server Room offline."                       | Manual check, replace sensor             |
| E23 | Asset tag unreadable                    | "Barcode/QR code damaged. Enter SKU manually."                     | Manual entry, reprint label              |

---

_End of Operations Manager Actor Plan — 08_
