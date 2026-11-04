# OS Practical Manual – Interactive Operating System Lab

A modern, interactive laboratory web application designed for Computer Engineering & Science students preparing for their **Operating System Laboratory** practical examinations and viva voce.

---

## 🚀 Features & Highlights

- **Complete Curriculum Coverage (24 Practicals across 5 Units)**:
  - **UNIT I**: Process Management & Linux System Calls (`fork`, `exit`, `exec`, `getpid`/`getppid`, `wait`).
  - **UNIT II**: CPU Process Scheduling (FCFS with Gantt Chart, Round Robin with Time Quantum, Analysis of Quantum size vs Context Switches).
  - **UNIT III**: Concurrency & Deadlocks (Reader-Writer, Producer-Consumer, Peterson's Mutual Exclusion, Dining Philosophers, Bounded Buffer, IPC Pipe, Deadlock Simulation, Banker's Algorithm Avoidance, Deadlock Detection, Starvation & Aging).
  - **UNIT IV**: Memory Management (Comparison of First Fit vs Best Fit allocation and internal fragmentation).
  - **UNIT V**: File & I/O Management (Linux shell utilities, file permissions `chmod`, text filters `grep`/`sed`/`awk`, system administration scripts, Contiguous vs Linked file allocation).

- **Every Practical Includes (11 Structured Sections)**:
  1. Practical Number & Full Title
  2. Aim
  3. Problem Statement
  4. Theory (simple second-year university concepts)
  5. Step-by-step Algorithm
  6. Flowchart (Visual decision nodes + Mermaid definition)
  7. Interactive Source Code Editor
  8. Sample Input
  9. Sample Output
  10. Detailed Code Breakdown & Key Mechanisms
  11. Result & Conclusion
  * **Bonus**: Viva Voce oral exam Q&A for every single practical!

- **Interactive Code Editor & Real Linux Execution**:
  - Editable source code for all practicals.
  - **Copy Code** & **Download Code** (`.cpp` or `.sh`) with one click.
  - **Reset Code** to restore the official laboratory template.
  - Custom input support (stdin).
  - **Live Code Execution** via remote isolated Linux container sandbox (Piston Linux API) supporting C++ (GCC) and Bash 5.2.
  - Output terminal displaying stdout, stderr, execution duration, and exit codes.
  - Dedicated **Verified Lab Output** tab (never fakes execution).

- **Modern UI & UX**:
  - Dark mode by default with Light theme toggle.
  - Fixed, scrollable left navigation sidebar with expandable/collapsible unit accordions.
  - Instant practical search & filter (All, Completed, Pending, Linux-only).
  - Progress tracking with persistent `localStorage`.
  - Responsive layout for desktop, tablet, and mobile (collapsible drawer).
  - Dashboard overview page with unit completion metrics.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti
- **Execution Sandbox**: Piston API (Remote Linux GCC & Bash)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
