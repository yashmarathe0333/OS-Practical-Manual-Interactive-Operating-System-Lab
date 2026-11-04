export const practicalsUnit1 = [
  {
    id: 1,
    unit: 1,
    unitTitle: "Introduction to Operating System and Process Management",
    title: "Demonstration of Process Creation Using the fork() System Call",
    shortTitle: "Process Creation with fork()",
    category: "Process Management",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To demonstrate the creation of a child process from an existing parent process using the fork() system call in Linux.",
    problemStatement: "Write a C++ program in Linux environment to create a new process using the fork() system call. Differentiate between the execution of the parent process and the child process based on the return value of fork(), displaying their respective PIDs and executing separate code blocks.",
    theory: `In Unix/Linux operating systems, process creation is achieved primarily through the \`fork()\` system call. 

When \`fork()\` is invoked:
1. An exact duplicate (child process) of the calling process (parent process) is created.
2. The child obtains a copy of the parent's address space, including text, data, heap, and stack segments (optimized using Copy-on-Write / COW in modern kernels).
3. The child has its own unique Process Identifier (PID).
4. Both parent and child continue execution concurrently from the instruction immediately following \`fork()\`.

### Return Values of fork():
- **Negative value (\`< 0\`)**: Fork creation failed (due to resource exhaustion like process table limits).
- **Zero (\`0\`)**: Returned to the newly created child process.
- **Positive value (\`> 0\`)**: Returned to the parent process; the value corresponds to the PID of the newly spawned child.`,
    algorithm: [
      "1. Start the program and include required system headers (<iostream>, <unistd.h>, <sys/types.h>).",
      "2. Declare a variable `pid_t pid` to store the return value of `fork()`.",
      "3. Invoke `pid = fork()` to split execution into parent and child processes.",
      "4. Check the value of `pid`: ",
      "   - If `pid < 0`: Print an error indicating process creation failed and exit.",
      "   - If `pid == 0`: This is the child process. Print child-specific message, child PID using `getpid()`, and parent PID using `getppid()`.",
      "   - If `pid > 0`: This is the parent process. Print parent PID and the child's PID returned by `fork()`.",
      "5. Let both processes finish and terminate with return 0."
    ],
    flowchart: `flowchart TD
    A([Start Program]) --> B[Call fork System Call]
    B --> C{Evaluate Return Value of fork}
    C -->|pid < 0| D[Output: Fork Failed / Error]
    C -->|pid == 0| E["Child Process Branch<br/>Print Child PID & Parent PID"]
    C -->|pid > 0| F["Parent Process Branch<br/>Print Parent PID & Spawned Child PID"]
    D --> G([Exit Program])
    E --> G
    F --> G`,
    code: `// Practical 1: Demonstration of Process Creation Using fork()
// Platform: Linux (g++ compiler)
#include <iostream>
#include <unistd.h>
#include <sys/types.h>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 1 - fork() Demo" << endl;
    cout << "==========================================" << endl;
    cout << "[Initial] Main process started. PID: " << getpid() << endl;
    cout << "[Action] Calling fork() system call..." << endl << endl;

    // Forking a new child process
    pid_t pid = fork();

    if (pid < 0) {
        // Fork failure
        cerr << "Error: Process creation failed!" << endl;
        return 1;
    } 
    else if (pid == 0) {
        // Child process execution
        cout << "[CHILD] Hello from the Child Process!" << endl;
        cout << "[CHILD] Child PID:  " << getpid() << endl;
        cout << "[CHILD] Parent PID: " << getppid() << endl;
        cout << "[CHILD] Task: Computing square of 7 = " << (7 * 7) << endl;
    } 
    else {
        // Parent process execution
        cout << "[PARENT] Hello from the Parent Process!" << endl;
        cout << "[PARENT] Parent PID:      " << getpid() << endl;
        cout << "[PARENT] Spawned Child PID: " << pid << endl;
        cout << "[PARENT] Task: Parent waiting or doing supervisory work." << endl;
    }

    cout << "[End] Process with PID " << getpid() << " finished execution." << endl;
    return 0;
}`,
    sampleInput: "None (Direct execution demonstration)",
    sampleOutput: `==========================================
 OS Lab: Practical 1 - fork() Demo
==========================================
[Initial] Main process started. PID: 2145
[Action] Calling fork() system call...

[PARENT] Hello from the Parent Process!
[PARENT] Parent PID:      2145
[PARENT] Spawned Child PID: 2146
[PARENT] Task: Parent waiting or doing supervisory work.
[End] Process with PID 2145 finished execution.
[CHILD] Hello from the Child Process!
[CHILD] Child PID:  2146
[CHILD] Parent PID: 2145
[CHILD] Task: Computing square of 7 = 49
[End] Process with PID 2146 finished execution.`,
    explanation: `1. \`#include <unistd.h>\` and \`#include <sys/types.h>\` provide POSIX definitions for \`pid_t\` and \`fork()\`.
2. \`fork()\` is called once but returns twice — once in the caller (parent) with the child's positive PID, and once in the child with 0.
3. The \`if-else\` ladder enables the single code file to execute distinct logic for parent and child based on the returned identifier.
4. \`getpid()\` returns the current process's PID, while \`getppid()\` returns the parent process PID.`,
    result: "Successfully created a child process using the fork() system call and observed distinct concurrent execution paths in parent and child.",
    vivaQuestions: [
      { q: "What does fork() return on failure?", a: "It returns -1, and errno is set to describe the error." },
      { q: "What is Copy-on-Write (COW)?", a: "COW is an optimization where child shares parent memory pages until one of them modifies a page, avoiding unnecessary duplicate memory allocation." },
      { q: "Can a child process outlive its parent?", a: "Yes. If the parent terminates first, the child becomes an 'orphan process' and is re-parented to process 1 (init or systemd)." }
    ]
  },
  {
    id: 2,
    unit: 1,
    unitTitle: "Introduction to Operating System and Process Management",
    title: "Implementation of Process Termination Using the exit() System Call",
    shortTitle: "Process Termination with exit()",
    category: "Process Management",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To demonstrate normal and abnormal process termination using the exit() system call and inspect exit status codes in Linux.",
    problemStatement: "Write a C++ program in Linux to demonstrate process termination using `exit()`. Create a child process that performs a task and terminates with a specific exit code (e.g., 42). Have the parent process catch the child's exit status using `wait()` and inspect macros like `WIFEXITED()` and `WEXITSTATUS()`.",
    theory: `Process termination marks the end of a process's lifecycle. A process can terminate voluntarily by calling \`exit()\` or \`_exit()\`, or returning from \`main()\`.

### Lifecycle of Termination:
1. When \`exit(status)\` is called, standard C I/O buffers are flushed and files are closed. Registered exit handlers (\`atexit\`) execute.
2. The OS frees memory, open file descriptors, and CPU allocations.
3. The process enters the **Zombie (Defunct)** state, preserving its Process Control Block (PCB) entry containing the termination status.
4. The parent process calls \`wait()\` or \`waitpid()\` to read this status code, after which the OS completely deallocates the PCB.

### POSIX Inspection Macros:
- \`WIFEXITED(status)\`: Returns true if the child process terminated normally.
- \`WEXITSTATUS(status)\`: Extracts the 8-bit exit code (0–255) passed by the child to \`exit()\`.`,
    algorithm: [
      "1. Start the program and include <iostream>, <cstdlib>, <unistd.h>, and <sys/wait.h>.",
      "2. Call `fork()` to create a child process.",
      "3. In the Child process (`pid == 0`):",
      "   a. Print that child is working on a computation.",
      "   b. Choose an explicit termination code (e.g., 42).",
      "   c. Call `exit(42)` to exit immediately.",
      "4. In the Parent process (`pid > 0`):",
      "   a. Call `wait(&status)` to block until the child terminates and capture its status word.",
      "   b. Verify if `WIFEXITED(status)` is true.",
      "   c. Print the exact exit code retrieved via `WEXITSTATUS(status)`.",
      "5. End the parent program with `exit(0)`."
    ],
    flowchart: `flowchart TD
    A([Start Program]) --> B[Fork Child Process]
    B --> C{pid == 0 ?}
    C -->|Yes: Child| D[Child performs work]
    D --> E["Call exit(42)"]
    E --> F[Child becomes Zombie until reaped]
    C -->|No: Parent| G["Parent calls wait(&status)"]
    F -.-> G
    G --> H["Check WIFEXITED(status)"]
    H --> I["Extract WEXITSTATUS(status) = 42"]
    I --> J[Parent concludes and exits]
    J --> K([End])`,
    code: `// Practical 2: Process Termination Using exit() and status retrieval
// Platform: Linux (g++ compiler)
#include <iostream>
#include <cstdlib>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 2 - exit() Demo" << endl;
    cout << "==========================================" << endl;

    pid_t pid = fork();

    if (pid < 0) {
        cerr << "Error: Fork failed!" << endl;
        return 1;
    }
    else if (pid == 0) {
        // Child Process
        cout << "[CHILD] Running process PID: " << getpid() << endl;
        cout << "[CHILD] Doing simulated task..." << endl;
        
        int exitCode = 42;
        cout << "[CHILD] Completed task. Exiting intentionally with status code: " << exitCode << endl;
        
        // Terminate process with explicit code
        exit(exitCode);

        // Code here will never be executed
        cout << "[CHILD] This line will never execute." << endl;
    }
    else {
        // Parent Process
        cout << "[PARENT] Waiting for child (PID: " << pid << ") to terminate..." << endl;
        
        int status;
        pid_t terminatedPid = wait(&status);

        cout << "[PARENT] Child process with PID " << terminatedPid << " has terminated." << endl;

        // Inspect termination status
        if (WIFEXITED(status)) {
            int childExitStatus = WEXITSTATUS(status);
            cout << "[PARENT] Normal termination confirmed (WIFEXITED = true)." << endl;
            cout << "[PARENT] Child reported Exit Code: " << childExitStatus << endl;
        } else if (WIFSIGNALED(status)) {
            cout << "[PARENT] Child killed by signal: " << WTERMSIG(status) << endl;
        }

        cout << "[PARENT] Reaping complete. Parent exiting normally." << endl;
    }

    return 0;
}`,
    sampleInput: "None (Demonstration of exit codes)",
    sampleOutput: `==========================================
 OS Lab: Practical 2 - exit() Demo
==========================================
[PARENT] Waiting for child (PID: 3412) to terminate...
[CHILD] Running process PID: 3412
[CHILD] Doing simulated task...
[CHILD] Completed task. Exiting intentionally with status code: 42
[PARENT] Child process with PID 3412 has terminated.
[PARENT] Normal termination confirmed (WIFEXITED = true).
[PARENT] Child reported Exit Code: 42
[PARENT] Reaping complete. Parent exiting normally.`,
    explanation: `1. \`exit(42)\` terminates the calling child process, flushes I/O streams, and informs the Linux kernel.
2. The exit status code is an 8-bit integer (range 0 to 255).
3. The parent waits for the child using \`wait(&status)\`, which blocks until the child changes state.
4. \`WIFEXITED(status)\` returns non-zero if the process terminated normally via \`exit\` or \`return\`.
5. \`WEXITSTATUS(status)\` masks out the low-order 8 bits to extract the exit integer code 42.`,
    result: "Demonstrated voluntary process termination using exit() and verified status retrieval in the parent using POSIX wait macros.",
    vivaQuestions: [
      { q: "What is a Zombie Process?", a: "A process that has finished execution via exit(), but its entry still remains in the process table because the parent has not yet read its exit status with wait()." },
      { q: "What is the difference between exit() and _exit()?", a: "exit() flushes stdio buffers and calls registered atexit functions; _exit() is a bare kernel syscall that terminates immediately without user-space buffer flushing." },
      { q: "What range of values can be returned by WEXITSTATUS?", a: "0 to 255 (the lower 8 bits of the status integer)." }
    ]
  },
  {
    id: 3,
    unit: 1,
    unitTitle: "Introduction to Operating System and Process Management",
    title: "Implementation of Process Replacement Using the exec() System Call Family",
    shortTitle: "Process Replacement with exec()",
    category: "Process Management",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To demonstrate replacing the current process memory image with a new executable program using the exec() family of system calls.",
    problemStatement: "Write a C++ program in Linux to fork a child process, and in the child process, use `execlp()` or `execvp()` to execute an external Linux binary (e.g. `/bin/ls` or `/bin/echo`). Observe that the child process address space is completely overwritten.",
    theory: `The \`exec()\` family of functions replaces the current process image with a new process image loaded from a binary executable file.

### Key Characteristics:
1. Unlike \`fork()\` which creates a new process, \`exec()\` does **not** create a new PID. The PID remains identical, but the text, data, heap, and stack segments are wiped clean and replaced with the new executable.
2. If \`exec()\` succeeds, it **never returns** to the calling code because the previous program code ceases to exist in memory.
3. If \`exec()\` fails (e.g. file not found, permission denied), it returns \`-1\` and sets \`errno\`.

### Variants in the exec family:
- **l vs v**: \`l\` takes a comma-separated argument list; \`v\` takes an array (vector) of pointers.
- **p**: \`p\` searches the system \`PATH\` environment variable for the executable name.
- **e**: \`e\` accepts an array of custom environment variables.`,
    algorithm: [
      "1. Start the program and include <iostream>, <unistd.h>, and <sys/wait.h>.",
      "2. Call `fork()` to split execution.",
      "3. If in Child process (`pid == 0`):",
      "   a. Print child PID before calling exec.",
      "   b. Call `execlp(\"ls\", \"ls\", \"-l\", NULL)` or `execlp(\"echo\", \"echo\", ...)`.",
      "   c. Add an error statement right after the exec call. If reached, exec failed.",
      "4. If in Parent process (`pid > 0`):",
      "   a. Call `wait(NULL)` to wait for child's new image to finish.",
      "   b. Print that child replacement and execution finished.",
      "5. End program."
    ],
    flowchart: `flowchart TD
    A([Start Program]) --> B[Fork Child Process]
    B --> C{pid == 0 ?}
    C -->|Child| D["Call execlp('ls', 'ls', '-l', NULL)"]
    D --> E{Did exec succeed?}
    E -->|Yes| F["Entire Child Memory Overwritten<br/>Executes 'ls' binary with same PID"]
    E -->|No| G[Returns -1: Print error & exit]
    C -->|Parent| H[Parent calls wait]
    F --> I[External command finishes]
    I --> H
    H --> J[Parent resumes and concludes]
    J --> K([End])`,
    code: `// Practical 3: Process Replacement Using execlp()
// Platform: Linux (g++ compiler)
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 3 - exec() Family Demo" << endl;
    cout << "==========================================" << endl;

    cout << "[PARENT] Current Process PID: " << getpid() << endl;
    cout << "[PARENT] Spawning child to execute Linux command 'echo' via execlp()..." << endl;

    pid_t pid = fork();

    if (pid < 0) {
        cerr << "Error: Fork failed!" << endl;
        return 1;
    }
    else if (pid == 0) {
        // Child Process
        cout << "[CHILD] Before exec: Child PID is " << getpid() << endl;
        cout << "[CHILD] Calling execlp to replace this program with '/bin/echo'..." << endl;

        // Replace child image with 'echo'
        // Arguments: file, arg0, arg1, arg2, ..., NULL
        execlp("echo", "echo", ">>> [EXEC OUTPUT] Successfully replaced process image with 'echo'! <<<", NULL);

        // If execlp succeeds, this line is NEVER reached
        perror("execlp failed");
        return 1;
    }
    else {
        // Parent Process
        int status;
        wait(&status);
        cout << "[PARENT] Child process finished execution." << endl;
        cout << "[PARENT] Process replacement demonstration complete." << endl;
    }

    return 0;
}`,
    sampleInput: "None (Executes external command)",
    sampleOutput: `==========================================
 OS Lab: Practical 3 - exec() Family Demo
==========================================
[PARENT] Current Process PID: 4501
[PARENT] Spawning child to execute Linux command 'echo' via execlp()...
[CHILD] Before exec: Child PID is 4502
[CHILD] Calling execlp to replace this program with '/bin/echo'...
>>> [EXEC OUTPUT] Successfully replaced process image with 'echo'! <<<
[PARENT] Child process finished execution.
[PARENT] Process replacement demonstration complete.`,
    explanation: `1. \`execlp("echo", "echo", "message", NULL)\` searches \`$PATH\` for executable \`echo\`.
2. The current child process image (PID 4502) is completely replaced in RAM by \`echo\`.
3. The lines following \`execlp\` are dead code unless the system call encounters an error (like non-existent file).
4. The parent waits until the newly loaded program finishes execution.`,
    result: "Demonstrated process replacement using the execlp() system call and observed that the process address space is completely overwritten.",
    vivaQuestions: [
      { q: "Does exec() change the Process ID?", a: "No, the PID remains identical; only the memory space, text, and data segments are replaced." },
      { q: "Why must the argument list in execlp terminate with NULL?", a: "Because exec functions use NULL as a sentinel value to determine the end of variable arguments." },
      { q: "When does exec() return?", a: "Only on failure (-1). On success it never returns because the original program is overwritten." }
    ]
  },
  {
    id: 4,
    unit: 1,
    unitTitle: "Introduction to Operating System and Process Management",
    title: "Retrieve Process Information Using the getpid() and getppid() System Calls",
    shortTitle: "Process IDs with getpid() & getppid()",
    category: "Process Management",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To retrieve and display process identification numbers (PID and PPID) for current and parent processes in Linux.",
    problemStatement: "Write a C++ program in Linux to demonstrate the retrieval of Process ID (PID) and Parent Process ID (PPID) using `getpid()` and `getppid()`. Create a parent-child relationship and verify that the child's PPID matches the parent's PID.",
    theory: `In Linux and Unix-like operating systems, every active process is assigned a unique non-negative integer identifier known as the **PID (Process ID)**.

### Key Identifiers:
1. **PID (Process ID)**: Unique identification number assigned by the OS kernel upon process creation.
2. **PPID (Parent Process ID)**: The PID of the parent process that invoked \`fork()\` to create the current process.
3. **Init / Systemd Process**: The root ancestor process having PID 1.
4. **\`getpid()\`**: Returns the PID of the calling process (\`pid_t\`). Always succeeds.
5. **\`getppid()\`**: Returns the PID of the calling process's parent (\`pid_t\`). Always succeeds.`,
    algorithm: [
      "1. Start program and include <iostream>, <unistd.h>, and <sys/types.h>.",
      "2. Display the initial process's PID and its parent's PID (usually the shell or IDE runner).",
      "3. Call `fork()` to create a child process.",
      "4. In Parent process:",
      "   a. Print Parent's PID (`getpid()`).",
      "   b. Print Parent's PPID (`getppid()`).",
      "   c. Print Child's PID returned by `fork()`.",
      "5. In Child process:",
      "   a. Print Child's PID (`getpid()`).",
      "   b. Print Child's PPID (`getppid()`).",
      "   c. Verify that Child's PPID equals Parent's PID.",
      "6. Parent calls `wait(NULL)` to reap child cleanly."
    ],
    flowchart: `flowchart TD
    A([Start Program]) --> B["Print Initial PID & PPID"]
    B --> C[Call fork]
    C --> D{Check PID}
    D -->|pid == 0 : Child| E["Call getpid() (Child's ID)<br/>Call getppid() (Parent's ID)"]
    D -->|pid > 0 : Parent| F["Call getpid() (Parent's ID)<br/>Print fork return value (Child PID)"]
    E --> G[Verify Child PPID == Parent PID]
    F --> H[wait for child]
    G --> H
    H --> I([End Program])`,
    code: `// Practical 4: Retrieve Process Info using getpid() and getppid()
// Platform: Linux (g++ compiler)
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 4 - getpid() & getppid()" << endl;
    cout << "==========================================" << endl;

    cout << "[INITIAL PROCESS]" << endl;
    cout << "  Process PID:  " << getpid() << endl;
    cout << "  Terminal/Shell PPID: " << getppid() << endl << endl;

    pid_t pid = fork();

    if (pid < 0) {
        cerr << "Fork failed!" << endl;
        return 1;
    }
    else if (pid == 0) {
        // Child process
        cout << "[CHILD PROCESS]" << endl;
        cout << "  My PID (getpid()):         " << getpid() << endl;
        cout << "  My Parent PID (getppid()): " << getppid() << endl;
        cout << "  Status: Child acknowledges parent process." << endl << endl;
    }
    else {
        // Parent process
        cout << "[PARENT PROCESS]" << endl;
        cout << "  My PID (getpid()):         " << getpid() << endl;
        cout << "  My Parent PID (getppid()): " << getppid() << endl;
        cout << "  Spawned Child PID:         " << pid << endl << endl;

        // Wait for child to finish
        wait(NULL);
        cout << "[PARENT] Child process reaped successfully." << endl;
    }

    return 0;
}`,
    sampleInput: "None (System query demonstration)",
    sampleOutput: `==========================================
 OS Lab: Practical 4 - getpid() & getppid()
==========================================
[INITIAL PROCESS]
  Process PID:  5820
  Terminal/Shell PPID: 1840

[PARENT PROCESS]
  My PID (getpid()):         5820
  My Parent PID (getppid()): 1840
  Spawned Child PID:         5821

[CHILD PROCESS]
  My PID (getpid()):         5821
  My Parent PID (getppid()): 5820
  Status: Child acknowledges parent process.

[PARENT] Child process reaped successfully.`,
    explanation: `1. \`getpid()\` returns the caller's unique Process ID.
2. \`getppid()\` returns the parent process's PID. Before fork, the parent process's PPID is the shell that executed the binary.
3. In the child process, \`getppid()\` matches the parent's \`getpid()\` (5820).
4. The parent waits with \`wait(NULL)\` to guarantee orderly console output and prevent zombie creation.`,
    result: "Successfully retrieved and validated process identification numbers (PID and PPID) using getpid() and getppid() system calls.",
    vivaQuestions: [
      { q: "What is the return type of getpid()?", a: "pid_t, which is an integer type defined in <sys/types.h>." },
      { q: "Can getpid() or getppid() fail?", a: "No, both system calls are always successful and return valid IDs." },
      { q: "What is PID 1 in Linux?", a: "PID 1 is the 'init' process or 'systemd', the ancestor of all user space processes." }
    ]
  },
  {
    id: 5,
    unit: 1,
    unitTitle: "Introduction to Operating System and Process Management",
    title: "Demonstration of Process Synchronization Using the wait() System Call",
    shortTitle: "Process Synchronization with wait()",
    category: "Process Management",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To demonstrate process synchronization between parent and child processes using the wait() system call in Linux.",
    problemStatement: "Write a C++ program in Linux where a parent process spawns a child process. The child process simulates work using `sleep()`. The parent process uses `wait()` to block execution until the child finishes, thereby establishing temporal synchronization and preventing race conditions or zombie processes.",
    theory: `Concurrent processes run independently and asynchronously unless explicitly synchronized. 

### Synchronization with \`wait()\`:
1. When a parent process calls \`wait(&status)\`, its execution is suspended (blocked) until any one of its child processes terminates.
2. If a child has already terminated and become a zombie, \`wait()\` reaps it immediately and returns without blocking.
3. If the calling process has no children, \`wait()\` immediately returns \`-1\` with \`errno = ECHILD\`.

### Preventing Undesirable States:
- **Prevents Zombie Processes**: Reclaims the PCB entry of dead child processes.
- **Prevents Race Conditions**: Ensures the parent doesn't proceed to subsequent operations before child calculations or resource preparations are finished.`,
    algorithm: [
      "1. Start the program and include headers <iostream>, <unistd.h>, and <sys/wait.h>.",
      "2. Spawn a child process using `fork()`.",
      "3. In the Child process (`pid == 0`):",
      "   a. Print message stating task start.",
      "   b. Simulate time-consuming task with `sleep(2)`.",
      "   c. Print task completion and call `exit(0)`.",
      "4. In the Parent process (`pid > 0`):",
      "   a. Print that parent is now waiting for child to complete.",
      "   b. Call `wait(&status)` to block parent.",
      "   c. When `wait()` unblocks, print confirmation that child has terminated.",
      "   d. Parent continues with final report.",
      "5. Terminate program."
    ],
    flowchart: `flowchart TD
    A([Start Program]) --> B[Fork Child Process]
    B --> C{pid == 0 ?}
    C -->|Yes: Child| D["Child starts task<br/>Calls sleep(2)"]
    D --> E[Child completes work]
    E --> F[Child calls exit]
    C -->|No: Parent| G["Parent invokes wait(&status)<br/>Parent transitions to BLOCKED state"]
    G -. Paused until child exits .-> F
    F --> H["Kernel wakes up Parent<br/>wait() returns child PID"]
    H --> I[Parent completes execution]
    I --> J([End])`,
    code: `// Practical 5: Process Synchronization Using wait()
// Platform: Linux (g++ compiler)
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 5 - wait() Synchronization" << endl;
    cout << "==========================================" << endl;

    cout << "[PARENT] Process PID: " << getpid() << " creating child..." << endl;
    pid_t pid = fork();

    if (pid < 0) {
        cerr << "Fork failed!" << endl;
        return 1;
    }
    else if (pid == 0) {
        // Child Process
        cout << "[CHILD] Child PID: " << getpid() << " started working." << endl;
        cout << "[CHILD] Simulating intensive calculation (sleeping 2 seconds)..." << endl;
        
        sleep(2); // Simulated latency
        
        cout << "[CHILD] Work finished. Terminating now." << endl;
        return 10; // Returning code 10
    }
    else {
        // Parent Process
        cout << "[PARENT] Parent waiting synchronously for child (PID: " << pid << ") to complete..." << endl;
        
        int status;
        pid_t completed_pid = wait(&status);

        cout << "[PARENT] Received notification! Child " << completed_pid << " has finished." << endl;

        if (WIFEXITED(status)) {
            cout << "[PARENT] Child exited normally with code: " << WEXITSTATUS(status) << endl;
        }

        cout << "[PARENT] Parent resumes execution and safely wraps up." << endl;
    }

    return 0;
}`,
    sampleInput: "None (Synchronization timing demonstration)",
    sampleOutput: `==========================================
 OS Lab: Practical 5 - wait() Synchronization
==========================================
[PARENT] Process PID: 6120 creating child...
[PARENT] Parent waiting synchronously for child (PID: 6121) to complete...
[CHILD] Child PID: 6121 started working.
[CHILD] Simulating intensive calculation (sleeping 2 seconds)...
[CHILD] Work finished. Terminating now.
[PARENT] Received notification! Child 6121 has finished.
[PARENT] Child exited normally with code: 10
[PARENT] Parent resumes execution and safely wraps up.`,
    explanation: `1. The parent calls \`wait(&status)\`, causing the OS to place the parent process in the BLOCKED / WAITING queue.
2. The child process continues execution, sleeps for 2 seconds, and exits.
3. Upon child termination, the kernel issues a \`SIGCHLD\` signal, waking the parent and passing the child's termination status.
4. This ensures strict sequential order: the parent will never execute its wrap-up code before the child has completed its task.`,
    result: "Demonstrated synchronous coordination of parent and child processes using the wait() system call, preventing race conditions and zombie processes.",
    vivaQuestions: [
      { q: "What does wait() return if the calling process has no children?", a: "It returns -1 immediately and sets errno to ECHILD." },
      { q: "What is the difference between wait() and waitpid()?", a: "wait() blocks for any child to terminate, whereas waitpid() can wait for a specific PID and supports non-blocking operation (WNOHANG)." },
      { q: "What signal is sent to the parent when a child terminates?", a: "The SIGCHLD signal." }
    ]
  }
];
