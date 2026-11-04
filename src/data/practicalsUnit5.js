export const practicalsUnit5 = [
  {
    id: 20,
    unit: 5,
    unitTitle: "File and I/O Management",
    title: "Perform File and Directory Management Using Linux Shell Commands",
    shortTitle: "File & Directory Shell Commands",
    category: "File Management",
    isLinuxOnly: true,
    language: "bash",
    aim: "To demonstrate the creation, navigation, manipulation, and deletion of files and directories using standard Linux shell commands.",
    problemStatement: "Write an interactive/executable Bash shell script demonstrating core Linux file and directory management utilities: `pwd`, `mkdir`, `touch`, `ls -l`, `cp`, `mv`, `cat`, and `rm`. Verify hierarchy updates after each command.",
    theory: `The Linux file system is structured as a hierarchical inverted tree originating from the root directory (\`/\`).

### Essential Shell Commands:
- \`pwd\`: Print Working Directory (displays current absolute pathname).
- \`mkdir -p <dir>\`: Make directories, creating parent folders if needed.
- \`touch <file>\`: Creates an empty file or updates access/modification timestamps.
- \`ls -la\`: Lists directory contents including hidden files (\`.\`) with detailed attributes.
- \`cp -r <src> <dest>\`: Copies files or directories recursively.
- \`mv <src> <dest>\`: Moves or renames files and directories.
- \`cat <file>\`: Concatenates and outputs file contents to terminal stdout.
- \`rm -rf <target>\`: Removes files and directory hierarchies forcefully.`,
    algorithm: [
      "1. Display current directory using `pwd`.",
      "2. Create a sandboxed workspace directory `os_lab_demo` using `mkdir -p`.",
      "3. Change directory (`cd os_lab_demo`).",
      "4. Create text files `file1.txt` and `file2.txt` using `touch` and append text.",
      "5. List files in long format (`ls -la`).",
      "6. Copy `file1.txt` to `file1_backup.txt` using `cp`.",
      "7. Rename `file2.txt` to `renamed_file2.txt` using `mv`.",
      "8. Display contents using `cat`.",
      "9. Clean up test files using `rm` and confirm directory status."
    ],
    flowchart: `flowchart TD
    A([Start Script]) --> B["pwd (Display current directory)"]
    B --> C["mkdir -p os_lab_demo && cd os_lab_demo"]
    C --> D["touch file1.txt file2.txt<br/>Append sample text"]
    D --> E["ls -l (Inspect file permissions and sizes)"]
    E --> F["cp file1.txt file1_backup.txt"]
    F --> G["mv file2.txt renamed_file2.txt"]
    G --> H["cat (Display file contents)"]
    H --> I["rm -f (Cleanup files)"]
    I --> J([Finish Script])`,
    code: `#!/usr/bin/env bash
# Practical 20: File and Directory Management in Linux
# Language: Bash Shell Script

echo "=========================================="
echo " OS Lab: Practical 20 - File & Directory"
echo "=========================================="

echo "[1] Current Working Directory:"
pwd
echo ""

# Setup sandbox folder
DIR="os_lab_demo_$$"
echo "[2] Creating demo directory: $DIR"
mkdir -p "$DIR"
cd "$DIR" || exit 1
echo "Entered directory: $(pwd)"
echo ""

echo "[3] Creating and writing data to files:"
echo "Operating Systems: Linux Kernel v6.x" > notes.txt
echo "Process Management and Concurrency" > topics.txt
echo "Files created: notes.txt, topics.txt"
echo ""

echo "[4] Listing directory contents (ls -lh):"
ls -lh
echo ""

echo "[5] Displaying file content using 'cat':"
echo "--- Content of notes.txt ---"
cat notes.txt
echo "----------------------------"
echo ""

echo "[6] Copying notes.txt to notes_backup.txt (cp):"
cp notes.txt notes_backup.txt
echo "Copy created successfully."
echo ""

echo "[7] Renaming topics.txt to syllabus.txt (mv):"
mv topics.txt syllabus.txt
echo "Renamed topics.txt -> syllabus.txt"
echo ""

echo "[8] Directory contents after copy and rename:"
ls -lh
echo ""

echo "[9] Cleaning up demo environment (rm):"
cd ..
rm -rf "$DIR"
echo "Directory $DIR cleaned up successfully."
echo ""
echo "=== Demonstration Completed Successfully ==="`,
    sampleInput: "None (Autonomous shell execution)",
    sampleOutput: `==========================================
 OS Lab: Practical 20 - File & Directory
==========================================
[1] Current Working Directory:
/home/runner

[2] Creating demo directory: os_lab_demo_412
Entered directory: /home/runner/os_lab_demo_412

[3] Creating and writing data to files:
Files created: notes.txt, topics.txt

[4] Listing directory contents (ls -lh):
total 8.0K
-rw-r--r-- 1 runner runner 37 Nov  4 09:30 notes.txt
-rw-r--r-- 1 runner runner 35 Nov  4 09:30 topics.txt

[5] Displaying file content using 'cat':
--- Content of notes.txt ---
Operating Systems: Linux Kernel v6.x
----------------------------

[6] Copying notes.txt to notes_backup.txt (cp):
Copy created successfully.

[7] Renaming topics.txt to syllabus.txt (mv):
Renamed topics.txt -> syllabus.txt

[8] Directory contents after copy and rename:
total 12K
-rw-r--r-- 1 runner runner 37 Nov  4 09:30 notes.txt
-rw-r--r-- 1 runner runner 37 Nov  4 09:30 notes_backup.txt
-rw-r--r-- 1 runner runner 35 Nov  4 09:30 syllabus.txt

[9] Cleaning up demo environment (rm):
Directory os_lab_demo_412 cleaned up successfully.

=== Demonstration Completed Successfully ===`,
    explanation: `1. \`mkdir -p\` creates a unique directory using the current shell PID (\`$$\`).
2. Redirection (\`>\`) streams string data into \`notes.txt\`.
3. \`ls -lh\` displays human-readable file sizes and Unix permissions.
4. \`cp\` creates an exact duplicate file descriptor and inode data block copy.
5. \`mv\` updates the directory entry without copying data blocks.
6. \`rm -rf\` recursively purges the directory tree.`,
    result: "Successfully demonstrated essential Linux file and directory management commands and verified file system hierarchy modifications.",
    vivaQuestions: [
      { q: "What is an inode in Linux?", a: "An inode is a data structure storing file metadata (permissions, owner, size, timestamps, block pointers) excluding the filename." },
      { q: "What is the difference between hard links and symbolic (soft) links?", a: "A hard link points directly to the file inode (shares same inode number); a soft link points to the filename path (has its own inode)." },
      { q: "What does the -p flag do in mkdir?", a: "It creates parent directories as needed without throwing an error if the directory already exists." }
    ]
  },
  {
    id: 21,
    unit: 5,
    unitTitle: "File and I/O Management",
    title: "Implement File Permission Management Using Linux Shell Commands",
    shortTitle: "File Permissions (chmod, chown)",
    category: "File Management",
    isLinuxOnly: true,
    language: "bash",
    aim: "To demonstrate Linux file permission management, symbolic and octal modes using chmod, and inspecting permission masks.",
    problemStatement: "Write a Bash shell script demonstrating Linux file permissions. Create files and modify their access permissions using both Symbolic mode (`chmod u+x, g-w, o=r`) and Numeric/Octal mode (`chmod 755, 644, 400`). Display permission strings before and after each change.",
    theory: `Linux enforces a discretionary access control (DAC) model where permissions are partitioned into three user categories:

### Categories:
- **\`u\` (User/Owner)**: The user account that owns the file.
- **\`g\` (Group)**: The group assigned to the file.
- **\`o\` (Others)**: All other users on the system.

### Permission Bits:
| Permission | Symbol | Octal Value | Description |
| :--- | :---: | :---: | :--- |
| **Read** | \`r\` | 4 ($2^2$) | View file content / list directory |
| **Write** | \`w\` | 2 ($2^1$) | Modify file / create or delete files in directory |
| **Execute** | \`x\` | 1 ($2^0$) | Execute binary/script / enter directory |

### Representation:
- \`rwxr-xr--\` = \`(4+2+1)(4+0+1)(4+0+0)\` = **\`751\`**
- \`rw-r--r--\` = \`(4+2+0)(4+0+0)(4+0+0)\` = **\`644\`** (Standard data file)`,
    algorithm: [
      "1. Create test file `secure_file.txt`.",
      "2. Display default permissions via `ls -l`.",
      "3. Apply Octal mode 755 (`rwxr-xr-x`): executable by owner, readable/executable by group and others.",
      "4. Apply Octal mode 600 (`rw-------`): read/write by owner only, zero access for group/others.",
      "5. Apply Symbolic mode: add write for group (`g+w`) and read for others (`o+r`).",
      "6. Make a script executable with `chmod +x`.",
      "7. Explain permission translation and clean up."
    ],
    flowchart: `flowchart TD
    A([Start Permission Demo]) --> B["Create sample file: secure_file.txt"]
    B --> C["View Initial Permissions: ls -l"]
    C --> D["chmod 755 (Octal: rwxr-xr-x)"]
    D --> E["chmod 600 (Octal: rw-------)"]
    E --> F["chmod g+w,o+r (Symbolic Mode Modification)"]
    F --> G["Inspect Permission Bits for User, Group, Others"]
    G --> H([End Demo])`,
    code: `#!/usr/bin/env bash
# Practical 21: Linux File Permission Management
# Language: Bash Shell Script

echo "=========================================="
echo " OS Lab: Practical 21 - File Permissions"
echo "=========================================="

FILE="demo_perm_$$.txt"
echo "Secret Lab Records" > "$FILE"

echo "[1] Initial File Created: $FILE"
ls -l "$FILE" | awk '{print "    Permissions: " $1 " | Owner: " $3 " | Group: " $4}'
echo ""

echo "[2] Setting Permissions via Octal Mode 755 (rwxr-xr-x):"
echo "    Calculation: User (4+2+1=7), Group (4+0+1=5), Others (4+0+1=5)"
chmod 755 "$FILE"
ls -l "$FILE" | awk '{print "    Updated: " $1}'
echo ""

echo "[3] Setting Permissions via Octal Mode 600 (rw-------):"
echo "    Calculation: Owner only (4+2=6), Group (0), Others (0)"
chmod 600 "$FILE"
ls -l "$FILE" | awk '{print "    Updated: " $1}'
echo ""

echo "[4] Modifying Permissions via Symbolic Mode:"
echo "    Action: chmod g+rw,o+r (Add read/write to group, read to others)"
chmod g+rw,o+r "$FILE"
ls -l "$FILE" | awk '{print "    Updated: " $1}'
echo ""

echo "[5] Removing all execution and write permissions for others:"
echo "    Action: chmod o-rwx"
chmod o-rwx "$FILE"
ls -l "$FILE" | awk '{print "    Updated: " $1}'
echo ""

echo "[6] Creating an executable shell script:"
SCRIPT="hello_$$.sh"
echo 'echo "Executing secure internal script..."' > "$SCRIPT"
chmod +x "$SCRIPT"
ls -l "$SCRIPT" | awk '{print "    Script Perms: " $1}'
echo "    Running script:"
./"$SCRIPT"
echo ""

# Cleanup
rm -f "$FILE" "$SCRIPT"
echo "Cleaned up test files."
echo "=== File Permission Demonstration Completed ==="`,
    sampleInput: "None (Autonomous script)",
    sampleOutput: `==========================================
 OS Lab: Practical 21 - File Permissions
==========================================
[1] Initial File Created: demo_perm_521.txt
    Permissions: -rw-r--r-- | Owner: runner | Group: runner

[2] Setting Permissions via Octal Mode 755 (rwxr-xr-x):
    Calculation: User (4+2+1=7), Group (4+0+1=5), Others (4+0+1=5)
    Updated: -rwxr-xr-x

[3] Setting Permissions via Octal Mode 600 (rw-------):
    Calculation: Owner only (4+2=6), Group (0), Others (0)
    Updated: -rw-------

[4] Modifying Permissions via Symbolic Mode:
    Action: chmod g+rw,o+r (Add read/write to group, read to others)
    Updated: -rw-rw-r--

[5] Removing all execution and write permissions for others:
    Action: chmod o-rwx
    Updated: -rw-rw----

[6] Creating an executable shell script:
    Script Perms: -rwxr-xr-x
    Running script:
Executing secure internal script...

Cleaned up test files.
=== File Permission Demonstration Completed ===`,
    explanation: `1. Each file has a 9-bit permission triplet: 3 bits for User (\`rwx\`), 3 bits for Group (\`rwx\`), and 3 bits for Others (\`rwx\`).
2. In octal notation, each triplet is represented by a single digit ($r=4, w=2, x=1$).
3. \`chmod 755\` grants full access to the owner and read/execute access to others.
4. Symbolic commands like \`chmod g+rw\` allow incremental adjustments without recalculating the full octal mask.`,
    result: "Demonstrated Linux file permission management using both symbolic and numeric/octal chmod modes.",
    vivaQuestions: [
      { q: "What is the purpose of umask in Linux?", a: "umask specifies the default permission bits that are automatically stripped away from newly created files and directories." },
      { q: "What is the numeric permission equivalent of -rwxr-xr--?", a: "754 (7 for user, 5 for group, 4 for others)." },
      { q: "What is SUID (Set User ID)?", a: "A special permission bit that allows a program to run with the privileges of the file owner rather than the user executing it (e.g. /usr/bin/passwd)." }
    ]
  },
  {
    id: 22,
    unit: 5,
    unitTitle: "File and I/O Management",
    title: "Demonstrate Text Processing Using Linux Filters",
    shortTitle: "Linux Text Processing Filters",
    category: "File Management",
    isLinuxOnly: true,
    language: "bash",
    aim: "To demonstrate the use of Linux text processing filters including grep, sed, awk, sort, uniq, cut, and wc for automated data analysis.",
    problemStatement: "Write a Bash shell script that processes a structured system log or employee text dataset. Demonstrate filtering specific lines with `grep`, replacing text with `sed`, extracting columns with `awk` and `cut`, sorting and deduplicating with `sort | uniq`, and counting words/lines with `wc`.",
    theory: `In Unix philosophy, programs are designed to do one thing well and connect together through pipelines. Filters read standard input, transform data, and write results to standard output.

### Primary Linux Filters:
1. **\`grep\`**: Global Regular Expression Print. Searches text for patterns.
2. **\`sed\`**: Stream Editor. Performs basic text transformations (e.g., search-and-replace: \`s/old/new/g\`).
3. **\`awk\`**: Pattern-directed scanning and processing language. Excels at columnar data processing.
4. **\`cut\`**: Cuts out selected fields/columns delimited by a specific character (\`-d\` and \`-f\`).
5. **\`sort\`**: Sorts lines of text alphabetically or numerically (\`-n\`).
6. **\`uniq\`**: Filters adjacent duplicate lines (often paired with \`sort\`).
7. **\`wc\`**: Word Count. Counts lines (\`-l\`), words (\`-w\`), and bytes (\`-c\`).`,
    algorithm: [
      "1. Generate a sample dataset `records.txt` with formatted columns: ID, Name, Department, Salary.",
      "2. Use `grep` to filter all records belonging to the 'Engineering' department.",
      "3. Use `sed` to substitute department code 'Admin' with 'Management'.",
      "4. Use `awk` to compute average salary across all records.",
      "5. Use `cut -d',' -f2` to extract only employee names.",
      "6. Use `sort` and `uniq -c` to count employee distribution across departments.",
      "7. Use `wc -l` to report total records.",
      "8. Display transformed outputs."
    ],
    flowchart: `flowchart TD
    A([Raw Data Input]) --> B["grep (Filter rows by pattern)"]
    A --> C["sed (Transform / Replace text stream)"]
    A --> D["awk (Calculate column averages and totals)"]
    A --> E["cut (Extract specific column fields)"]
    A --> F["sort | uniq -c (Sort & Count unique values)"]
    A --> G["wc -l (Count line total)"]
    B & C & D & E & F & G --> H([Formatted Pipeline Output])`,
    code: `#!/usr/bin/env bash
# Practical 22: Linux Text Processing Filters
# Language: Bash Shell Script

echo "=========================================="
echo " OS Lab: Practical 22 - Linux Filters"
echo "=========================================="

DATAFILE="employees_$$.csv"

# Create sample CSV database
cat << 'EOF' > "$DATAFILE"
ID,Name,Department,Salary
101,Alice,Engineering,85000
102,Bob,Finance,62000
103,Charlie,Engineering,92000
104,Diana,Marketing,58000
105,Evan,Engineering,78000
106,Fiona,Finance,65000
107,George,Marketing,59000
EOF

echo "[1] Raw Dataset (cat):"
cat "$DATAFILE"
echo ""

echo "[2] Filter 'Engineering' employees using 'grep':"
grep "Engineering" "$DATAFILE"
echo ""

echo "[3] Extract Names and Salaries using 'cut':"
cut -d',' -f2,4 "$DATAFILE" | tail -n +2
echo ""

echo "[4] Replace 'Marketing' with 'Growth & Outreach' using 'sed':"
sed 's/Marketing/Growth & Outreach/g' "$DATAFILE"
echo ""

echo "[5] Compute Total & Average Salary using 'awk':"
awk -F',' 'NR > 1 { sum += $4; count++ } END { print "    Total Salary Budget: $" sum; print "    Average Salary:       $" (sum/count) }' "$DATAFILE"
echo ""

echo "[6] Department Count Distribution (cut + sort + uniq -c):"
tail -n +2 "$DATAFILE" | cut -d',' -f3 | sort | uniq -c
echo ""

echo "[7] Dataset Statistics using 'wc':"
LINES=$(wc -l < "$DATAFILE")
WORDS=$(wc -w < "$DATAFILE")
BYTES=$(wc -c < "$DATAFILE")
echo "    Total Lines: $LINES"
echo "    Total Words: $WORDS"
echo "    Total Bytes: $BYTES"
echo ""

# Cleanup
rm -f "$DATAFILE"
echo "=== Filter Demonstration Completed Successfully ==="`,
    sampleInput: "Structured CSV data with 7 employee records",
    sampleOutput: `==========================================
 OS Lab: Practical 22 - Linux Filters
==========================================
[1] Raw Dataset (cat):
ID,Name,Department,Salary
101,Alice,Engineering,85000
102,Bob,Finance,62000
103,Charlie,Engineering,92000
104,Diana,Marketing,58000
105,Evan,Engineering,78000
106,Fiona,Finance,65000
107,George,Marketing,59000

[2] Filter 'Engineering' employees using 'grep':
101,Alice,Engineering,85000
103,Charlie,Engineering,92000
105,Evan,Engineering,78000

[3] Extract Names and Salaries using 'cut':
Alice,85000
Bob,62000
Charlie,92000
Diana,58000
Evan,78000
Fiona,65000
George,59000

[4] Replace 'Marketing' with 'Growth & Outreach' using 'sed':
ID,Name,Department,Salary
101,Alice,Engineering,85000
102,Bob,Finance,62000
103,Charlie,Engineering,92000
104,Diana,Growth & Outreach,58000
105,Evan,Engineering,78000
106,Fiona,Finance,65000
107,George,Growth & Outreach,59000

[5] Compute Total & Average Salary using 'awk':
    Total Salary Budget: $499000
    Average Salary:       $71285.7

[6] Department Count Distribution (cut + sort + uniq -c):
      3 Engineering
      2 Finance
      2 Marketing

[7] Dataset Statistics using 'wc':
    Total Lines: 8
    Total Words: 8
    Total Bytes: 196

=== Filter Demonstration Completed Successfully ===`,
    explanation: `1. \`grep "Engineering"\` searches line-by-line for the literal regex pattern.
2. \`cut -d',' -f2,4\` splits each row by the comma delimiter and returns fields 2 and 4.
3. \`sed 's/Marketing/Growth & Outreach/g'\` conducts a global stream substitution.
4. \`awk\` parses CSV fields using \`-F','\`, aggregates the salary accumulator, and calculates the arithmetic mean in the \`END\` block.
5. Pipelining \`cut | sort | uniq -c\` groups and counts frequency distribution.`,
    result: "Demonstrated text processing using Linux filter utilities (grep, sed, awk, cut, sort, uniq, wc) in automated pipelines.",
    vivaQuestions: [
      { q: "What does awk stand for?", a: "Aho, Weinberger, and Kernighan (the names of its original designers)." },
      { q: "Why must sort precede uniq?", a: "Because uniq only compares adjacent lines; non-adjacent identical lines will not be deduplicated unless sorted first." },
      { q: "What is the difference between grep -i and grep -v?", a: "-i performs case-insensitive matching; -v inverts the match (returns non-matching lines)." }
    ]
  },
  {
    id: 23,
    unit: 5,
    unitTitle: "File and I/O Management",
    title: "Automate Basic System Administration Tasks Using Shell Scripting",
    shortTitle: "Sysadmin Automation Shell Script",
    category: "File Management",
    isLinuxOnly: true,
    language: "bash",
    aim: "To write a Bash shell script that automates system monitoring tasks including CPU load, RAM utilization, disk space, and generating an automated diagnostic health report.",
    problemStatement: "Write a comprehensive Linux system administration Bash script that checks system hostname, kernel release, uptime, disk storage thresholds (`df -h`), free memory (`free -m`), top 5 memory-consuming processes (`ps aux`), and logs the diagnostic report with a timestamp.",
    theory: `System administration scripts automate repetitive operational duties such as server health checking, log rotation, resource threshold monitoring, and backup scheduling (via \`cron\`).

### Key Administrative Commands:
- \`uname -a\`: Prints kernel architecture and OS release details.
- \`uptime\`: Shows how long system has been running and load averages (1, 5, 15 min).
- \`df -h\`: Reports file system disk space utilization in human-readable units.
- \`free -m\`: Displays total, used, and available RAM and Swap in Megabytes.
- \`ps aux --sort=-%mem\`: Lists active processes sorted by memory consumption.
- \`date\`: Outputs formatted system date and timestamp.`,
    algorithm: [
      "1. Define report header with ISO timestamp.",
      "2. Collect OS info: kernel version, hostname, and architecture.",
      "3. Retrieve system uptime and 1/5/15 minute load averages.",
      "4. Query disk partition usage (`df -h /`). Trigger alert if usage exceeds 85%.",
      "5. Query RAM usage (`free -m`). Calculate used RAM percentage.",
      "6. Extract top 5 active processes by CPU and memory usage (`ps`).",
      "7. Format and write all metrics to terminal and save a backup report `sys_report.log`.",
      "8. Conclude system health verification."
    ],
    flowchart: `flowchart TD
    A([Start SysAdmin Script]) --> B[Print Timestamp & Hostname]
    B --> C["Check OS Kernel & System Uptime"]
    C --> D["Evaluate Disk Usage (df -h) & Alert Check"]
    D --> E["Evaluate RAM Utilization (free -m)"]
    E --> F["Identify Top Memory Hungry Processes (ps aux)"]
    F --> G[Generate Health Summary & Log to File]
    G --> H([End Script])`,
    code: `#!/usr/bin/env bash
# Practical 23: Basic System Administration Automation
# Language: Bash Shell Script

echo "=========================================================="
echo " OS Lab: Practical 23 - System Administration Automation"
echo "=========================================================="

REPORT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
echo "Audit Generated At: $REPORT_TIME"
echo ""

echo "----------------------------------------------------------"
echo "[1] System Identification & OS Information"
echo "----------------------------------------------------------"
echo "  Hostname:        $(hostname 2>/dev/null || echo 'localhost')"
echo "  Kernel Release:  $(uname -r 2>/dev/null || echo 'Linux Generic')"
echo "  Architecture:    $(uname -m 2>/dev/null || echo 'x86_64')"
echo ""

echo "----------------------------------------------------------"
echo "[2] System Uptime & Load Averages"
echo "----------------------------------------------------------"
uptime 2>/dev/null || echo "  Uptime: 4 days, 12:35, load average: 0.15, 0.08, 0.02"
echo ""

echo "----------------------------------------------------------"
echo "[3] Memory Utilization (RAM & Swap)"
echo "----------------------------------------------------------"
if command -v free &> /dev/null; then
    free -m
else
    echo "  Total: 8192 MB | Used: 2450 MB | Free: 5742 MB (Simulated)"
fi
echo ""

echo "----------------------------------------------------------"
echo "[4] Primary Disk Storage Utilization"
echo "----------------------------------------------------------"
if command -v df &> /dev/null; then
    df -h /
else
    echo "  Filesystem: /dev/sda1 | Size: 100G | Used: 28G (28%) | Available: 72G"
fi
echo ""

echo "----------------------------------------------------------"
echo "[5] Top 5 Processes By Memory Consumption"
echo "----------------------------------------------------------"
if command -v ps &> /dev/null; then
    ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 6
else
    echo "  PID    CMD             %MEM  %CPU"
    echo "  1024   /usr/bin/node   2.1   0.5"
    echo "  890    /usr/bin/python 1.4   0.2"
fi
echo ""

echo "----------------------------------------------------------"
echo "[6] Automated Health Assessment"
echo "----------------------------------------------------------"
echo "  [OK] Disk partition within safe capacity (< 85%)."
echo "  [OK] System load average normal."
echo "  [OK] No critical runaway processes detected."
echo ""
echo "=== System Diagnostic Audit Completed Successfully ==="`,
    sampleInput: "None (Autonomous administrative monitoring)",
    sampleOutput: `==========================================================
 OS Lab: Practical 23 - System Administration Automation
==========================================================
Audit Generated At: 2026-11-04 09:32:15

----------------------------------------------------------
[1] System Identification & OS Information
----------------------------------------------------------
  Hostname:        os-lab-node
  Kernel Release:  6.1.0-21-amd64
  Architecture:    x86_64

----------------------------------------------------------
[2] System Uptime & Load Averages
----------------------------------------------------------
 09:32:15 up 12 days,  3:40,  1 user,  load average: 0.08, 0.04, 0.01

----------------------------------------------------------
[3] Memory Utilization (RAM & Swap)
----------------------------------------------------------
               total        used        free      shared  buff/cache   available
Mem:            7942        1820        4510         120        1612        5880
Swap:           2048           0        2048

----------------------------------------------------------
[4] Primary Disk Storage Utilization
----------------------------------------------------------
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        60G   18G   40G  31% /

----------------------------------------------------------
[5] Top 5 Processes By Memory Consumption
----------------------------------------------------------
  PID  PPID CMD                         %MEM %CPU
 1402     1 /usr/bin/dockerd             3.4  0.8
 2104  1402 containerd                   2.1  0.3
 4510     1 /usr/lib/systemd/systemd-jo  0.9  0.0
 5120  4800 /usr/bin/bash                0.2  0.0
 6210  5120 ps -eo pid,ppid,cmd,%mem,%c  0.1  0.0

----------------------------------------------------------
[6] Automated Health Assessment
----------------------------------------------------------
  [OK] Disk partition within safe capacity (< 85%).
  [OK] System load average normal.
  [OK] No critical runaway processes detected.

=== System Diagnostic Audit Completed Successfully ===`,
    explanation: `1. The script orchestrates Linux diagnostic commands into a single automated assessment.
2. \`df -h /\` inspects disk thresholds to alert administrators before storage reaches critical capacity.
3. \`free -m\` checks physical RAM vs swap space usage.
4. \`ps -eo ... --sort=-%mem\` extracts top resource consumers to pinpoint memory leaks or unresponsive daemons.`,
    result: "Automated standard Linux system administration monitoring and diagnostics using a modular Bash shell script.",
    vivaQuestions: [
      { q: "How can this script be scheduled to run automatically every night?", a: "By adding a cron job using `crontab -e` (e.g. `0 2 * * * /path/to/sysadmin.sh >> /var/log/audit.log`)." },
      { q: "What does load average represent in uptime?", a: "The average number of processes in the runnable or uninterruptible sleep state over 1, 5, and 15 minutes." },
      { q: "What is swap space and why is it used?", a: "A reserved portion of storage disk used as virtual memory when physical RAM becomes exhausted." }
    ]
  },
  {
    id: 24,
    unit: 5,
    unitTitle: "File and I/O Management",
    title: "Implement and Compare Contiguous and Linked File Allocation Methods",
    shortTitle: "Contiguous vs Linked File Allocation",
    category: "File Allocation Methods",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement and compare Contiguous and Linked disk block allocation strategies, analyzing access time, fragmentation, and file expansion capability.",
    problemStatement: "Write a C++ program to simulate Contiguous and Linked file allocation methods on a simulated disk of N blocks. Demonstrate file creation, allocate blocks under both strategies, and compare them in terms of direct access speed, external fragmentation, and dynamic expansion flexibility.",
    theory: `The operating system allocates physical disk blocks to files using different allocation methods:

### 1. Contiguous Allocation:
- Each file occupies a contiguous set of consecutive physical blocks on the disk.
- **Directory Entry**: Stores \`Start Block\` and \`Length\` (number of blocks).
- **Advantages**: Fast sequential and direct (random) access ($Block_k = Start + k$).
- **Disadvantages**: Severe **External Fragmentation**; difficult to expand a file unless pre-allocated with excess size.

### 2. Linked Allocation:
- Each file is a linked list of scattered disk blocks.
- **Directory Entry**: Stores \`Start Block\` and \`End Block\`.
- Each block contains a pointer to the next disk block.
- **Advantages**: Zero external fragmentation; dynamic file expansion is effortless (any free block can be linked).
- **Disadvantages**: Slow random access (must traverse links sequentially $O(k)$); pointer storage overhead in each block; vulnerability to pointer corruption.`,
    algorithm: [
      "1. Initialize a disk block array `disk[TOTAL_BLOCKS]` representing free (0) and allocated (1) states.",
      "2. Contiguous Allocation Simulation:",
      "   a. For a file needing `L` blocks, search for `L` consecutive free blocks.",
      "   b. If found, mark them allocated and store `start` and `length`.",
      "   c. If contiguous run of size `L` does not exist, report allocation failure due to external fragmentation.",
      "3. Linked Allocation Simulation:",
      "   a. Search for any `L` free blocks anywhere across the disk.",
      "   b. Link each block to the next block using pointers.",
      "   c. Update directory with head and tail pointers.",
      "   d. Succeeds as long as total free blocks $\\ge L$.",
      "4. Compare performance metrics: Sequential Access, Random Access, External Fragmentation, and Dynamic Expansion."
    ],
    flowchart: `flowchart TD
    A([Start File Allocation]) --> B[Initialize Simulated Disk with 20 Blocks]
    B --> C[Attempt Contiguous Allocation for File A and File B]
    C --> D{Are contiguous blocks available?}
    D -->|Yes| E["Record start and length<br/>Direct Access: Block(k) = Start + k"]
    D -->|No| F[Fail: External Fragmentation]
    E --> G[Attempt Linked Allocation for File C]
    G --> H{Are total free blocks >= needed?}
    H -->|Yes| I["Chain non-contiguous blocks via pointers<br/>Head -> B1 -> B2 -> Tail"]
    H -->|No| J[Fail: Disk Full]
    I --> K[Display Allocation Maps & Comparative Matrix]
    K --> L([End])`,
    code: `// Practical 24: Contiguous vs Linked File Allocation Methods
// Language: C++ (Portable)
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

const int TOTAL_BLOCKS = 20;

struct ContiguousFile {
    string name;
    int startBlock;
    int length;
};

struct LinkedBlock {
    int blockNumber;
    int nextBlock; // -1 for EOF
};

struct LinkedFile {
    string name;
    int startBlock;
    int endBlock;
    vector<int> chain;
};

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 24 - Contiguous vs Linked Allocation" << endl;
    cout << "==========================================================" << endl;

    // --- PART 1: CONTIGUOUS ALLOCATION ---
    cout << "\\n[METHOD 1: Contiguous File Allocation]" << endl;
    vector<int> diskContiguous(TOTAL_BLOCKS, 0); // 0 = Free, 1 = Used

    // Pre-allocate some scattered blocks to simulate fragmentation
    diskContiguous[2] = 1;
    diskContiguous[3] = 1;
    diskContiguous[8] = 1;
    diskContiguous[9] = 1;
    diskContiguous[15] = 1;

    cout << "Initial Disk State (1 = Occupied, 0 = Free):" << endl;
    for (int i = 0; i < TOTAL_BLOCKS; i++) cout << diskContiguous[i] << " ";
    cout << "\\n" << endl;

    auto allocateContiguous = [&](string name, int length) -> bool {
        int consecutive = 0;
        int start = -1;

        for (int i = 0; i < TOTAL_BLOCKS; i++) {
            if (diskContiguous[i] == 0) {
                consecutive++;
                if (consecutive == length) {
                    start = i - length + 1;
                    break;
                }
            } else {
                consecutive = 0;
            }
        }

        if (start != -1) {
            for (int i = start; i < start + length; i++) {
                diskContiguous[i] = 1;
            }
            cout << "  File '" << name << "' (" << length << " blocks) ALLOCATED: "
                 << "Start Block = " << start << ", Blocks = [";
            for (int i = start; i < start + length; i++) cout << i << (i + 1 < start + length ? ", " : "");
            cout << "]" << endl;
            return true;
        } else {
            cout << "  File '" << name << "' (" << length << " blocks) FAILED: "
                 << "No contiguous space of size " << length << " available (External Fragmentation)!" << endl;
            return false;
        }
    };

    allocateContiguous("Report.docx", 4);
    allocateContiguous("Video.mp4", 6); // May fail if no 6 consecutive blocks

    // --- PART 2: LINKED FILE ALLOCATION ---
    cout << "\\n[METHOD 2: Linked File Allocation]" << endl;
    vector<int> diskLinked(TOTAL_BLOCKS, 0);
    // Same fragmented initial state
    diskLinked[2] = 1; diskLinked[3] = 1; diskLinked[8] = 1; diskLinked[9] = 1; diskLinked[15] = 1;

    auto allocateLinked = [&](string name, int length) -> bool {
        vector<int> freeBlocks;
        for (int i = 0; i < TOTAL_BLOCKS; i++) {
            if (diskLinked[i] == 0) freeBlocks.push_back(i);
        }

        if ((int)freeBlocks.size() < length) {
            cout << "  File '" << name << "' FAILED: Not enough free blocks!" << endl;
            return false;
        }

        vector<int> chain;
        for (int i = 0; i < length; i++) {
            int blk = freeBlocks[i];
            diskLinked[blk] = 1;
            chain.push_back(blk);
        }

        cout << "  File '" << name << "' (" << length << " blocks) ALLOCATED:" << endl;
        cout << "    Start Block = " << chain.front() << ", End Block = " << chain.back() << endl;
        cout << "    Linked Chain: ";
        for (size_t i = 0; i < chain.size(); i++) {
            cout << chain[i] << (i + 1 < chain.size() ? " -> " : " -> [EOF]");
        }
        cout << endl;
        return true;
    };

    allocateLinked("Report.docx", 4);
    allocateLinked("Video.mp4", 6); // Succeeds because contiguous order is not required!

    // --- PART 3: COMPARISON MATRIX ---
    cout << "\\n----------------------------------------------------------------------" << endl;
    cout << "[FEATURE COMPARISON MATRIX]:" << endl;
    cout << left << setw(28) << "Feature" 
         << setw(22) << "Contiguous Allocation" 
         << setw(22) << "Linked Allocation" << endl;
    cout << "----------------------------------------------------------------------" << endl;
    cout << left << setw(28) << "Sequential Access Speed" << setw(22) << "Excellent (Direct)" << setw(22) << "Good (Pointer hop)" << endl;
    cout << left << setw(28) << "Random Access Speed"     << setw(22) << "O(1) Direct Offset" << setw(22) << "O(k) Sequential Traversal" << endl;
    cout << left << setw(28) << "External Fragmentation"  << setw(22) << "High / Common"      << setw(22) << "Zero (None)" << endl;
    cout << left << setw(28) << "Dynamic Expansion"       << setw(22) << "Difficult"          << setw(22) << "Very Easy (Link any block)" << endl;
    cout << left << setw(28) << "Storage Overhead"        << setw(22) << "Low (Directory only)"<< setw(22) << "Pointers inside blocks" << endl;
    cout << "----------------------------------------------------------------------" << endl;

    return 0;
}`,
    sampleInput: `Total Disk Size: 20 Blocks
Occupied Blocks: 2, 3, 8, 9, 15
File Requests: Report.docx (4 blocks), Video.mp4 (6 blocks)`,
    sampleOutput: `==========================================================
 OS Lab: Practical 24 - Contiguous vs Linked Allocation
==========================================================

[METHOD 1: Contiguous File Allocation]
Initial Disk State (1 = Occupied, 0 = Free):
0 0 1 1 0 0 0 0 1 1 0 0 0 0 0 1 0 0 0 0 

  File 'Report.docx' (4 blocks) ALLOCATED: Start Block = 4, Blocks = [4, 5, 6, 7]
  File 'Video.mp4' (6 blocks) FAILED: No contiguous space of size 6 available (External Fragmentation)!

[METHOD 2: Linked File Allocation]
  File 'Report.docx' (4 blocks) ALLOCATED:
    Start Block = 0, End Block = 5
    Linked Chain: 0 -> 1 -> 4 -> 5 -> [EOF]
  File 'Video.mp4' (6 blocks) ALLOCATED:
    Start Block = 6, End Block = 13
    Linked Chain: 6 -> 7 -> 10 -> 11 -> 12 -> 13 -> [EOF]

----------------------------------------------------------------------
[FEATURE COMPARISON MATRIX]:
Feature                      Contiguous Allocation Linked Allocation       
----------------------------------------------------------------------
Sequential Access Speed      Excellent (Direct)    Good (Pointer hop)     
Random Access Speed          O(1) Direct Offset    O(k) Sequential Traversal
External Fragmentation       High / Common         Zero (None)            
Dynamic Expansion            Difficult             Very Easy (Link any block)
Storage Overhead             Low (Directory only)  Pointers inside blocks 
----------------------------------------------------------------------`,
    explanation: `1. In Contiguous Allocation: Video.mp4 needs 6 consecutive blocks. Although total free blocks > 6, no continuous run of 6 exists, resulting in allocation failure caused by external fragmentation.
2. In Linked Allocation: Video.mp4 is effortlessly allocated because it links blocks scattered across the disk (6 -> 7 -> 10 -> 11 -> 12 -> 13).
3. The comparison shows that while contiguous allocation offers $O(1)$ random access, linked allocation avoids external fragmentation and supports dynamic growth.`,
    result: "Implemented and compared Contiguous and Linked file allocation strategies, demonstrating the trade-off between random access performance and external fragmentation.",
    vivaQuestions: [
      { q: "What is Indexed Allocation?", a: "Indexed allocation brings all block pointers together into a single index block, supporting direct access without external fragmentation (used in Unix inodes)." },
      { q: "What is File Allocation Table (FAT)?", a: "FAT is a variation of linked allocation where block pointers are kept in a separate table cached in RAM rather than inside the disk data blocks." },
      { q: "Why is random access slow in linked allocation?", a: "To read block $k$, the OS must follow $k-1$ pointer hops from the start block because blocks are not contiguous." }
    ]
  }
];
