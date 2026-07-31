# Actor: Receptionist

## 1. Identity & Role Definition

**Actor Name:** Receptionist  
**System Role ID:** `role_receptionist`  
**Description:** The front desk professional who serves as the first point of contact for visitors, students, parents, and vendors at Cyber Elias Academy. The Receptionist manages visitor check-in/out, appointment scheduling, inquiry logging, phone call routing, delivery management, and provides general administrative support to the campus.

**Receptionist Types:**

1. **Front Desk Receptionist** — Main lobby, handles all walk-in traffic
2. **Virtual Receptionist** — Remote, handles phone and digital inquiries
3. **Satellite Receptionist** — Secondary campus entrance or satellite location
4. **Float Receptionist** — Covers breaks, lunches, and absences

**Shift Types:**

1. **Morning Shift** — 7:00 AM - 3:00 PM
2. **Afternoon Shift** — 11:00 AM - 7:00 PM
3. **Evening Shift** — 3:00 PM - 10:00 PM
4. **Weekend Shift** — Saturday/Sunday coverage

**Employment States:**

1. **Active** — Currently working
2. **On Break** — Temporary break (lunch, rest)
3. **On Leave** — Vacation, medical, personal
4. **Inactive** — No longer employed

---

## 2. Primary Goals & Success KPIs

**Goal 1: Efficient Visitor Management**

- KPI: Visitor check-in time ≤ 2 minutes
- KPI: Visitor check-out compliance ≥ 95%
- KPI: Lost visitor incidents = 0
- KPI: Visitor badge accuracy (all fields correct) ≥ 99%

**Goal 2: Accurate Appointment Scheduling**

- KPI: Double-booking incidents = 0
- KPI: Appointment confirmation rate ≥ 90%
- KPI: No-show documentation rate = 100%
- KPI: Reschedule requests handled within 5 minutes

**Goal 3: Comprehensive Inquiry Logging**

- KPI: All walk-in inquiries logged — 100%
- KPI: Inquiry response SLA tag accuracy ≥ 98%
- KPI: Follow-up action items completed ≥ 95%

**Goal 4: Professional Phone Management**

- KPI: Calls answered within 3 rings ≥ 90%
- KPI: Call routing accuracy ≥ 95%
- KPI: Voicemail retrieval within 1 hour — 100%
- KPI: Missed call callback within 30 min ≥ 85%

**Goal 5: Accurate Delivery Management**

- KPI: Deliveries logged upon receipt = 100%
- KPI: Recipient notification within 10 minutes ≥ 95%
- KPI: Delivery misplacement incidents = 0
- KPI: Package hand-off confirmation rate = 100%

---

## 3. Complete Screen Inventory

### Screen 3.1: Front Desk Hub (`/receptionist/dashboard`)

**Purpose:** Real-time command center — today's visitors, upcoming appointments, pending tasks, current status.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Front Desk Hub                                  Shift: Morning    │
│  Welcome, Jessica — Main Entrance                     [Sign Out ▼]  │
├──────────────────┬──────────────────────┬──────────────────────────┤
│  Visitors Now    │  Today's Schedule    │  Quick Actions           │
│  ┌────────────┐  │  ┌────────────────┐  │  ┌──────────────────┐  │
│  │ Currently  │  │  │ 9:00 AM       │  │  │ [Check In →]     │  │
│  │ on Site: 5 │  │  │ Prof. Smith   │  │  │ [Check Out →]    │  │
│  │            │  │  │ Meeting w/Dean│  │  ├──────────────────┤  │
│  │ Alex J     │  │  │ [Arrived]     │  │  │ [New Appt →]     │  │
│  │ 10:15 - now│  │  ├───────────────┤  │  ├──────────────────┤  │
│  │ Jane D     │  │  │ 10:00 AM     │  │  │ [Log Inquiry →]  │  │
│  │ 10:30 - now│  │  │ Parent Conf  │  │  ├──────────────────┤  │
│  │ Vendor     │  │  │ w/Advisor    │  │  │ [Log Call →]     │  │
│  │ (UPS)      │  │  │ [Expected]   │  │  ├──────────────────┤  │
│  │ [View All]  │  │  ├───────────────┤  │  │ [Log Delivery→] │  │
│  └────────────┘  │  │ 2:00 PM      │  │  └──────────────────┘  │
│                  │  │ Tour: Smith  │  │                          │
│  Pending Tasks   │  │ Family (3)   │  │  Quick Stats              │
│  ● 1 delivery   │  │ [Confirmed]  │  │  ┌────────────────────┐  │
│    unclaimed   │  ├───────────────┤  │  │ Check-ins today: 28│  │
│  ● 2 calls to  │  │ 4:00 PM      │  │  │ Appointments: 12  │  │
│    return      │  │ Interview    │  │  │ Inquiries: 5       │  │
│  ● 1 inquiry   │  │ Jane Doe     │  │  │ Calls Answered: 18 │  │
│    follow-up   │  │ [Pending]    │  │  │ Deliveries: 4      │  │
│  └────────────┘  │  └────────────────┘  │  └────────────────────┘  │
└──────────────────┴──────────────────────┴──────────────────────────┘
```

**Data Sources:**

- `GET /api/receptionist/dashboard` — aggregated dashboard data
- `GET /api/receptionist/visitors/active` — currently on-site visitors
- `GET /api/receptionist/appointments/today` — today's schedule
- `GET /api/receptionist/tasks/pending` — pending tasks

**States:**

- **Loading:** Dashboard skeleton with 3-column layout
- **Empty (no visitors):** "No visitors currently on site."
- **Empty (no appointments):** "No appointments scheduled for today."
- **Empty (no tasks):** "All tasks complete."
- **Error:** Dashboard fails → "Unable to load front desk. [Retry]"
- **Edge Cases:** Shift change → banner "Shift ending at 3:00 PM. End-of-shift checklist pending."

### Screen 3.2: Visitor Check-In (`/receptionist/check-in`)

**Purpose:** Quick visitor registration, badge printing, host notification.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Visitor Check-In                                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Step 1: Find or Add Visitor                                          │
│  🔍 [Search by name, email, phone...]                                │
│                                                                       │
│  Recent Visitors:                                                      │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │ Alex Johnson — Student (last visit: Oct 28)        [Check In]│    │
│  │ Jane Doe — Student (last visit: Oct 25)             [Check In]│    │
│  │ Sarah Chen — Mentor (last visit: Oct 22)            [Check In]│    │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  Or register new visitor:  [New Visitor →]                           │
├─────────────────────────────────────────────────────────────────────┤
│  Step 2: Visit Details                                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Visitor: Alex Johnson                                        │   │
│  │ Type: [Student ▼]                                           │   │
│  │ Purpose: [Meeting ▼] [Appointment ▼] [Tour ▼] [Other ▼]    │   │
│  │ Host: [Prof. Smith ▼]                                       │   │
│  │ Location: [Room 204 ▼]                                      │   │
│  │ Vehicle Info (optional): License Plate: [_________]          │   │
│  │ Notes: "Meeting about capstone project"                      │   │
│  │                                                              │   │
│  │ ⚠ Photo ID Verified: [✅ Yes]                               │   │
│  │ ⚠ Signed NDA (if applicable): [⬜]                          │   │
│  │                                                              │   │
│  │ Badge Type: [Temporary ▼]  Expires: [Today 5:00 PM ▼]      │   │
│  │                                                              │   │
│  │ [Check In] [Cancel]                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│  Step 3: Badge Printed                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  ✅ Visitor checked in successfully!                         │   │
│  │  Badge printing... [████████████░░]  90%                     │   │
│  │                                                              │   │
│  │  [Print Badge]  [Email Badge]  [Mark as Complete]            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `POST /api/receptionist/visitors/check-in`, `GET /api/receptionist/visitors/search?q=`

**States:**

- **Search mode:** Search input with results dropdown
- **New visitor:** Registration form
- **Check-in form:** Visit details with validation
- **Printing:** Progress bar for thermal badge printer
- **Error:** "Check-in failed. [Retry]"
- **Edge Cases:** Visitor already checked in → "Alex is already checked in. [View Active Visitor]"

### Screen 3.3: Visitor Check-Out (`/receptionist/check-out`)

**Purpose:** Process visitor departure, collect badge, finalize visit record.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Visitor Check-Out                                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Currently On Site (5)                                                │
│  🔍 [Search...]                                                       │
│  ┌──────────────┬──────────┬──────────┬──────────┬────────────────┐ │
│  │ Visitor      │ Time In  │ Host     │ Purpose  │ Actions        │ │
│  ├──────────────┼──────────┼──────────┼──────────┼────────────────┤ │
│  │ Alex Johnson │ 10:15 AM │ Smith    │ Meeting  │ [Check Out]    │ │
│  │ Jane Doe     │ 10:30 AM │ Jones    │ Advising │ [Check Out]    │ │
│  │ UPS Driver   │ 10:45 AM │ Dock     │ Delivery │ [Check Out]    │ │
│  │ Sarah Chen   │ 11:00 AM │ Lee      │ Mentor   │ [Check Out]    │ │
│  │ Mike Brown   │ 11:15 AM │ Davis    │ Tour     │ [Check Out]    │ │
│  └──────────────┴──────────┴──────────┴──────────┴────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  Check-Out: Alex Johnson                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Visit Summary:                                               │   │
│  │ ● Checked in: 10:15 AM                                       │   │
│  │ ● Host: Prof. Smith                                          │   │
│  │ ● Purpose: Capstone Project Meeting                          │   │
│  │ ● Duration: 1 hour 15 minutes                                │   │
│  │                                                              │   │
│  │ Badge Returned: [✅ Yes]                                     │   │
│  │                                                              │   │
│  │ Feedback (optional):                                          │   │
│  │ "Great visit. Everything went smoothly."                     │   │
│  │                                                              │   │
│  │ [Confirm Check-Out]                                           │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `POST /api/receptionist/visitors/check-out`

**States:**

- **Loading:** Table skeleton with 5 rows
- **Empty:** "No visitors currently on site."
- **Check-out confirm:** Summary panel + badge return validation

### Screen 3.4: Appointment Scheduler (`/receptionist/appointments`)

**Purpose:** Schedule, view, manage appointments for all staff, rooms, and resources.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Appointment Scheduler                                  [+ New]     │
│  [Day View] [Week View] [Month View]     Date: [Nov 1, 2026 ▼]    │
├─────────────────────────────────────────────────────────────────────┤
│  Staff: [All ▼]  |  Room: [All ▼]  |  Type: [All ▼]              │
├────────────────────┬───────────────────────────────────────────────┤
│  Time Slots        │  Appointments                                  │
│  8:00 AM           │  ┌─────────────────────────────────────────┐ │
│  8:30 AM           │  │                                        │ │
│  9:00 AM           │  │  Prof. Smith — Dean Meeting             │ │
│  9:30 AM   ████████│  │  Room 301 | 9:00-10:00                │ │
│  10:00 AM  ████████│  │  [Checked In] [Complete] [Reschedule]  │ │
│  10:30 AM  ████████│  ├─────────────────────────────────────────┤ │
│  11:00 AM          │  │                                        │ │
│  11:30 AM          │  │  Parent: Jane Doe — Advisor Meeting    │ │
│  12:00 PM          │  │  Room 204 | 10:00-10:30               │ │
│  12:30 PM          │  │  [Pending] [Confirm] [Reschedule]      │ │
│  1:00 PM           │  ├─────────────────────────────────────────┤ │
│  1:30 PM   ████████│  │                                        │ │
│  2:00 PM   ████████│  │  Tour: Smith Family (3)               │ │
│  ...               │  │  Campus Tour | 2:00-3:00               │ │
│                    │  │  [Confirmed] [Check In]                 │ │
│                    │  └─────────────────────────────────────────┘ │
├────────────────────┴───────────────────────────────────────────────┤
│  Today's Stats: 12 appointments | 3 completed | 1 no-show | 0 open│
└─────────────────────────────────────────────────────────────────────┘
```

**New Appointment Modal:**

```
┌──────────────────────────────────────────────────────────────┐
│  New Appointment                                              │
│  Title: [____________________________]                       │
│  Type: [Meeting ▼] [Tour ▼] [Interview ▼] [Other ▼]        │
│  Staff Member: [Prof. Smith ▼]                               │
│  Visitor: [Search or add...]                                  │
│  Date: [Nov 1, 2026]  |  Time: [2:00 PM]                    │
│  Duration: [30 min ▼]                                         │
│  Room/Location: [Room 204 ▼]                                  │
│  Notes: [____________________________]                        │
│  Send Confirmation: [✅ Email] [⬜ SMS]                      │
│  [Create] [Cancel]                                            │
└──────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/appointments`, `POST /api/receptionist/appointments`, `PUT /api/receptionist/appointments/:id`

**States:**

- **Loading:** Calendar skeleton with time slots
- **Empty (no appointments):** "No appointments scheduled for this day."
- **Error:** "Failed to load appointments. [Retry]"

### Screen 3.5: Inquiry Log (`/receptionist/inquiries`)

**Purpose:** Log all walk-in questions, requests, complaints, and follow-ups.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Inquiry Log                                              [+ New]   │
│  [Today] [This Week] [This Month] [All]  🔍 [Search...]           │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┬──────────┬──────────┬───────────┬────────┬──────────┐│
│  │ Time     │ Person   │ Category │ Staff     │ Status │ Actions  ││
│  ├──────────┼──────────┼──────────┼───────────┼────────┼──────────┤│
│  │ 10:15 AM │ Alex J   │ Academics│ Routed to │ Open   │ [View]   ││
│  │          │ (Student)│          │ Advising  │        │          ││
│  │ 10:45 AM │ Sarah C  │ Career   │ Forwarded │ Closed │ [Details]││
│  │          │ (Mentor) │          │ to Mentor │ ✅    │          ││
│  │ 11:00 AM │ Mike B   │ Admin    │ Resolved  │ Closed │ [Details]││
│  │          │ (Visitor)│          │ on site   │ ✅    │          ││
│  │ 11:30 AM │ Caller   │ Tech     │ Created   │ Pending│ [View]   ││
│  │          │ (Phone)  │ Support  │ ticket #42│        │          ││
│  └──────────┴──────────┴──────────┴───────────┴────────┴──────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Categories: Academics | Admissions | Career | Finance | IT Support │
│  | Admin | Facilities | Other                                       │
│  Actions: Resolve on Site | Route to Department | Create Ticket     │
│  | Schedule Follow-up                                                │
└─────────────────────────────────────────────────────────────────────┘
```

**New Inquiry Modal:**

```
┌──────────────────────────────────────────────────────────────┐
│  New Inquiry                                                 │
│  Person Name: [________________]  Contact: [_______________]│
│  Person Type: [Student ▼] [Parent ▼] [Visitor ▼] [Caller ▼] │
│  Category: [Select ▼]                                        │
│  Description: [_______________________________]              │
│  Action Taken: [_____________________________]              │
│  Resolution: [Resolved on Site] [Route to ▼] [Create Ticket]│
│  Follow-up Date: [________]  Notes: [______________]        │
│  [Log Inquiry] [Cancel]                                      │
└──────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/inquiries`, `POST /api/receptionist/inquiries`

**States:**

- **Loading:** Table skeleton
- **Empty (no inquiries):** "No inquiries logged. Great service today!"
- **Error:** "Failed to load inquiries. [Retry]"

### Screen 3.6: Phone Log (`/receptionist/phone-log`)

**Purpose:** Log all incoming and outgoing calls, take messages, route calls.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Phone Log                                                [+ Log]  │
│  [Today] [This Week] [All]  🔍 [Search...]                        │
├─────────────────────────────────────────────────────────────────────┤
│  Missed Calls (2)                                                     │
│  ┌──────────┬────────────┬──────────┬────────┬──────────────────┐  │
│  │ Time     │ Caller      │ Number   │ Called │ Callback Status │  │
│  ├──────────┼────────────┼──────────┼────────┼──────────────────┤  │
│  │ 10:30 AM │ John Smith │ 555-0123 │ Dean   │ 🔴 Not yet      │  │
│  │ 11:15 AM │ Unknown    │ 555-9876 │ General│ 🟡 Left msg     │  │
│  └──────────┴────────────┴──────────┴────────┴──────────────────┘  │
│                                                                       │
│  Today's Calls (18 answered, 2 missed)                                │
│  ┌──────────┬────────────┬──────────┬────────┬────────┬──────────┐  │
│  │ Time     │ Direction  │ Caller   │ Dept   │ Status │ Actions  │  │
│  ├──────────┼────────────┼──────────┼────────┼────────┼──────────┤  │
│  │ 9:05 AM  │ Incoming   │ Sarah    │ Career │ Trans- │ [Details]│  │
│  │          │            │ Chen     │        │ ferred │          │  │
│  │ 9:30 AM  │ Outgoing   │ Front    │ Vendor │ Com-   │ [Details]│  │
│  │          │            │ Desk     │        │ pleted │          │  │
│  │ 10:00 AM │ Incoming   │ Mike B   │ Ad-    │ Voicem-│ [Details]│  │
│  │          │            │          │ miss. │ ail    │          │  │
│  └──────────┴────────────┴──────────┴────────┴────────┴──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**New Call Log Modal:**

```
┌──────────────────────────────────────────────────────────────┐
│  Log Phone Call                                              │
│  Direction: [Incoming ▼] [Outgoing ▼]                       │
│  Caller Name: [________________]                             │
│  Phone Number: [_______________]                             │
│  Department Requested: [Select ▼]                            │
│  Called For: [Person: ___________]                           │
│  Action Taken:                                               │
│  ○ Transferred to [________]  —  Connected: [✅ Yes] [❌ No]│
│  ○ Took message                                              │
│  ○ Voicemail left                                            │
│  ○ Callback requested                                        │
│  Message: [____________________________________]             │
│  [Log Call] [Cancel]                                         │
└──────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/phone-log`, `POST /api/receptionist/phone-log`

### Screen 3.7: Delivery Log (`/receptionist/deliveries`)

**Purpose:** Log incoming packages, mail, food deliveries and notify recipients.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Delivery Log                                             [+ Log]  │
│  [Today] [Unclaimed] [This Week] [All]  🔍 [Search...]            │
├─────────────────────────────────────────────────────────────────────┤
│  Unclaimed Deliveries (3)                                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬─────────┐│
│  │ Time     │ Courier  │ Recipient│ Type     │ Location │ Status  ││
│  ├──────────┼──────────┼──────────┼──────────┼──────────┼─────────┤│
│  │ 9:30 AM  │ FedEx    │ Prof.    │ Document │ Front    │ 📩 Notif│
│  │          │          │ Smith    │          │ Desk Bin │ sent    ││
│  │ 10:00 AM │ UPS      │ Lab      │ Equipment│ Receiv-  │ Await   ││
│  │          │          │          │ (15kg)   │ ing Dock │ pickup  ││
│  │ 11:00 AM │ DoorDash │ Adm.     │ Food     │ Front    │ ⏳ Pend ││
│  │          │          │ Meeting  │          │ Desk     │         ││
│  └──────────┴──────────┴──────────┴──────────┴──────────┴─────────┘│
│                                                                       │
│  Today's Deliveries (4)                                                │
│  ┌──────────┬──────────┬────────┬──────────┬────────┬──────────────┐│
│  │ Time     │ Courier  │ Recip.│ Type     │ Claimed│ Actions      ││
│  ├──────────┼──────────┼────────┼──────────┼────────┼──────────────┤│
│  │ 8:30 AM  │ USPS     │ Dean   │ Mail     │ ✅ 9AM │ [Details]   ││
│  │ 10:00 AM │ Amazon   │ Lab    │ Supplies │ ✅ 10AM│ [Details]   ││
│  └──────────┴──────────┴────────┴──────────┴────────┴──────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**New Delivery Modal:**

```
┌──────────────────────────────────────────────────────────────┐
│  Log Delivery                                                 │
│  Courier: [UPS ▼] [FedEx ▼] [USPS ▼] [Amazon ▼] [Other ▼]  │
│  Tracking #: [________________] (optional)                   │
│  Recipient: [Search or type name...]                          │
│  Type: [Document ▼] [Package ▼] [Equipment ▼] [Food ▼]      │
│  Location: [Front Desk ▼] [Receiving Dock ▼] [Mail Room ▼]  │
│  Weight (est.): [________] kg                                │
│  Notes: [_____________________________]                      │
│  Notify Recipient: [✅ Email] [⬜ SMS]                       │
│  [Log Delivery] [Cancel]                                      │
└──────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/deliveries`, `POST /api/receptionist/deliveries`, `POST /api/receptionist/deliveries/:id/claim`

### Screen 3.8: Staff Directory (`/receptionist/directory`)

**Purpose:** Quick lookup of staff, departments, room numbers, contact info.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Staff Directory                                          [Print]   │
│  🔍 [Search by name, department, room...]                         │
│  [A-Z Filter: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]│
├─────────────────────────────────────────────────────────────────────┤
│  Department: [All ▼] | Location: [All ▼] | Type: [All ▼]         │
├─────────────────────────────────────────────────────────────────────┤
│  Results (42 staff)                                                    │
│  ┌──────────────┬──────────┬──────────────┬──────────┬──────────┐  │
│  │ Name         │ Title    │ Department   │ Room     │ Contact  │  │
│  ├──────────────┼──────────┼──────────────┼──────────┼──────────┤  │
│  │ Prof. Smith  │ Instructor│ Network Def │ 204      │ x1234    │  │
│  │              │           │             │          │ smith@   │  │
│  │ Dr. Jones    │ Sr. Inst │ Cryptography │ 206      │ x1235    │  │
│  │ Sarah Chen   │ Mentor   │ Career Svcs │ Virtual  │ x1240    │  │
│  │ Mark Davis   │ Security │ Facilities  │ Ground   │ x1000    │  │
│  │ Admin Office │ —        │ Admin       │ 101      │ x1001    │  │
│  └──────────────┴──────────┴──────────────┴──────────┴──────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Quick Dial (Favorites)                                               │
│  ● Dean Office — x1001                                              │
│  ● Security — x1000                                                 │
│  ● IT Support — x1200                                               │
│  ● Facilities — x1300                                               │
│  [Edit Quick Dial]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/directory`

### Screen 3.9: Shift & Task Management (`/receptionist/tasks`)

**Purpose:** View shift schedule, daily checklist, end-of-shift hand-off.

**Wireframe Layout:**

```
┌─────────────────────────────────────────────────────────────────────┤
│  Shift & Tasks                                     [Start Shift]   │
├─────────────────────────────────────────────────────────────────────┤
│  Current Shift: Morning (7:00 AM - 3:00 PM)                        │
│  Status: Active (started at 6:55 AM)                               │
│  Time Remaining: 3h 45m                                             │
├─────────────────────────────────────────────────────────────────────┤
│  Daily Checklist                                                       │
│  □ Open front desk — 6:55 AM ✅                                     │
│  □ Check voicemail — 7:00 AM ✅                                     │
│  □ Verify appointment schedule — 7:15 AM ✅                         │
│  □ Inspect visitor area — 8:00 AM ✅                                │
│  □ Restock visitor badges — 8:30 AM ⬜                              │
│  □ End-of-day report — 2:45 PM ⬜                                   │
│  □ Shift hand-off with Jessica (afternoon) — 2:50 PM ⬜             │
├─────────────────────────────────────────────────────────────────────┤
│  Shift Notes (visible to next shift)                                   │
│  [_____________________________________________________________]    │
│  [Save Notes]                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  Upcoming Shifts                                                        │
│  ● Tomorrow: Morning Shift (7AM-3PM) — You                          │
│  ● Nov 3: Afternoon Shift (11AM-7PM) — You                         │
│  ● Nov 5: Day Off                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/receptionist/tasks`, `PUT /api/receptionist/tasks/:id`, `POST /api/receptionist/shift/start`

---

## 4. Full Database Schema

### Table: `visitors`

| Column              | Type           | Constraints | Default             | Description                                                            |
| ------------------- | -------------- | ----------- | ------------------- | ---------------------------------------------------------------------- |
| `id`                | `UUID`         | PK          | `gen_random_uuid()` | —                                                                      |
| `first_name`        | `VARCHAR(100)` | NOT NULL    | —                   | —                                                                      |
| `last_name`         | `VARCHAR(100)` | NOT NULL    | —                   | —                                                                      |
| `email`             | `VARCHAR(255)` | NULLABLE    | —                   | —                                                                      |
| `phone`             | `VARCHAR(20)`  | NULLABLE    | —                   | E.164 format                                                           |
| `company`           | `VARCHAR(200)` | NULLABLE    | —                   | For vendor/delivery                                                    |
| `visitor_type`      | `VARCHAR(50)`  | NOT NULL    | `'guest'`           | student, parent, mentor, vendor, guest, staff, interviewee, tour_group |
| `photo_id_verified` | `BOOLEAN`      | NOT NULL    | `false`             | —                                                                      |
| `nda_signed`        | `BOOLEAN`      | NOT NULL    | `false`             | —                                                                      |
| `notes`             | `TEXT`         | NULLABLE    | —                   | General notes                                                          |
| `blacklisted`       | `BOOLEAN`      | NOT NULL    | `false`             | Security flag                                                          |
| `blacklist_reason`  | `VARCHAR(500)` | NULLABLE    | —                   | —                                                                      |
| `total_visits`      | `INTEGER`      | NOT NULL    | `0`                 | —                                                                      |
| `last_visit_at`     | `TIMESTAMPTZ`  | NULLABLE    | —                   | —                                                                      |
| `created_at`        | `TIMESTAMPTZ`  | NOT NULL    | `NOW()`             | —                                                                      |
| `updated_at`        | `TIMESTAMPTZ`  | NOT NULL    | `NOW()`             | —                                                                      |

**Indexes:**

- `idx_visitors_name` ON `first_name`, `last_name`
- `idx_visitors_email` ON `email`
- `idx_visitors_phone` ON `phone`

### Table: `visits`

| Column                | Type           | Constraints                     | Default             | Description                                            |
| --------------------- | -------------- | ------------------------------- | ------------------- | ------------------------------------------------------ |
| `id`                  | `UUID`         | PK                              | `gen_random_uuid()` | —                                                      |
| `visitor_id`          | `UUID`         | FK → visitors.id, NOT NULL      | —                   | —                                                      |
| `receptionist_id_in`  | `UUID`         | FK → receptionists.id, NOT NULL | —                   | Who checked in                                         |
| `receptionist_id_out` | `UUID`         | FK → receptionists.id, NULLABLE | —                   | Who checked out                                        |
| `purpose`             | `VARCHAR(50)`  | NOT NULL                        | —                   | meeting, appointment, tour, interview, delivery, other |
| `purpose_detail`      | `VARCHAR(500)` | NULLABLE                        | —                   | —                                                      |
| `host_id`             | `UUID`         | FK → users.id, NULLABLE         | —                   | Staff they're visiting                                 |
| `host_name`           | `VARCHAR(255)` | NULLABLE                        | —                   | Denormalized for speed                                 |
| `location`            | `VARCHAR(200)` | NULLABLE                        | —                   | Room or area                                           |
| `badge_type`          | `VARCHAR(50)`  | NOT NULL                        | `'temporary'`       | temporary, permanent, day_pass                         |
| `badge_id`            | `VARCHAR(100)` | NULLABLE                        | —                   | Badge number                                           |
| `badge_returned`      | `BOOLEAN`      | NOT NULL                        | `false`             | —                                                      |
| `vehicle_info`        | `VARCHAR(200)` | NULLABLE                        | —                   | License plate                                          |
| `checked_in_at`       | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`             | —                                                      |
| `checked_out_at`      | `TIMESTAMPTZ`  | NULLABLE                        | —                   | —                                                      |
| `duration_minutes`    | `INTEGER`      | NULLABLE                        | —                   | Computed on check-out                                  |
| `status`              | `VARCHAR(50)`  | NOT NULL                        | `'active'`          | active, completed, cancelled                           |
| `feedback`            | `TEXT`         | NULLABLE                        | —                   | Visitor feedback                                       |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`             | —                                                      |

**Indexes:**

- `idx_visits_status` ON `status`
- `idx_visits_visitor` ON `visitor_id`
- `idx_visits_date` ON `checked_in_at`
- `idx_visits_host` ON `host_id`

### Table: `receptionists`

| Column             | Type           | Constraints       | Default     | Description                          |
| ------------------ | -------------- | ----------------- | ----------- | ------------------------------------ |
| `id`               | `UUID`         | PK, FK → users.id | —           | —                                    |
| `employee_id`      | `VARCHAR(20)`  | UNIQUE, NOT NULL  | —           | CEA-REC-YYYY-NNNNN                   |
| `station`          | `VARCHAR(100)` | NOT NULL          | —           | "Main Entrance", "Satellite"         |
| `shift_preference` | `VARCHAR(50)`  | NOT NULL          | `'morning'` | morning, afternoon, evening, weekend |
| `current_shift`    | `VARCHAR(50)`  | NULLABLE          | —           | Current shift assignment             |
| `phone_extension`  | `VARCHAR(20)`  | NULLABLE          | —           | Desk phone extension                 |
| `is_available`     | `BOOLEAN`      | NOT NULL          | `true`      | At desk status                       |
| `status`           | `VARCHAR(50)`  | NOT NULL          | `'active'`  | active, on_break, on_leave, inactive |
| `created_at`       | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`     | —                                    |
| `updated_at`       | `TIMESTAMPTZ`  | NOT NULL          | `NOW()`     | —                                    |

### Table: `appointments`

| Column                | Type           | Constraints                | Default             | Description                                                   |
| --------------------- | -------------- | -------------------------- | ------------------- | ------------------------------------------------------------- |
| `id`                  | `UUID`         | PK                         | `gen_random_uuid()` | —                                                             |
| `title`               | `VARCHAR(255)` | NOT NULL                   | —                   | —                                                             |
| `appointment_type`    | `VARCHAR(50)`  | NOT NULL                   | —                   | meeting, tour, interview, advising, mentoring, other          |
| `staff_id`            | `UUID`         | FK → users.id, NOT NULL    | —                   | Staff member                                                  |
| `visitor_id`          | `UUID`         | FK → visitors.id, NULLABLE | —                   | Pre-registered visitor                                        |
| `visitor_name`        | `VARCHAR(255)` | NULLABLE                   | —                   | If not registered                                             |
| `visitor_email`       | `VARCHAR(255)` | NULLABLE                   | —                   | —                                                             |
| `visitor_phone`       | `VARCHAR(20)`  | NULLABLE                   | —                   | —                                                             |
| `visitor_count`       | `INTEGER`      | NOT NULL                   | `1`                 | Party size                                                    |
| `scheduled_at`        | `TIMESTAMPTZ`  | NOT NULL                   | —                   | Start time                                                    |
| `duration_minutes`    | `INTEGER`      | NOT NULL                   | `30`                | —                                                             |
| `room`                | `VARCHAR(200)` | NULLABLE                   | —                   | —                                                             |
| `status`              | `VARCHAR(50)`  | NOT NULL                   | `'pending'`         | pending, confirmed, checked_in, completed, cancelled, no_show |
| `confirmation_sent`   | `BOOLEAN`      | NOT NULL                   | `false`             | —                                                             |
| `reminder_sent`       | `BOOLEAN`      | NOT NULL                   | `false`             | —                                                             |
| `notes`               | `TEXT`         | NULLABLE                   | —                   | —                                                             |
| `cancelled_at`        | `TIMESTAMPTZ`  | NULLABLE                   | —                   | —                                                             |
| `cancellation_reason` | `VARCHAR(500)` | NULLABLE                   | —                   | —                                                             |
| `created_by`          | `UUID`         | FK → users.id, NOT NULL    | —                   | Receptionist who created                                      |
| `created_at`          | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`             | —                                                             |
| `updated_at`          | `TIMESTAMPTZ`  | NOT NULL                   | `NOW()`             | —                                                             |

**Indexes:**

- `idx_appt_date` ON `scheduled_at`
- `idx_appt_staff` ON `staff_id`
- `idx_appt_status` ON `status`

### Table: `inquiries`

| Column           | Type           | Constraints                     | Default              | Description                                                                  |
| ---------------- | -------------- | ------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| `id`             | `UUID`         | PK                              | `gen_random_uuid()`  | —                                                                            |
| `person_name`    | `VARCHAR(255)` | NOT NULL                        | —                    | —                                                                            |
| `contact`        | `VARCHAR(255)` | NULLABLE                        | —                    | Email or phone                                                               |
| `person_type`    | `VARCHAR(50)`  | NOT NULL                        | —                    | student, parent, visitor, caller, vendor, other                              |
| `category`       | `VARCHAR(100)` | NOT NULL                        | —                    | academics, admissions, career, finance, it_support, admin, facilities, other |
| `description`    | `TEXT`         | NOT NULL                        | —                    | —                                                                            |
| `action_taken`   | `TEXT`         | NULLABLE                        | —                    | —                                                                            |
| `resolution`     | `VARCHAR(50)`  | NOT NULL                        | `'resolved_on_site'` | resolved_on_site, routed, ticket_created, follow_up_scheduled                |
| `routed_to`      | `VARCHAR(255)` | NULLABLE                        | —                    | Department or person                                                         |
| `ticket_id`      | `VARCHAR(50)`  | NULLABLE                        | —                    | If support ticket created                                                    |
| `follow_up_date` | `DATE`         | NULLABLE                        | —                    | —                                                                            |
| `status`         | `VARCHAR(50)`  | NOT NULL                        | `'open'`             | open, closed, pending_follow_up                                              |
| `resolved_by`    | `UUID`         | FK → users.id, NULLABLE         | —                    | —                                                                            |
| `resolved_at`    | `TIMESTAMPTZ`  | NULLABLE                        | —                    | —                                                                            |
| `notes`          | `TEXT`         | NULLABLE                        | —                    | Internal notes                                                               |
| `logged_by`      | `UUID`         | FK → receptionists.id, NOT NULL | —                    | —                                                                            |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`              | —                                                                            |
| `updated_at`     | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`              | —                                                                            |

**Indexes:** `idx_inquiry_status` ON `status`, `idx_inquiry_category` ON `category`

### Table: `phone_logs`

| Column                  | Type           | Constraints                     | Default        | Description                                              |
| ----------------------- | -------------- | ------------------------------- | -------------- | -------------------------------------------------------- |
| `id`                    | `UUID`         | PK                              | —              | —                                                        |
| `direction`             | `VARCHAR(20)`  | NOT NULL                        | —              | incoming, outgoing                                       |
| `caller_name`           | `VARCHAR(255)` | NULLABLE                        | —              | —                                                        |
| `caller_number`         | `VARCHAR(50)`  | NULLABLE                        | —              | —                                                        |
| `department_requested`  | `VARCHAR(100)` | NULLABLE                        | —              | —                                                        |
| `called_for`            | `VARCHAR(255)` | NULLABLE                        | —              | Specific person requested                                |
| `action_taken`          | `VARCHAR(50)`  | NOT NULL                        | —              | transferred, took_message, voicemail, callback_requested |
| `transferred_to`        | `VARCHAR(255)` | NULLABLE                        | —              | —                                                        |
| `transfer_connected`    | `BOOLEAN`      | NULLABLE                        | —              | —                                                        |
| `message`               | `TEXT`         | NULLABLE                        | —              | —                                                        |
| `callback_status`       | `VARCHAR(50)`  | NOT NULL                        | `'not_needed'` | not_needed, pending, completed                           |
| `callback_completed_at` | `TIMESTAMPTZ`  | NULLABLE                        | —              | —                                                        |
| `logged_by`             | `UUID`         | FK → receptionists.id, NOT NULL | —              | —                                                        |
| `created_at`            | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`        | —                                                        |

**Indexes:** `idx_phone_date` ON `created_at`, `idx_phone_callback` ON `callback_status`

### Table: `deliveries`

| Column                  | Type           | Constraints                     | Default             | Description                                     |
| ----------------------- | -------------- | ------------------------------- | ------------------- | ----------------------------------------------- |
| `id`                    | `UUID`         | PK                              | `gen_random_uuid()` | —                                               |
| `courier`               | `VARCHAR(100)` | NOT NULL                        | —                   | UPS, FedEx, USPS, Amazon, DoorDash, Other       |
| `tracking_number`       | `VARCHAR(255)` | NULLABLE                        | —                   | —                                               |
| `recipient_id`          | `UUID`         | FK → users.id, NULLABLE         | —                   | Staff recipient                                 |
| `recipient_name`        | `VARCHAR(255)` | NOT NULL                        | —                   | Denormalized                                    |
| `delivery_type`         | `VARCHAR(50)`  | NOT NULL                        | —                   | document, package, equipment, mail, food, other |
| `weight_kg`             | `DECIMAL(6,2)` | NULLABLE                        | —                   | —                                               |
| `location`              | `VARCHAR(100)` | NOT NULL                        | —                   | front_desk, receiving_dock, mail_room           |
| `storage_location`      | `VARCHAR(200)` | NULLABLE                        | —                   | Bin number, shelf                               |
| `status`                | `VARCHAR(50)`  | NOT NULL                        | `'pending'`         | pending, notified, claimed, forwarded, returned |
| `recipient_notified_at` | `TIMESTAMPTZ`  | NULLABLE                        | —                   | —                                               |
| `notification_method`   | `VARCHAR(50)`  | NULLABLE                        | —                   | email, sms, both                                |
| `claimed_at`            | `TIMESTAMPTZ`  | NULLABLE                        | —                   | —                                               |
| `claimed_by`            | `UUID`         | FK → users.id, NULLABLE         | —                   | —                                               |
| `signature`             | `TEXT`         | NULLABLE                        | —                   | Digital signature ref                           |
| `notes`                 | `TEXT`         | NULLABLE                        | —                   | —                                               |
| `logged_by`             | `UUID`         | FK → receptionists.id, NOT NULL | —                   | —                                               |
| `created_at`            | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`             | —                                               |
| `updated_at`            | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`             | —                                               |

**Indexes:** `idx_delivery_status` ON `status`, `idx_delivery_recipient` ON `recipient_id`

### Table: `receptionist_tasks`

| Column            | Type           | Constraints                     | Default   | Description                     |
| ----------------- | -------------- | ------------------------------- | --------- | ------------------------------- |
| `id`              | `UUID`         | PK                              | —         | —                               |
| `receptionist_id` | `UUID`         | FK → receptionists.id, NOT NULL | —         | —                               |
| `shift_date`      | `DATE`         | NOT NULL                        | —         | —                               |
| `task_name`       | `VARCHAR(255)` | NOT NULL                        | —         | —                               |
| `category`        | `VARCHAR(50)`  | NOT NULL                        | `'daily'` | daily, opening, closing, ad_hoc |
| `completed`       | `BOOLEAN`      | NOT NULL                        | `false`   | —                               |
| `completed_at`    | `TIMESTAMPTZ`  | NULLABLE                        | —         | —                               |
| `sort_order`      | `INTEGER`      | NOT NULL                        | `0`       | —                               |
| `created_at`      | `TIMESTAMPTZ`  | NOT NULL                        | `NOW()`   | —                               |

**Indexes:** UNIQUE(receptionist_id, shift_date, task_name)

### Table: `receptionist_shifts`

| Column              | Type          | Constraints                     | Default       | Description                          |
| ------------------- | ------------- | ------------------------------- | ------------- | ------------------------------------ |
| `id`                | `UUID`        | PK                              | —             | —                                    |
| `receptionist_id`   | `UUID`        | FK → receptionists.id, NOT NULL | —             | —                                    |
| `shift_type`        | `VARCHAR(50)` | NOT NULL                        | —             | morning, afternoon, evening, weekend |
| `date`              | `DATE`        | NOT NULL                        | —             | —                                    |
| `start_time`        | `TIME`        | NOT NULL                        | —             | —                                    |
| `end_time`          | `TIME`        | NOT NULL                        | —             | —                                    |
| `actual_started_at` | `TIMESTAMPTZ` | NULLABLE                        | —             | —                                    |
| `actual_ended_at`   | `TIMESTAMPTZ` | NULLABLE                        | —             | —                                    |
| `status`            | `VARCHAR(50)` | NOT NULL                        | `'scheduled'` | scheduled, active, completed, missed |
| `notes`             | `TEXT`        | NULLABLE                        | —             | Hand-off notes                       |
| `created_at`        | `TIMESTAMPTZ` | NOT NULL                        | `NOW()`       | —                                    |

---

## 5. Complete API Contract

### `GET /api/receptionist/dashboard`

**Auth:** Required (receptionist role)

**Response:**

```typescript
interface ReceptionistDashboardResponse {
  receptionist: {
    id: string;
    name: string;
    station: string;
    currentShift: string | null;
    shiftStatus: string;
    isAvailable: boolean;
  };
  activeVisitors: ActiveVisitor[];
  todayAppointments: AppointmentSummary[];
  pendingTasks: PendingTask[];
  quickActions: QuickAction[];
  quickStats: {
    checkInsToday: number;
    appointmentsToday: number;
    inquiriesToday: number;
    callsAnswered: number;
    deliveriesToday: number;
  };
  upcomingDeadlines: { task: string; time: string }[];
}

interface ActiveVisitor {
  id: string;
  name: string;
  host: string;
  purpose: string;
  checkedInAt: string;
  duration: string;
}

interface AppointmentSummary {
  id: string;
  title: string;
  staffName: string;
  visitorName: string;
  time: string;
  status: string;
}

interface PendingTask {
  id: string;
  description: string;
  priority: "low" | "medium" | "high";
  link: string;
}
```

### `POST /api/receptionist/visitors/check-in`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CheckInRequest {
  visitorId?: string; // Existing visitor
  newVisitor?: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    company?: string;
    visitorType: string;
  };
  visit: {
    purpose: string;
    purposeDetail?: string;
    hostId?: string;
    hostName?: string;
    location?: string;
    badgeType?: string;
    vehicleInfo?: string;
    photoIdVerified: boolean;
    ndaSigned: boolean;
  };
}
```

**Response:**

```typescript
interface CheckInResponse {
  visitId: string;
  visitor: { id: string; name: string };
  badgeNumber: string;
  checkedInAt: string;
  hostNotified: boolean;
}
```

### `POST /api/receptionist/visitors/check-out`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CheckOutRequest {
  visitId: string;
  badgeReturned: boolean;
  feedback?: string;
}
```

**Response:** `{ visit: { id, checkedOutAt, durationMinutes } }`

### `GET /api/receptionist/visitors/active`

**Auth:** Required (receptionist)

**Response:**

```typescript
interface ActiveVisitorsResponse {
  visitors: ActiveVisitorDetail[];
}

interface ActiveVisitorDetail {
  visitId: string;
  visitorId: string;
  name: string;
  visitorType: string;
  hostName: string;
  purpose: string;
  location: string;
  checkedInAt: string;
  durationMinutes: number;
  badgeId: string;
}
```

### `GET /api/receptionist/visitors/search`

**Auth:** Required (receptionist)

**Query:** `q: string`

**Response:**

```typescript
interface VisitorSearchResponse {
  visitors: VisitorSummary[];
}

interface VisitorSummary {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  visitorType: string;
  totalVisits: number;
  lastVisitAt: string | null;
}
```

### `GET /api/receptionist/appointments`

**Auth:** Required (receptionist)

**Query:** `date?: string`, `staffId?: string`, `status?: string`

**Response:**

```typescript
interface AppointmentsResponse {
  appointments: AppointmentDetail[];
  stats: {
    total: number;
    completed: number;
    noShow: number;
    open: number;
  };
}

interface AppointmentDetail {
  id: string;
  title: string;
  type: string;
  staffId: string;
  staffName: string;
  visitorId: string | null;
  visitorName: string;
  visitorEmail: string | null;
  visitorPhone: string | null;
  visitorCount: number;
  scheduledAt: string;
  durationMinutes: number;
  room: string | null;
  status: string;
  notes: string | null;
}
```

### `POST /api/receptionist/appointments`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CreateAppointmentRequest {
  title: string;
  type: string;
  staffId: string;
  visitorId?: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  visitorCount?: number;
  scheduledAt: string;
  durationMinutes?: number;
  room?: string;
  notes?: string;
  sendConfirmation?: { email?: boolean; sms?: boolean };
}
```

### `PUT /api/receptionist/appointments/:id`

**Auth:** Required (receptionist)

**Request:** Partial update of appointment

### `POST /api/receptionist/appointments/:id/confirm`

**Auth:** Required (receptionist)

### `POST /api/receptionist/appointments/:id/cancel`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CancelAppointmentRequest {
  reason: string;
  notifyVisitor?: boolean;
}
```

### `GET /api/receptionist/inquiries`

**Auth:** Required (receptionist)

**Query:** `status?: string`, `category?: string`, `period?: 'today' | 'week' | 'month'`

**Response:**

```typescript
interface InquiriesResponse {
  inquiries: InquiryDetail[];
}

interface InquiryDetail {
  id: string;
  personName: string;
  contact: string | null;
  personType: string;
  category: string;
  description: string;
  actionTaken: string | null;
  resolution: string;
  routedTo: string | null;
  status: string;
  followUpDate: string | null;
  notedBy: string;
  createdAt: string;
}
```

### `POST /api/receptionist/inquiries`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CreateInquiryRequest {
  personName: string;
  contact?: string;
  personType: string;
  category: string;
  description: string;
  actionTaken?: string;
  resolution?: string;
  routedTo?: string;
  followUpDate?: string;
  notes?: string;
}
```

### `GET /api/receptionist/phone-log`

**Auth:** Required (receptionist)

**Query:** `period?: 'today' | 'week'`, `callbackStatus?: string`

**Response:**

```typescript
interface PhoneLogResponse {
  calls: PhoneLogEntry[];
  missedCallCount: number;
  totalToday: number;
}

interface PhoneLogEntry {
  id: string;
  direction: string;
  callerName: string | null;
  callerNumber: string | null;
  departmentRequested: string | null;
  calledFor: string | null;
  actionTaken: string;
  transferredTo: string | null;
  transferConnected: boolean | null;
  message: string | null;
  callbackStatus: string;
  loggedByName: string;
  createdAt: string;
}
```

### `POST /api/receptionist/phone-log`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CreatePhoneLogRequest {
  direction: "incoming" | "outgoing";
  callerName?: string;
  callerNumber?: string;
  departmentRequested?: string;
  calledFor?: string;
  actionTaken: "transferred" | "took_message" | "voicemail" | "callback_requested";
  transferredTo?: string;
  transferConnected?: boolean;
  message?: string;
}
```

### `POST /api/receptionist/phone-log/:id/callback-complete`

**Auth:** Required (receptionist)

### `GET /api/receptionist/deliveries`

**Auth:** Required (receptionist)

**Query:** `status?: string`, `period?: 'today' | 'week'`

**Response:**

```typescript
interface DeliveriesResponse {
  deliveries: DeliveryDetail[];
}

interface DeliveryDetail {
  id: string;
  courier: string;
  trackingNumber: string | null;
  recipientName: string;
  recipientEmail: string | null;
  deliveryType: string;
  weightKg: number | null;
  location: string;
  status: string;
  notifiedAt: string | null;
  claimedAt: string | null;
  notes: string | null;
  createdAt: string;
}
```

### `POST /api/receptionist/deliveries`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface CreateDeliveryRequest {
  courier: string;
  trackingNumber?: string;
  recipientId?: string;
  recipientName: string;
  deliveryType: string;
  weightKg?: number;
  location: string;
  storageLocation?: string;
  notes?: string;
  notifyRecipient?: boolean;
  notificationMethod?: "email" | "sms" | "both";
}
```

### `POST /api/receptionist/deliveries/:id/claim`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface ClaimDeliveryRequest {
  claimedBy: string; // user ID
  signature?: string; // digital signature
}
```

### `GET /api/receptionist/directory`

**Auth:** Required (receptionist)

**Query:** `q?: string`, `department?: string`, `type?: string`

**Response:**

```typescript
interface DirectoryResponse {
  staff: StaffDirectoryEntry[];
  quickDial: QuickDialEntry[];
}

interface StaffDirectoryEntry {
  id: string;
  name: string;
  title: string;
  department: string | null;
  room: string | null;
  phoneExtension: string | null;
  email: string;
  avatarUrl: string | null;
  isAvailable: boolean;
}

interface QuickDialEntry {
  label: string;
  extension: string;
  isEmergency: boolean;
}
```

### `GET /api/receptionist/tasks`

**Auth:** Required (receptionist)

### `PUT /api/receptionist/tasks/:id`

**Auth:** Required (receptionist)

**Request:** `{ completed: boolean }`

### `POST /api/receptionist/shift/start`

**Auth:** Required (receptionist)

**Response:** `{ shift: { id, startedAt, expectedEnd } }`

### `POST /api/receptionist/shift/end`

**Auth:** Required (receptionist)

**Request:**

```typescript
interface EndShiftRequest {
  notes?: string;
  tasksComplete: boolean;
}
```

---

## 6. Component Tree

```
ReceptionistLayout
├── ReceptionistNavBar
│   ├── Logo
│   ├── ShiftIndicator (shift type, time remaining, active badge)
│   ├── NavLinks (Dashboard, Check-In, Check-Out, Appointments, Inquiries, Phone, Deliveries, Directory)
│   ├── TaskBadge (pending count)
│   └── UserMenu (Shift, Settings, Help, Logout)
│
├── FrontDeskHub (Dashboard)
│   ├── ShiftBanner (status, start/end time, quick start/end buttons)
│   ├── ActiveVisitorsWidget
│   │   └── ActiveVisitorCard[] (name, host, time in, purpose, check-out button)
│   ├── TodayScheduleWidget
│   │   ├── ScheduleTimeline (time slots with appointment bars)
│   │   └── AppointmentCard[] (time, staff, visitor, status, actions)
│   ├── QuickActionsGrid
│   │   ├── QuickActionCard("Check In", icon, link)
│   │   ├── QuickActionCard("Check Out", icon, link)
│   │   ├── QuickActionCard("New Appointment", icon, link)
│   │   ├── QuickActionCard("Log Inquiry", icon, link)
│   │   ├── QuickActionCard("Log Call", icon, link)
│   │   └── QuickActionCard("Log Delivery", icon, link)
│   ├── QuickStatsRow (check-ins, appts, inquiries, calls, deliveries)
│   └── PendingTasksWidget
│       └── TaskItem[] (icon, description, priority, complete action)
│
├── VisitorCheckInPage
│   ├── StepIndicator (Search → Details → Print)
│   ├── VisitorSearchSection
│   │   ├── SearchInput (auto-suggest dropdown)
│   │   ├── RecentVisitorsList
│   │   │   └── RecentVisitorRow[] (name, type, last visit, check-in button)
│   │   └── NewVisitorButton
│   ├── CheckInForm
│   │   ├── VisitorInfoDisplay (name, type, photo)
│   │   ├── PurposeSelect
│   │   ├── HostSelect (searchable dropdown)
│   │   ├── LocationSelect
│   │   ├── VehicleInfoInput
│   │   ├── PhotoIDToggle, NDAToggle
│   │   ├── BadgeTypeSelect
│   │   └── CheckInButton
│   ├── NewVisitorModal
│   │   ├── NameFields, Email, Phone, Company, Type
│   │   └── CreateButton
│   └── BadgePrintSection
│       ├── PrintProgressBar
│       ├── PrintButton, EmailButton
│       └── CompleteButton
│
├── VisitorCheckOutPage
│   ├── ActiveVisitorTable (name, time in, host, purpose, check-out button)
│   ├── CheckOutPanel (slide-over)
│   │   ├── VisitSummary (checked in, host, purpose, duration)
│   │   ├── BadgeReturnToggle
│   │   ├── FeedbackInput
│   │   └── ConfirmButton
│   └── SearchInput (filter active visitors)
│
├── AppointmentSchedulerPage
│   ├── ViewToggle (Day/Week/Month), DateNavigator
│   ├── FilterBar (staff, room, type)
│   ├── CalendarView (time grid with appointment blocks)
│   │   └── AppointmentBlock[] (title, staff, visitor, status color, actions on click)
│   ├── AppointmentDetailPanel (click to open)
│   │   ├── AppointmentInfo
│   │   ├── StatusActions (confirm, check-in, complete, cancel)
│   │   └── EditButton, RescheduleButton
│   ├── NewAppointmentModal
│   │   ├── TitleInput, TypeSelect
│   │   ├── StaffSelect
│   │   ├── VisitorSection (search existing or new)
│   │   ├── DateTimePicker, DurationSelect
│   │   ├── RoomSelect
│   │   ├── NotesInput
│   │   ├── NotificationToggles (email, sms)
│   │   └── CreateButton
│   └── StatsFooter (total, completed, no-show, open)
│
├── InquiryLogPage
│   ├── PeriodTabs (Today, Week, Month, All)
│   ├── SearchInput
│   ├── InquiryTable (time, person, category, staff, status, actions)
│   ├── NewInquiryModal
│   │   ├── PersonNameInput, ContactInput
│   │   ├── PersonTypeSelect
│   │   ├── CategorySelect
│   │   ├── DescriptionTextArea
│   │   ├── ActionTakenInput
│   │   ├── ResolutionSelect (resolve, route, ticket, follow-up)
│   │   ├── ConditionalFields (routedTo, ticketId, followUpDate)
│   │   └── LogButton
│   └── QuickCategoryButtons (common categories)
│
├── PhoneLogPage
│   ├── MissedCallsSection
│   │   └── MissedCallCard[] (time, caller, number, called, callback status, actions)
│   ├── TodayCallsTable
│   │   └── CallRow[] (time, direction, caller, dept, status, details)
│   ├── NewCallLogModal
│   │   ├── DirectionToggle (incoming/outgoing)
│   │   ├── CallerNameInput, NumberInput
│   │   ├── DepartmentSelect
│   │   ├── CalledForInput
│   │   ├── ActionTakenSelect
│   │   ├── ConditionalFields (transfer info, message)
│   │   └── LogButton
│   └── CallbackSection (pending callbacks list)
│
├── DeliveryLogPage
│   ├── UnclaimedSection
│   │   └── DeliveryCard[] (time, courier, recipient, type, location, status, claim action)
│   ├── TodayDeliveriesTable
│   │   └── DeliveryRow[] (time, courier, recipient, type, claimed, actions)
│   ├── NewDeliveryModal
│   │   ├── CourierSelect
│   │   ├── TrackingInput
│   │   ├── RecipientSearch (auto-suggest from staff directory)
│   │   ├── TypeSelect
│   │   ├── LocationSelect
│   │   ├── WeightInput
│   │   ├── NotesInput
│   │   ├── NotifyToggle
│   │   └── LogButton
│   └── ClaimDeliveryModal (confirm recipient, signature)
│
├── StaffDirectoryPage
│   ├── SearchInput, AZFilter, DepartmentFilter, LocationFilter
│   ├── DirectoryTable (name, title, department, room, extension, email)
│   ├── StaffDetailPanel (click row)
│   │   ├── ContactInfo
│   │   ├── Schedule (if available)
│   │   ├── QuickCallButton, QuickEmailButton
│   │   └── AddToQuickDialButton
│   └── QuickDialSection
│       └── QuickDialItem[] (label, extension, call button, emergency badge)
│
└── ShiftTaskPage
    ├── CurrentShiftCard (type, status, started at, time remaining)
    ├── DailyChecklist (task items with checkboxes)
    ├── ShiftNotesEditor
    ├── HandoffSummary (auto-generated for next shift)
    ├── ShiftSchedule (upcoming shifts view)
    └── EndShiftButton
```

---

## 7. Exhaustive User Journeys

### Journey 7.1: Visitor Check-In Process

```
Step 1: Visitor arrives at front desk.
  → Receptionist opens /receptionist/check-in
  → Types visitor name in search: "Alex Johnson"
  → System finds recent visitor: Alex Johnson (Student, last visit Oct 28)

Step 2: Selects Alex → pre-fills info
  → Purpose: "Meeting"
  → Host: "Prof. Smith" (searchable dropdown)
  → Location: "Room 204"
  → Photo ID Verified: Yes (checked)
  → Badge Type: "Temporary" (expires 5:00 PM)

Step 3: Clicks "Check In"
  → POST /api/receptionist/visitors/check-in
  → Host notified: "Alex Johnson has arrived for your 10:15 meeting"
  → Badge prints automatically (thermal printer)

Step 4: Hands visitor their badge
  → "Welcome, Alex! Prof. Smith is in Room 204. Please wear your badge at all times."
  → Clicks "Mark as Complete"

Alternative:
  Step 1a: New visitor → "New Visitor" → fills name, email, phone, type
  Step 2a: Host not in system → type host name manually
  Step 3a: Printer error → "Print badge manually?" → use temporary handwritten badge
  Step 3b: NDA required → visitor signs digital NDA on tablet before check-in
```

### Journey 7.2: Scheduling a Walk-In Appointment

```
Step 1: Visitor walks in without appointment: "I'd like to speak with someone about admissions."

Step 2: Receptionist opens /receptionist/appointments → "New Appointment"
  → Type: "Meeting"
  → Staff: Searches for admissions staff → "Dr. Jones"
  → Visitor: Searches → not found → enters name: "Mike Brown", phone: "555-0199"

Step 3: Checks Dr. Jones's availability
  → Calendar shows: 11:00 AM available (30 min slot)
  → Selects time

Step 4: Sends confirmation
  → Toggles: Email confirmation (Mike has email) + SMS reminder
  → Clicks "Create"

Step 5: Appointment created
  → Dr. Jones notified: "New appointment: Mike Brown at 11:00 AM"
  → Mike gets SMS: "Your appointment with Dr. Jones is confirmed for 11:00 AM in Room 206."
  → Status: "Confirmed"

Alternative:
  Step 1a: Urgent matter → checks if staff member is available immediately
  Step 3a: No availability → suggests alternative time or different staff
  Step 3b: Double-booking guard → system prevents, suggests next available
```

### Journey 7.3: Visitor Check-Out

```
Step 1: Visitor returns to front desk to check out.
  → Receptionist opens /receptionist/check-out
  → Sees Alex in "Currently On Site" list

Step 2: Clicks "Check Out" on Alex's row
  → Panel opens showing visit summary:
    - Checked in: 10:15 AM
    - Duration: 1h 15m
    - Host: Prof. Smith
  → Verification: Badge returned? → Yes

Step 3: Clicks "Confirm Check-Out"
  → POST /api/receptionist/visitors/check-out
  → Visit marked as completed
  → Duration computed automatically
  → Alex removed from active list

Alternative:
  Step 2a: Badge not returned → mark as lost → flag in system
  Step 2b: Visitor feedback → "Great visit!" logged
  Step 3a: Multiple visitors in group → batch check-out
```

### Journey 7.4: Logging a Phone Call

```
Step 1: Phone rings → receptionist answers:
  "Cyber Elias Academy, how can I help you?"

Step 2: Caller: "Hi, I'd like to speak with Prof. Smith about the Network Defense course."

Step 3: Receptionist checks directory → Prof. Smith available (extension x1234)
  → Transfers call → selects "Transferred" in call log
  → Transfer connects? → Yes

Step 4: After call, opens /receptionist/phone-log → "New Log"
  → Direction: Incoming
  → Caller: "Sarah Chen"
  → Number: "555-0147"
  → Called For: "Prof. Smith"
  → Action: "Transferred" → Transferred To: "Prof. Smith (x1234)" → Connected: Yes
  → Clicks "Log Call"

Alternative:
  Step 3a: Staff not available → takes message → "Took Message"
    → Records: "Sarah Chen called about Network Defense course scheduling"
  Step 3b: Voicemail → "Voicemail left"
  Step 3c: Callback requested → "Callback requested" → appears in pending callbacks
```

### Journey 7.5: Logging a Delivery

```
Step 1: UPS driver arrives with package.
  → Receptionist opens /receptionist/deliveries → "New Delivery"

Step 2: Logs delivery:
  → Courier: "UPS"
  → Tracking: "1Z999AA10123456784"
  → Recipient: Searches "Prof. Smith" → found
  → Type: "Package"
  → Location: "Front Desk Bin A"

Step 3: Notify recipient: ✅ Email
  → Clicks "Log Delivery"
  → Prof. Smith receives: "You have a package at the front desk (Bin A). UPS tracking: 1Z999..."

Step 4: Package placed in Bin A with label.

Step 5: Later, Prof. Smith arrives to claim:
  → Receptionist finds delivery in unclaimed list
  → Clicks "Claim" → confirms recipient ID
  → Status: "Claimed" at 2:30 PM

Alternative:
  Step 2a: Recipient not in system → manually type name
  Step 3a: Urgent delivery → also call recipient
  Step 5a: Package unclaimed for 7 days → marked as "Returned"
  Step 5b: Food delivery → immediate notification, storage in kitchen area
```

### Journey 7.6: Handling a Walk-In Inquiry

```
Step 1: Visitor approaches front desk:
  "I'm having trouble logging into the student portal."

Step 2: Receptionist opens /receptionist/inquiries → "New Inquiry"
  → Person: "Mike Brown"
  → Type: "Student"
  → Category: "IT Support"
  → Description: "Unable to log into student portal. Password reset not working."
  → Resolution: Creates ticket → "Create Ticket"
  → Ticket system opens → ticket #IT-421 created
  → Notes: "Student is on site, waiting for assistance"

Step 3: Clicks "Log Inquiry"
  → Inquiry saved with status "Open"
  → IT team notified: "New walk-in support ticket #IT-421 — Mike Brown"

Step 4: Receptionist tells Mike: "IT support has been notified. They'll be with you shortly."

Alternative:
  Step 2a: Simple question resolved on site → "Resolved on Site"
    → Action taken: "Explained portal URL and reset process"
    → Status: "Closed"
  Step 2b: Needs department follow-up → "Route to Department"
    → Routed to: "Admissions"
    → Follow-up date: "Nov 5"
```

### Journey 7.7: Shift Hand-Off

```
Step 1: 15 minutes before shift end → banner appears:
  "Shift ending at 3:00 PM. Complete checklist."

Step 2: Receptionist completes closing tasks:
  ✅ Verify all visitors checked out
  ✅ Secure visitor badges
  ✅ Log any remaining deliveries
  ✅ Clean front desk area

Step 3: Opens shift notes
  → "Morning was busy. 28 check-ins. 1 outstanding callback for Dean office
    (caller: John Smith, 555-0123). 1 unclaimed delivery for Prof. Lee (FedEx)."

Step 4: Clicks "End Shift"
  → POST /api/receptionist/shift/end
  → Afternoon receptionist notified: "Morning shift ended. Hand-off notes available."
  → Shift marked as "Completed"

Alternative:
  Step 1a: Overdue tasks → "You have 3 incomplete tasks!" → cannot end until complete
  Step 4a: No replacement covering → system alerts supervisor
```

---

## 8. Business Rules Engine

### BR-RE-001: Visitor Check-In Requirements

- All visitors must present valid government-issued photo ID
- Minors (<18) must be accompanied by an adult or have prior authorization
- Blacklisted visitors are flagged immediately; cannot check in
- Visitors with active protection orders → private alert to security
- Badge must be worn visibly at all times while on campus
- Badges auto-expire at end of business day (configurable per visitor type)

### BR-RE-002: Appointment Scheduling Rules

- Appointments cannot be scheduled less than 15 minutes in advance for same day
- Double-booking prevention: one staff member, one time slot
- Max 2-hour appointment duration for standard appointments
- Tours limited to 1 hour, max 10 people
- No-show auto-marked after 15 minutes past start time
- Cancellation allows immediate slot release

### BR-RE-003: Phone Handling

- Calls must be answered within 3 rings
- Call transfer timeout: 30 seconds; if unanswered, return to receptionist
- Voicemail checked within 1 hour of missed call
- Callback must be completed within 30 minutes of request
- Emergency calls (security, fire, medical) immediately transferred to security

### BR-RE-004: Delivery Management

- Deliveries logged within 5 minutes of receipt
- Recipients notified within 10 minutes of logging
- Deliveries unclaimed after 7 days → returned to sender
- Food deliveries must be refrigerated if perishable and notified within 5 min
- High-value packages (>$1,000) require signature upon delivery and claim
- Hazardous materials → security notification, special handling

### BR-RE-005: Inquiry Resolution SLAs

- Simple inquiries resolved on site: immediate
- Department routing: acknowledged within 2 hours
- Support ticket creation: response within 30 minutes
- Follow-up inquiries: action within 48 hours
- Complaint escalation: supervisor notified within 1 hour

### BR-RE-006: Shift & Task Compliance

- Shift opening checklist must be completed within 15 minutes of start
- Shift closing checklist must be completed before end
- Incomplete checklists flag supervisor
- Break coverage: receptionist cannot leave desk until replacement arrives
- Max shift duration: 8 hours with 30-min lunch + two 15-min breaks

### BR-RE-007: Data Privacy

- Visitor information not shared outside front desk without consent
- Staff contact info (personal) not displayed in public directory
- Emergency contact info released only to authorized personnel
- Visitor logs retained for 90 days, then anonymized
- NDA documents stored securely

### BR-RE-008: Emergency Procedures

- Fire alarm → receptionist directs visitors to exits, grabs visitor log
- Security incident → lockdown button, immediate security notification
- Medical emergency → call 911, direct EMTs to location, hold visitor list
- Evacuation → account for all visitors using check-in log

---

## 9. Notification Specifications

### N-RE-01: Host Notified of Visitor Arrival

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| **Trigger**   | Visitor checked in                                                  |
| **Channel**   | In-app + Push + Email (if away)                                     |
| **Template**  | `visitor_arrived`                                                   |
| **Variables** | `{{visitorName}}`, `{{purpose}}`, `{{location}}`, `{{checkedInAt}}` |
| **Frequency** | Per check-in                                                        |

### N-RE-02: Appointment Reminder

| Field         | Value                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| **Trigger**   | 24 hours and 1 hour before appointment                                 |
| **Channel**   | Email (24h) + SMS (1h, if opted)                                       |
| **Template**  | `appointment_reminder`                                                 |
| **Variables** | `{{visitorName}}`, `{{staffName}}`, `{{date}}`, `{{time}}`, `{{room}}` |

### N-RE-03: Delivery Notification

| Field         | Value                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------- |
| **Trigger**   | Delivery logged                                                                                |
| **Channel**   | Email + SMS (if urgent)                                                                        |
| **Template**  | `delivery_received`                                                                            |
| **Variables** | `{{recipientName}}`, `{{courier}}`, `{{type}}`, `{{location}}`, `{{tracking}}`, `{{loggedAt}}` |

### N-RE-04: Callback Reminder

| Field         | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Trigger**   | Callback pending > 30 minutes                              |
| **Channel**   | In-app (persistent banner) + Push                          |
| **Template**  | `callback_pending`                                         |
| **Variables** | `{{callerName}}`, `{{number}}`, `{{duration}}`, `{{link}}` |

### N-RE-05: Shift Reminder

| Field         | Value                                                 |
| ------------- | ----------------------------------------------------- |
| **Trigger**   | 15 minutes before shift end                           |
| **Channel**   | In-app banner                                         |
| **Template**  | `shift_ending`                                        |
| **Variables** | `{{shiftType}}`, `{{endTime}}`, `{{incompleteTasks}}` |

### N-RE-06: Visitor Check-Out Overdue

| Field         | Value                                                |
| ------------- | ---------------------------------------------------- |
| **Trigger**   | Visitor on site > 4 hours                            |
| **Channel**   | In-app (receptionist)                                |
| **Template**  | `visitor_overdue`                                    |
| **Variables** | `{{visitorName}}`, `{{checkedInAt}}`, `{{hostName}}` |

### N-RE-07: Blacklisted Visitor Alert

| Field         | Value                                            |
| ------------- | ------------------------------------------------ |
| **Trigger**   | Blacklisted visitor attempts check-in            |
| **Channel**   | In-app (receptionist) + Security push            |
| **Template**  | `blacklisted_visitor`                            |
| **Variables** | `{{visitorName}}`, `{{lastVisit}}`, `{{reason}}` |

### N-RE-08: Appointment No-Show

| Field         | Value                                             |
| ------------- | ------------------------------------------------- |
| **Trigger**   | Appointment not checked in within 15 min of start |
| **Channel**   | In-app (receptionist + staff)                     |
| **Template**  | `appointment_no_show`                             |
| **Variables** | `{{visitorName}}`, `{{staffName}}`, `{{time}}`    |

---

## 10. Permission Matrix

| Entity          | Action        | Receptionist | Staff    | Admin | Security |
| --------------- | ------------- | ------------ | -------- | ----- | -------- |
| Visitors        | Create        | ✅           | ❌       | ✅    | ✅       |
| Visitors        | Search        | ✅           | ❌       | ✅    | ✅       |
| Visitors        | Read          | ✅           | ❌       | ✅    | ✅       |
| Visitors        | Update        | ✅           | ❌       | ✅    | ✅       |
| Visitors        | Blacklist     | ❌           | ❌       | ✅    | ✅       |
| Visits          | Check In      | ✅           | ❌       | ✅    | ✅       |
| Visits          | Check Out     | ✅           | ❌       | ✅    | ✅       |
| Visits          | View Active   | ✅           | ❌       | ✅    | ✅       |
| Visits          | View History  | ✅           | ❌       | ✅    | ✅       |
| Appointments    | Read          | ✅           | ✅ (own) | ✅    | ❌       |
| Appointments    | Create        | ✅           | ✅ (own) | ✅    | ❌       |
| Appointments    | Update        | ✅           | ✅ (own) | ✅    | ❌       |
| Appointments    | Cancel        | ✅           | ✅ (own) | ✅    | ❌       |
| Inquiries       | Create        | ✅           | ✅       | ✅    | ❌       |
| Inquiries       | Read          | ✅           | ✅ (own) | ✅    | ❌       |
| Inquiries       | Close         | ✅           | ❌       | ✅    | ❌       |
| Phone Log       | CRUD          | ✅           | ❌       | ✅    | ❌       |
| Deliveries      | Create        | ✅           | ❌       | ✅    | ❌       |
| Deliveries      | Read          | ✅           | ✅ (own) | ✅    | ❌       |
| Deliveries      | Claim         | ✅           | ✅ (own) | ✅    | ❌       |
| Directory       | Read          | ✅           | ✅       | ✅    | ✅       |
| Tasks           | View/Complete | ✅           | ❌       | ✅    | ❌       |
| Shifts          | View own      | ✅           | ❌       | ✅    | ❌       |
| Shift           | Start/End     | ✅           | ❌       | ✅    | ❌       |
| Branch Settings | Read          | ❌           | ❌       | ✅    | ❌       |

---

## 11. State Management

### Redux Slice

```typescript
interface ReceptionistState {
  currentShift: {
    id: string | null;
    type: string | null;
    status: string;
    startedAt: string | null;
    timeRemaining: number | null;
  };
  dashboard: {
    data: ReceptionistDashboardResponse | null;
    loading: boolean;
  };
  checkIn: {
    searchResults: VisitorSummary[];
    selectedVisitor: VisitorSummary | null;
    badging: { printing: boolean; printed: boolean };
    submitting: boolean;
  };
  appointments: {
    list: AppointmentDetail[];
    selectedDate: string;
    loading: boolean;
    creating: boolean;
  };
  inquiries: {
    list: InquiryDetail[];
    loading: boolean;
  };
  phoneLog: {
    calls: PhoneLogEntry[];
    missedCount: number;
    loading: boolean;
  };
  deliveries: {
    list: DeliveryDetail[];
    loading: boolean;
  };
  directory: {
    staff: StaffDirectoryEntry[];
    quickDial: QuickDialEntry[];
    loading: boolean;
  };
  tasks: {
    items: { id: string; name: string; completed: boolean }[];
    loading: boolean;
  };
}
```

### RTK Query Endpoints

```typescript
const receptionistApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/receptionist" }),
  tagTypes: [
    "Dashboard",
    "Visitors",
    "ActiveVisitors",
    "Appointments",
    "Inquiries",
    "PhoneLog",
    "Deliveries",
    "Directory",
    "Tasks",
    "Shift",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query<ReceptionistDashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
      pollingInterval: 15000,
    }),
    searchVisitors: builder.query<VisitorSearchResponse, string>({
      query: (q) => `/visitors/search?q=${encodeURIComponent(q)}`,
      providesTags: ["Visitors"],
    }),
    checkIn: builder.mutation<CheckInResponse, CheckInRequest>({
      query: (body) => ({ url: "/visitors/check-in", method: "POST", body }),
      invalidatesTags: ["Dashboard", "ActiveVisitors", "Visitors"],
    }),
    checkOut: builder.mutation<void, CheckOutRequest>({
      query: (body) => ({ url: "/visitors/check-out", method: "POST", body }),
      invalidatesTags: ["Dashboard", "ActiveVisitors"],
    }),
    getActiveVisitors: builder.query<ActiveVisitorsResponse, void>({
      query: () => "/visitors/active",
      providesTags: ["ActiveVisitors"],
      pollingInterval: 30000,
    }),
    getAppointments: builder.query<AppointmentsResponse, string | void>({
      query: (params) => ({ url: "/appointments", params: params ? { date: params } : {} }),
      providesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation<AppointmentDetail, CreateAppointmentRequest>({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
      invalidatesTags: ["Appointments", "Dashboard"],
    }),
    updateAppointment: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/appointments/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Appointments"],
    }),
    confirmAppointment: builder.mutation<void, string>({
      query: (id) => ({ url: `/appointments/${id}/confirm`, method: "POST" }),
      invalidatesTags: ["Appointments"],
    }),
    cancelAppointment: builder.mutation<void, { id: string; data: CancelAppointmentRequest }>({
      query: ({ id, data }) => ({ url: `/appointments/${id}/cancel`, method: "POST", body: data }),
      invalidatesTags: ["Appointments"],
    }),
    getInquiries: builder.query<InquiriesResponse, string | void>({
      query: (params) => ({ url: "/inquiries", params: params ? { period: params } : {} }),
      providesTags: ["Inquiries"],
    }),
    createInquiry: builder.mutation<void, CreateInquiryRequest>({
      query: (body) => ({ url: "/inquiries", method: "POST", body }),
      invalidatesTags: ["Inquiries", "Dashboard"],
    }),
    getPhoneLog: builder.query<PhoneLogResponse, string | void>({
      query: (params) => ({ url: "/phone-log", params: params ? { period: params } : {} }),
      providesTags: ["PhoneLog"],
    }),
    createPhoneLog: builder.mutation<void, CreatePhoneLogRequest>({
      query: (body) => ({ url: "/phone-log", method: "POST", body }),
      invalidatesTags: ["PhoneLog", "Dashboard"],
    }),
    completeCallback: builder.mutation<void, string>({
      query: (id) => ({ url: `/phone-log/${id}/callback-complete`, method: "POST" }),
      invalidatesTags: ["PhoneLog"],
    }),
    getDeliveries: builder.query<DeliveriesResponse, string | void>({
      query: (params) => ({ url: "/deliveries", params: params ? { status: params } : {} }),
      providesTags: ["Deliveries"],
    }),
    createDelivery: builder.mutation<void, CreateDeliveryRequest>({
      query: (body) => ({ url: "/deliveries", method: "POST", body }),
      invalidatesTags: ["Deliveries", "Dashboard"],
    }),
    claimDelivery: builder.mutation<void, { id: string; data: ClaimDeliveryRequest }>({
      query: ({ id, data }) => ({ url: `/deliveries/${id}/claim`, method: "POST", body: data }),
      invalidatesTags: ["Deliveries"],
    }),
    getDirectory: builder.query<DirectoryResponse, string | void>({
      query: (params) => ({ url: "/directory", params: params ? { q: params } : {} }),
      providesTags: ["Directory"],
    }),
    getTasks: builder.query<{ tasks: any[] }, void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<void, { id: string; completed: boolean }>({
      query: ({ id, completed }) => ({ url: `/tasks/${id}`, method: "PUT", body: { completed } }),
      invalidatesTags: ["Tasks"],
    }),
    startShift: builder.mutation<{ shift: any }, void>({
      query: () => ({ url: "/shift/start", method: "POST" }),
      invalidatesTags: ["Shift", "Dashboard"],
    }),
    endShift: builder.mutation<void, EndShiftRequest>({
      query: (body) => ({ url: "/shift/end", method: "POST", body }),
      invalidatesTags: ["Shift", "Dashboard"],
    }),
  }),
});
```

---

## 12. Form Schemas (Zod)

### Visitor Check-In

```typescript
export const CheckInSchema = z.object({
  purpose: z.enum(["meeting", "appointment", "tour", "interview", "delivery", "other"]),
  purposeDetail: z.string().max(500).optional(),
  hostId: z.string().uuid().optional(),
  hostName: z.string().min(1).optional(),
  location: z.string().max(200).optional(),
  badgeType: z.enum(["temporary", "permanent", "day_pass"]).default("temporary"),
  vehicleInfo: z.string().max(200).optional(),
  photoIdVerified: z.boolean(),
  ndaSigned: z.boolean().default(false),
});

export const NewVisitorSchema = z.object({
  firstName: z.string().min(1, "First name required").max(100),
  lastName: z.string().min(1, "Last name required").max(100),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?1?\d{10,15}$/, "Invalid phone")
    .optional()
    .or(z.literal("")),
  company: z.string().max(200).optional(),
  visitorType: z.enum([
    "student",
    "parent",
    "mentor",
    "vendor",
    "guest",
    "staff",
    "interviewee",
    "tour_group",
  ]),
});
```

### Appointment

```typescript
export const AppointmentSchema = z
  .object({
    title: z.string().min(1, "Title required").max(255),
    type: z.enum(["meeting", "tour", "interview", "advising", "mentoring", "other"]),
    staffId: z.string().uuid("Select staff member"),
    visitorId: z.string().uuid().optional(),
    visitorName: z.string().min(1, "Visitor name required").max(255).optional(),
    visitorEmail: z.string().email().optional().or(z.literal("")),
    visitorPhone: z.string().optional(),
    visitorCount: z.number().int().min(1).max(50).default(1),
    scheduledAt: z.string().datetime("Invalid date/time"),
    durationMinutes: z.number().int().min(15).max(120).default(30),
    room: z.string().max(200).optional(),
    notes: z.string().max(2000).optional(),
    sendConfirmation: z
      .object({
        email: z.boolean().default(false),
        sms: z.boolean().default(false),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.visitorId && !data.visitorName) {
        return false;
      }
      return true;
    },
    { message: "Visitor must be selected or entered", path: ["visitorName"] },
  );
```

### Inquiry

```typescript
export const InquirySchema = z.object({
  personName: z.string().min(1, "Name required").max(255),
  contact: z.string().max(255).optional().or(z.literal("")),
  personType: z.enum(["student", "parent", "visitor", "caller", "vendor", "other"]),
  category: z.enum([
    "academics",
    "admissions",
    "career",
    "finance",
    "it_support",
    "admin",
    "facilities",
    "other",
  ]),
  description: z.string().min(5, "Description required").max(5000),
  actionTaken: z.string().max(2000).optional(),
  resolution: z
    .enum(["resolved_on_site", "routed", "ticket_created", "follow_up_scheduled"])
    .default("resolved_on_site"),
  routedTo: z.string().max(255).optional(),
  followUpDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});
```

### Phone Call Log

```typescript
export const PhoneLogSchema = z.object({
  direction: z.enum(["incoming", "outgoing"]),
  callerName: z.string().max(255).optional(),
  callerNumber: z.string().max(50).optional(),
  departmentRequested: z.string().max(100).optional(),
  calledFor: z.string().max(255).optional(),
  actionTaken: z.enum(["transferred", "took_message", "voicemail", "callback_requested"]),
  transferredTo: z.string().max(255).optional(),
  transferConnected: z.boolean().optional(),
  message: z.string().max(5000).optional(),
});
```

### Delivery

```typescript
export const DeliverySchema = z.object({
  courier: z.enum(["UPS", "FedEx", "USPS", "Amazon", "DoorDash", "DHL", "Other"]),
  trackingNumber: z.string().max(255).optional(),
  recipientId: z.string().uuid().optional(),
  recipientName: z.string().min(1, "Recipient required").max(255),
  deliveryType: z.enum(["document", "package", "equipment", "mail", "food", "other"]),
  weightKg: z.number().positive().optional(),
  location: z.enum(["front_desk", "receiving_dock", "mail_room"]),
  storageLocation: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  notifyRecipient: z.boolean().default(true),
  notificationMethod: z.enum(["email", "sms", "both"]).default("email"),
});
```

---

## 13. Analytics Events

| Event                                | Properties                               | Trigger               |
| ------------------------------------ | ---------------------------------------- | --------------------- |
| `receptionist_shift_start`           | `shiftType`, `station`                   | Shift started         |
| `receptionist_shift_end`             | `shiftType`, `duration`, `tasksComplete` | Shift ended           |
| `receptionist_visitor_check_in`      | `visitorType`, `purpose`, `hasHost`      | Check-in completed    |
| `receptionist_visitor_check_out`     | `visitDuration`, `badgeReturned`         | Check-out completed   |
| `receptionist_visitor_new`           | `visitorType`                            | New visitor created   |
| `receptionist_visitor_search`        | `hadResults`, `resultCount`              | Search performed      |
| `receptionist_appointment_created`   | `type`, `staffId`, `duration`            | Appointment created   |
| `receptionist_appointment_confirmed` | `appointmentId`                          | Appointment confirmed |
| `receptionist_appointment_cancelled` | `reason`                                 | Appointment cancelled |
| `receptionist_appointment_no_show`   | `staffId`                                | No-show marked        |
| `receptionist_inquiry_logged`        | `category`, `resolution`                 | Inquiry created       |
| `receptionist_inquiry_resolved`      | `category`, `resolution`                 | Inquiry closed        |
| `receptionist_phone_call_answered`   | `actionTaken`                            | Call logged           |
| `receptionist_phone_callback`        | `status`                                 | Callback handled      |
| `receptionist_delivery_logged`       | `courier`, `type`, `notified`            | Delivery logged       |
| `receptionist_delivery_claimed`      | `type`, `daysToClaim`                    | Delivery claimed      |
| `receptionist_directory_searched`    | `hasResults`                             | Directory searched    |
| `receptionist_task_completed`        | `taskCategory`                           | Task completed        |
| `receptionist_badge_printed`         | `badgeType`                              | Badge printed         |

---

## 14. Accessibility Requirements

**Global:**

- `role="banner"` for shift header, `aria-live="polite"` for shift timer
- All tables: `<caption>`, `<th scope>`, `aria-sort` on sortable columns
- Quick actions: `role="list"`, each action is a link with accessible name
- Color-coded statuses (red=urgent, yellow=pending, green=complete) with text labels
- High contrast mode support for badge printing UI

**Key Components:**

- ActiveVisitorCard: `aria-label="Visitor: {{name}}, host: {{host}}, checked in at {{time}}"`
- CheckInSearch: `role="combobox"`, results `role="listbox"` with `aria-selected`
- CheckInForm: `aria-label="Visitor check-in form"`, each field labeled
- BadgePrintSection: `aria-live="polite"` for print status updates
- AppointmentCalendar: `role="grid"`, cells `aria-label="{{time}} - {{appointmentCount}} appointments"`
- TimeSlots: `role="row"`, each slot `aria-label="{{time}}"`
- AppointmentBlock: `aria-label="{{title}} with {{name}}, {{time}} to {{end}}"`
- NewAppointmentModal: `role="dialog"`, `aria-label="New appointment"`, focus trapped
- InquiryTable: `aria-label="Inquiry log"`, each row `aria-label="Inquiry: {{person}}, {{category}}, {{status}}"`
- PhoneLogForm: `aria-label="Log phone call"`, radio group for direction
- DeliveryCard: `aria-label="Delivery: {{courier}}, {{type}} for {{recipient}}"`
- ClaimDeliveryModal: `aria-label="Confirm delivery claim"`, signature input labeled
- DirectoryTable: `aria-label="Staff directory"`, search results announced
- ShiftChecklist: `aria-label="Daily checklist"`, each item `aria-label="{{task}}: {{status}}"`

---

## 15. Error & Edge Case Catalog

| #   | Scenario                            | User Message                                                                                | Recovery                                         |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| E1  | Dashboard fails to load             | "Unable to load front desk data. [Retry]"                                                   | Retry, show cached snapshot                      |
| E2  | Visitor check-in fails (network)    | "Check-in failed. Try again. [Retry]"                                                       | Keep form data, retry                            |
| E3  | Badge printer offline               | "Badge printer is offline. Print manually or use digital badge."                            | Manual badge option, email badge                 |
| E4  | Visitor blacklisted                 | "⚠ Security Alert: This visitor is flagged. Notify security immediately."                   | Security notified, do not check in               |
| E5  | Visitor already checked in          | "{{name}} is already checked in since {{time}}."                                            | View active visit, cannot duplicate              |
| E6  | Double-booking detected             | "{{staffName}} already has an appointment at {{time}}. [Show existing] [Pick another time]" | Suggest next available                           |
| E7  | Appointment in the past             | "Cannot schedule an appointment in the past."                                               | Reset date/time                                  |
| E8  | Staff directory not found           | "Staff member not found."                                                                   | Check spelling or search differently             |
| E9  | Delivery recipient unknown          | "Recipient not found in directory. Add manually?"                                           | Manual entry allowed                             |
| E10 | Phone transfer fails                | "Call transfer failed. Take a message instead."                                             | Switch to message mode                           |
| E11 | Callback queue overflow             | "High callback volume. Prioritize urgent callbacks first."                                  | Sort by priority, auto-reminders                 |
| E12 | Shift start failed                  | "Unable to start shift. Contact supervisor."                                                | Already active? Error details                    |
| E13 | End shift with pending tasks        | "{{count}} tasks incomplete. Complete before ending shift."                                 | Force complete or supervisor override            |
| E14 | Check-out with unreturned badge     | "Badge not returned! Confirm to mark as lost."                                              | Flag badge as lost, security notified            |
| E15 | Delivery claimed by wrong person    | "This person doesn't match the recipient record."                                           | Verify ID, contact sender if needed              |
| E16 | Inquiry escalation needed           | "This issue requires immediate supervisor attention."                                       | Flag as urgent, route to supervisor              |
| E17 | Voice message too long              | "Voicemail message exceeds character limit."                                                | Summarize or split                               |
| E18 | Large tour group arrives            | Group >10 people                                                                            | Split into smaller groups, assign multiple hosts |
| E19 | Emergency visitor (law enforcement) | "Law enforcement officer at front desk."                                                    | Immediate notification to security director      |
| E20 | System offline / kiosk mode         | "Front desk system offline. Using offline mode."                                            | Cache recent data, sync when online              |
| E21 | Visitor with special needs          | Visitor requires wheelchair access, interpreter, etc.                                       | Note in visit record, notify host                |
| E22 | Lost child on campus                | "A minor has been separated from their group."                                              | Emergency protocol, security, parent contact     |

---

_End of Receptionist Actor Plan — 07_
