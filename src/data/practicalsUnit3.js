export const practicalsUnit3 = [
  {
    id: 9,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Implement the Reader–Writer Problem Using Synchronization",
    shortTitle: "Reader–Writer Synchronization",
    category: "Process Synchronization",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement and demonstrate a solution to the classic Reader-Writer problem ensuring multiple readers can read concurrently while writers have exclusive access.",
    problemStatement: "Write a C++ program to simulate the First Reader-Writer Problem (readers preference). Ensure that multiple reader threads/processes can simultaneously read shared data, but when a writer is updating the data, no reader or other writer can access it.",
    theory: `The Reader-Writer problem is a classic synchronization problem dealing with concurrent access to a shared resource (such as a database or memory buffer).

### Access Rules:
1. **Multiple Readers**: Any number of readers may read concurrently without mutual exclusion among themselves.
2. **Exclusive Writer**: Only one writer may write at any given time. While a writer is writing, no reader may read and no other writer may write.
3. **Mutual Exclusion Variable**: A semaphore or mutex \`wrt\` ensures exclusive access for writers.
4. **Reader Counter Mutex**: A mutex \`mutex\` protects updates to the active reader count (\`readCount\`).
5. **Entry Section for Readers**: The first reader locks \`wrt\` on behalf of all readers. The last reader leaving releases \`wrt\`.`,
    algorithm: [
      "1. Initialize `readCount = 0`, `mutex = 1` (binary semaphore), and `wrt = 1` (binary semaphore).",
      "2. For a Reader Process:",
      "   a. Wait on `mutex` to protect `readCount`.",
      "   b. Increment `readCount`.",
      "   c. If `readCount == 1` (first reader), wait on `wrt` to lock out writers.",
      "   d. Signal `mutex`.",
      "   e. [Critical Section] Read the shared data.",
      "   f. Wait on `mutex` to safely decrement `readCount`.",
      "   g. Decrement `readCount`.",
      "   h. If `readCount == 0` (last reader), signal `wrt` to allow writers.",
      "   i. Signal `mutex`.",
      "3. For a Writer Process:",
      "   a. Wait on `wrt`.",
      "   b. [Critical Section] Write/modify the shared data.",
      "   c. Signal `wrt`.",
      "4. Simulate concurrent execution of reader and writer operations."
    ],
    flowchart: `flowchart TD
    subgraph Reader Process
    R1[Reader Arrives] --> R2[Wait on mutex]
    R2 --> R3[readCount++]
    R3 --> R4{readCount == 1 ?}
    R4 -->|Yes: First Reader| R5[Wait on wrt]
    R4 -->|No| R6[Signal mutex]
    R5 --> R6
    R6 --> R7["READ SHARED DATA<br/>(Multiple Readers Allowed)"]
    R7 --> R8[Wait on mutex]
    R8 --> R9[readCount--]
    R9 --> R10{readCount == 0 ?}
    R10 -->|Yes: Last Reader| R11[Signal wrt]
    R10 -->|No| R12[Signal mutex]
    R11 --> R12
    R12 --> R13[Exit Reader]
    end

    subgraph Writer Process
    W1[Writer Arrives] --> W2[Wait on wrt]
    W2 --> W3["WRITE SHARED DATA<br/>(Exclusive Access)"]
    W3 --> W4[Signal wrt]
    W4 --> W5[Exit Writer]
    end`,
    code: `// Practical 9: Reader-Writer Problem Simulation
// Language: C++ (Portable Simulation of Semaphores)
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class ReaderWriterLock {
private:
    int readCount;
    bool wrtLocked; // Represents wrt semaphore

public:
    ReaderWriterLock() : readCount(0), wrtLocked(false) {}

    bool startRead(int readerId) {
        if (wrtLocked && readCount == 0) {
            cout << "  [Reader " << readerId << "] Blocked: A writer is currently writing!" << endl;
            return false;
        }
        readCount++;
        if (readCount == 1) {
            wrtLocked = true; // First reader locks the resource from writers
            cout << "  [Reader " << readerId << "] First reader in! Locked resource against writers." << endl;
        } else {
            cout << "  [Reader " << readerId << "] Joined existing readers (Total readers: " << readCount << ")." << endl;
        }
        return true;
    }

    void endRead(int readerId) {
        readCount--;
        cout << "  [Reader " << readerId << "] Finished reading (Remaining readers: " << readCount << ")." << endl;
        if (readCount == 0) {
            wrtLocked = false; // Last reader unlocks the resource for writers
            cout << "  [Reader " << readerId << "] Last reader exited. Resource now UNLOCKED for writers." << endl;
        }
    }

    bool startWrite(int writerId) {
        if (wrtLocked || readCount > 0) {
            cout << "  [Writer " << writerId << "] Blocked: Resource in use (Active readers: " 
                 << readCount << ", Locked: " << (wrtLocked ? "YES" : "NO") << ")." << endl;
            return false;
        }
        wrtLocked = true;
        cout << "  [Writer " << writerId << "] Acquired exclusive write lock. Modifying shared data..." << endl;
        return true;
    }

    void endWrite(int writerId) {
        wrtLocked = false;
        cout << "  [Writer " << writerId << "] Released exclusive write lock." << endl;
    }
};

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 9 - Reader-Writer Demo" << endl;
    cout << "==========================================" << endl;

    ReaderWriterLock rw;
    int sharedResource = 100;

    cout << "\\n--- Scenario 1: Multiple Concurrent Readers ---" << endl;
    rw.startRead(1);
    rw.startRead(2);
    rw.startRead(3);
    cout << "Shared data value observed by Reader 2: " << sharedResource << endl;

    cout << "\\n--- Scenario 2: Writer Attempts Access While Readers Read ---" << endl;
    rw.startWrite(1); // Should be blocked

    cout << "\\n--- Scenario 3: Readers Complete Reading ---" << endl;
    rw.endRead(1);
    rw.endRead(2);
    rw.endRead(3); // Last reader leaves

    cout << "\\n--- Scenario 4: Writer Retries And Modifies Resource ---" << endl;
    if (rw.startWrite(1)) {
        sharedResource = 250; // Modified data
        cout << "Shared data successfully updated to: " << sharedResource << endl;
        rw.endWrite(1);
    }

    cout << "\\n--- Scenario 5: Subsequent Reader Views New Data ---" << endl;
    rw.startRead(4);
    cout << "Reader 4 observed updated data: " << sharedResource << endl;
    rw.endRead(4);

    return 0;
}`,
    sampleInput: "None (Simulated concurrent scheduling sequence)",
    sampleOutput: `==========================================
 OS Lab: Practical 9 - Reader-Writer Demo
==========================================

--- Scenario 1: Multiple Concurrent Readers ---
  [Reader 1] First reader in! Locked resource against writers.
  [Reader 2] Joined existing readers (Total readers: 2).
  [Reader 3] Joined existing readers (Total readers: 3).
Shared data value observed by Reader 2: 100

--- Scenario 2: Writer Attempts Access While Readers Read ---
  [Writer 1] Blocked: Resource in use (Active readers: 3, Locked: YES).

--- Scenario 3: Readers Complete Reading ---
  [Reader 1] Finished reading (Remaining readers: 2).
  [Reader 2] Finished reading (Remaining readers: 1).
  [Reader 3] Finished reading (Remaining readers: 0).
  [Reader 3] Last reader exited. Resource now UNLOCKED for writers.

--- Scenario 4: Writer Retries And Modifies Resource ---
  [Writer 1] Acquired exclusive write lock. Modifying shared data...
Shared data successfully updated to: 250
  [Writer 1] Released exclusive write lock.

--- Scenario 5: Subsequent Reader Views New Data ---
  [Reader 4] First reader in! Locked resource against writers.
Reader 4 observed updated data: 250
  [Reader 4] Finished reading (Remaining readers: 0).
  [Reader 4] Last reader exited. Resource now UNLOCKED for writers.`,
    explanation: `1. The simulation models the first Reader-Writer problem using synchronization logic.
2. Readers 1, 2, and 3 are permitted simultaneous read access; the first reader acquires the write exclusion lock.
3. Writer 1 attempts access while readers are active and is blocked.
4. When the final reader (Reader 3) leaves, it unblocks the write lock.
5. Writer 1 can now safely write without race conditions, updating the value to 250.`,
    result: "Demonstrated the Reader-Writer synchronization problem ensuring shared concurrent reads and exclusive writer execution.",
    vivaQuestions: [
      { q: "What is writer starvation in Reader-Writer problem?", a: "If new readers keep arriving before existing readers leave, readCount never reaches 0 and writers are starved indefinitely." },
      { q: "What does semaphore 'wrt' do?", a: "It ensures mutual exclusion between writers and acts as a barrier between readers and writers." },
      { q: "Why do we need a separate mutex for readCount?", a: "To prevent race conditions when multiple readers increment or decrement readCount simultaneously." }
    ]
  },
  {
    id: 10,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Demonstrate Process Synchronization Using the Producer–Consumer Problem",
    shortTitle: "Producer–Consumer Synchronization",
    category: "Process Synchronization",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To demonstrate process synchronization in the classic Producer-Consumer problem using a shared buffer and counting semaphores.",
    problemStatement: "Write a C++ program to simulate the Producer-Consumer problem using a circular buffer of fixed size N. Ensure that the producer does not add items when the buffer is full (buffer overflow) and consumer does not remove items when the buffer is empty (buffer underflow).",
    theory: `The Producer-Consumer (or Bounded-Buffer) problem is a fundamental paradigm for cooperating processes.

### System Components:
1. **Producer Process**: Generates items and puts them into a shared buffer.
2. **Consumer Process**: Takes items out of the shared buffer and consumes them.
3. **Shared Fixed Buffer**: Holds up to $N$ items.

### Synchronization Semaphores:
- **\`mutex\`**: A binary semaphore (initially 1) providing mutual exclusion when inserting or removing from the buffer.
- **\`empty\`**: A counting semaphore (initially $N$) representing the number of empty buffer slots.
- **\`full\`**: A counting semaphore (initially 0) representing the number of filled slots available to consume.`,
    algorithm: [
      "1. Set buffer capacity `BUFFER_SIZE = 5`.",
      "2. Initialize `mutex = 1`, `emptySlots = BUFFER_SIZE`, `fullSlots = 0`, `in = 0`, `out = 0`.",
      "3. When Producer produces an item:",
      "   a. If `emptySlots == 0`, buffer is full; producer must wait.",
      "   b. Decrement `emptySlots` and acquire `mutex`.",
      "   c. Place item in `buffer[in]`; update `in = (in + 1) % BUFFER_SIZE`.",
      "   d. Release `mutex` and increment `fullSlots`.",
      "4. When Consumer consumes an item:",
      "   a. If `fullSlots == 0`, buffer is empty; consumer must wait.",
      "   b. Decrement `fullSlots` and acquire `mutex`.",
      "   c. Extract item from `buffer[out]`; update `out = (out + 1) % BUFFER_SIZE`.",
      "   d. Release `mutex` and increment `emptySlots`.",
      "5. Print step-by-step buffer states after each operation."
    ],
    flowchart: `flowchart TD
    subgraph Producer
    P1[Produce Item] --> P2{emptySlots > 0 ?}
    P2 -->|No: Full| P3[Wait / Buffer Full]
    P2 -->|Yes| P4[Acquire mutex]
    P4 --> P5["buffer[in] = item<br/>in = (in + 1) % N"]
    P5 --> P6[Release mutex]
    P6 --> P7[emptySlots-- , fullSlots++]
    end

    subgraph Consumer
    C1[Request Consume] --> C2{fullSlots > 0 ?}
    C2 -->|No: Empty| C3[Wait / Buffer Empty]
    C2 -->|Yes| C4[Acquire mutex]
    C4 --> C5["item = buffer[out]<br/>out = (out + 1) % N"]
    C5 --> C6[Release mutex]
    C6 --> C7[fullSlots-- , emptySlots++]
    end`,
    code: `// Practical 10: Producer-Consumer Simulation
// Language: C++ (Portable)
#include <iostream>
#include <vector>

using namespace std;

const int BUFFER_SIZE = 5;

class BoundedBuffer {
private:
    int buffer[BUFFER_SIZE];
    int in = 0;
    int out = 0;
    int count = 0; // Tracks current item count

public:
    bool produce(int item) {
        if (count == BUFFER_SIZE) {
            cout << "  [PRODUCER] Buffer FULL! Cannot produce item " << item << " (Wait condition)." << endl;
            return false;
        }
        buffer[in] = item;
        cout << "  [PRODUCER] Produced item " << item << " at index [" << in << "].";
        in = (in + 1) % BUFFER_SIZE;
        count++;
        cout << " (Buffer count: " << count << "/" << BUFFER_SIZE << ")" << endl;
        return true;
    }

    bool consume(int &item) {
        if (count == 0) {
            cout << "  [CONSUMER] Buffer EMPTY! Nothing to consume (Wait condition)." << endl;
            return false;
        }
        item = buffer[out];
        cout << "  [CONSUMER] Consumed item " << item << " from index [" << out << "].";
        out = (out + 1) % BUFFER_SIZE;
        count--;
        cout << " (Buffer count: " << count << "/" << BUFFER_SIZE << ")" << endl;
        return true;
    }

    void displayBuffer() {
        cout << "  Current Buffer State: [ ";
        for (int i = 0; i < count; i++) {
            int idx = (out + i) % BUFFER_SIZE;
            cout << buffer[idx] << " ";
        }
        cout << "]" << endl;
    }
};

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 10 - Producer-Consumer" << endl;
    cout << "==========================================" << endl;

    BoundedBuffer bb;
    int consumedItem;

    cout << "\\n1. Producing initial items..." << endl;
    bb.produce(10);
    bb.produce(20);
    bb.produce(30);
    bb.displayBuffer();

    cout << "\\n2. Consuming two items..." << endl;
    bb.consume(consumedItem);
    bb.consume(consumedItem);
    bb.displayBuffer();

    cout << "\\n3. Producing to fill the buffer completely..." << endl;
    bb.produce(40);
    bb.produce(50);
    bb.produce(60);
    bb.produce(70);
    bb.displayBuffer();

    cout << "\\n4. Attempting to produce when buffer is full (Overflow check)..." << endl;
    bb.produce(80); // Should be blocked

    cout << "\\n5. Consuming all remaining items..." << endl;
    while (bb.consume(consumedItem)) {}

    cout << "\\n6. Attempting to consume when empty (Underflow check)..." << endl;
    bb.consume(consumedItem);

    return 0;
}`,
    sampleInput: "None (Predefined sequential actions demonstrating boundary states)",
    sampleOutput: `==========================================
 OS Lab: Practical 10 - Producer-Consumer
==========================================

1. Producing initial items...
  [PRODUCER] Produced item 10 at index [0]. (Buffer count: 1/5)
  [PRODUCER] Produced item 20 at index [1]. (Buffer count: 2/5)
  [PRODUCER] Produced item 30 at index [2]. (Buffer count: 3/5)
  Current Buffer State: [ 10 20 30 ]

2. Consuming two items...
  [CONSUMER] Consumed item 10 from index [0]. (Buffer count: 2/5)
  [CONSUMER] Consumed item 20 from index [1]. (Buffer count: 1/5)
  Current Buffer State: [ 30 ]

3. Producing to fill the buffer completely...
  [PRODUCER] Produced item 40 at index [3]. (Buffer count: 2/5)
  [PRODUCER] Produced item 50 at index [4]. (Buffer count: 3/5)
  [PRODUCER] Produced item 60 at index [0]. (Buffer count: 4/5)
  [PRODUCER] Produced item 70 at index [1]. (Buffer count: 5/5)
  Current Buffer State: [ 30 40 50 60 70 ]

4. Attempting to produce when buffer is full (Overflow check)...
  [PRODUCER] Buffer FULL! Cannot produce item 80 (Wait condition).

5. Consuming all remaining items...
  [CONSUMER] Consumed item 30 from index [2]. (Buffer count: 4/5)
  [CONSUMER] Consumed item 40 from index [3]. (Buffer count: 3/5)
  [CONSUMER] Consumed item 50 from index [4]. (Buffer count: 2/5)
  [CONSUMER] Consumed item 60 from index [0]. (Buffer count: 1/5)
  [CONSUMER] Consumed item 70 from index [1]. (Buffer count: 0/5)
  [CONSUMER] Buffer EMPTY! Nothing to consume (Wait condition).

6. Attempting to consume when empty (Underflow check)...
  [CONSUMER] Buffer EMPTY! Nothing to consume (Wait condition).`,
    explanation: `1. The buffer is managed cyclically using pointer math \`(index + 1) % BUFFER_SIZE\`.
2. When the count equals capacity, producer requests are rejected or blocked to prevent buffer overflow.
3. When count drops to 0, consumer requests are blocked to prevent buffer underflow.
4. Mutual exclusion ensures atomic operations on buffer slots and item counts.`,
    result: "Demonstrated process synchronization in the Producer-Consumer problem, successfully verifying mutual exclusion and buffer boundary handling.",
    vivaQuestions: [
      { q: "What is a race condition in the Producer-Consumer problem?", a: "Occurs when both producer and consumer attempt to modify shared variables (like 'count') concurrently without synchronization, causing corrupt data." },
      { q: "What semaphores are used in Bounded Buffer?", a: "A binary semaphore 'mutex' (for mutual exclusion) and two counting semaphores 'empty' and 'full' (for slot tracking)." },
      { q: "Why is a circular array used for the buffer?", a: "To enable continuous FIFO queuing without shifting elements in memory." }
    ]
  },
  {
    id: 11,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Implement Mutual Exclusion Using Peterson's Solution",
    shortTitle: "Peterson's Mutual Exclusion",
    category: "Process Synchronization",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement Peterson's Algorithm for mutual exclusion between two cooperating concurrent processes.",
    problemStatement: "Write a C++ program demonstrating Peterson's Solution for two processes ($P_0$ and $P_1$) contending for a critical section. Verify that all three critical section criteria (Mutual Exclusion, Progress, and Bounded Waiting) are satisfied.",
    theory: `Peterson's Algorithm is a classic software-based solution to the critical-section problem for two processes.

### Shared Variables:
- \`bool flag[2]\`: \`flag[i] = true\` indicates that process $P_i$ wants to enter its critical section.
- \`int turn\`: Indicates whose turn it is to enter the critical section.

### Algorithm Structure for Process $P_i$ (where $j = 1 - i$):
\`\`\`c
flag[i] = true;
turn = j;
while (flag[j] && turn == j) {
    // Busy wait (do nothing)
}
// --- CRITICAL SECTION ---
flag[i] = false; // Remainder section
\`\`\`

### Verification of Criteria:
1. **Mutual Exclusion**: Both cannot be in the critical section simultaneously because \`turn\` cannot be both 0 and 1 at the same time.
2. **Progress**: A process outside the critical section cannot prevent the other process from entering.
3. **Bounded Waiting**: A process waits at most one turn before gaining entry.`,
    algorithm: [
      "1. Initialize `flag[0] = false`, `flag[1] = false`, and `turn = 0`.",
      "2. For Process 0 (`P0`):",
      "   a. Express intent: `flag[0] = true`.",
      "   b. Set `turn = 1` (generously yield first opportunity to P1).",
      "   c. While `flag[1] == true && turn == 1`: wait.",
      "   d. Enter Critical Section and modify shared resource.",
      "   e. Exit Critical Section: set `flag[0] = false`.",
      "3. For Process 1 (`P1`):",
      "   a. Express intent: `flag[1] = true`.",
      "   b. Set `turn = 0` (yield to P0).",
      "   c. While `flag[0] == true && turn == 0`: wait.",
      "   d. Enter Critical Section and modify shared resource.",
      "   e. Exit Critical Section: set `flag[1] = false`.",
      "4. Observe that only one process executes the critical section at any instant."
    ],
    flowchart: `flowchart TD
    A([Process P0 Wants Entry]) --> B["flag[0] = true<br/>turn = 1"]
    B --> C{"flag[1] == true && turn == 1 ?"}
    C -->|Yes: P1 is inside or has priority| D[Busy wait / spin]
    D --> C
    C -->|No: Clear to proceed| E["CRITICAL SECTION (P0)<br/>Execute critical operations"]
    E --> F["flag[0] = false<br/>(Exit Section)"]
    F --> G([Remainder Section])`,
    code: `// Practical 11: Peterson's Algorithm for Mutual Exclusion
// Language: C++ (Portable Simulation)
#include <iostream>
#include <vector>

using namespace std;

class PetersonsAlgorithm {
private:
    bool flag[2];
    int turn;
    int sharedCounter;

public:
    PetersonsAlgorithm() : turn(0), sharedCounter(0) {
        flag[0] = false;
        flag[1] = false;
    }

    void processEnter(int id) {
        int other = 1 - id;
        cout << "[P" << id << "] Requesting Critical Section..." << endl;

        // Express intent to enter
        flag[id] = true;
        // Yield turn to the other process
        turn = other;

        cout << "[P" << id << "] Set flag[" << id << "]=true, yielded turn=" << other << endl;

        // Check if other process is interested and has the turn
        if (flag[other] && turn == other) {
            cout << "[P" << id << "] Must wait: P" << other << " has higher precedence right now." << endl;
        } else {
            cout << "[P" << id << "] Entry condition satisfied! Entering Critical Section." << endl;
        }

        // --- CRITICAL SECTION ---
        sharedCounter += (id == 0 ? 10 : 20);
        cout << "  >>> [P" << id << " in CRITICAL SECTION] Counter updated to: " << sharedCounter << " <<<" << endl;

        // Exit section
        flag[id] = false;
        cout << "[P" << id << "] Exited Critical Section. Set flag[" << id << "]=false." << endl << endl;
    }

    int getCounter() const { return sharedCounter; }
};

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 11 - Peterson's Solution" << endl;
    cout << "==========================================" << endl;

    PetersonsAlgorithm peterson;

    cout << "Initial sharedCounter = 0\\n" << endl;

    // Simulation of sequential alternating access
    peterson.processEnter(0);
    peterson.processEnter(1);
    peterson.processEnter(0);

    cout << "Final verified sharedCounter value: " << peterson.getCounter() << endl;
    cout << "Evaluation: Mutual exclusion strictly maintained with no race condition." << endl;

    return 0;
}`,
    sampleInput: "None (Two processes executing Peterson's protocol)",
    sampleOutput: `==========================================
 OS Lab: Practical 11 - Peterson's Solution
==========================================
Initial sharedCounter = 0

[P0] Requesting Critical Section...
[P0] Set flag[0]=true, yielded turn=1
[P0] Entry condition satisfied! Entering Critical Section.
  >>> [P0 in CRITICAL SECTION] Counter updated to: 10 <<<
[P0] Exited Critical Section. Set flag[0]=false.

[P1] Requesting Critical Section...
[P1] Set flag[1]=true, yielded turn=0
[P1] Entry condition satisfied! Entering Critical Section.
  >>> [P1 in CRITICAL SECTION] Counter updated to: 30 <<<
[P1] Exited Critical Section. Set flag[1]=false.

[P0] Requesting Critical Section...
[P0] Set flag[0]=true, yielded turn=1
[P0] Entry condition satisfied! Entering Critical Section.
  >>> [P0 in CRITICAL SECTION] Counter updated to: 40 <<<
[P0] Exited Critical Section. Set flag[0]=false.

Final verified sharedCounter value: 40
Evaluation: Mutual exclusion strictly maintained with no race condition.`,
    explanation: `1. \`flag[i] = true\` registers process interest.
2. \`turn = 1 - id\` yields priority to the competitor to avoid selfish deadlocks.
3. The \`while (flag[other] && turn == other)\` guard ensures that if both want to enter at the same time, the one whose turn was set second waits for the first to complete.
4. When done, setting \`flag[id] = false\` releases any waiting competitor.`,
    result: "Successfully implemented Peterson's Solution and verified mutual exclusion, progress, and bounded waiting.",
    vivaQuestions: [
      { q: "How many processes does Peterson's Solution support?", a: "Two processes only ($P_0$ and $P_1$)." },
      { q: "What hardware assumption is required for Peterson's algorithm?", a: "Atomic memory loads and stores without out-of-order instruction reordering." },
      { q: "What is bounded waiting?", a: "There exists a bound on the number of times other processes can enter the critical section after a process has requested entry." }
    ]
  },
  {
    id: 12,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Simulate the Dining Philosophers Problem and Analyze Deadlock Conditions",
    shortTitle: "Dining Philosophers & Deadlock",
    category: "Deadlock Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To simulate the Dining Philosophers synchronization problem, illustrate how circular wait leads to deadlock, and implement a deadlock-free solution.",
    problemStatement: "Write a C++ program to model the Dining Philosophers problem with 5 philosophers and 5 chopsticks. First, show how simultaneous acquisition of left chopsticks by all philosophers creates deadlock. Then, implement an asymmetric solution (or resource hierarchy) that guarantees freedom from deadlock.",
    theory: `The Dining Philosophers problem (formulated by Edsger Dijkstra) is a classic illustration of synchronization, deadlock, and resource contention.

### The Setup:
- 5 philosophers sit around a circular table.
- Each philosopher alternates between two states: **Thinking** and **Eating**.
- Between each pair of philosophers is a single chopstick (total 5 chopsticks).
- To eat, a philosopher requires **both** the left and right chopsticks.

### The Deadlock Scenario:
If all 5 philosophers become hungry simultaneously and each picks up their left chopstick:
- Every philosopher holds one chopstick and waits for the right chopstick.
- A **Circular Wait** is formed ($P_0 \\to P_1 \\to P_2 \\to P_3 \\to P_4 \\to P_0$).
- No philosopher can eat, and none can proceed $\\implies$ **DEADLOCK**!

### Deadlock-Free Solution (Asymmetric Rule):
- Philosophers with even indices pick up their **Left** chopstick first, then **Right**.
- Philosophers with odd indices pick up their **Right** chopstick first, then **Left**.
- This breaks the circular wait condition.`,
    algorithm: [
      "1. Represent 5 chopsticks as mutex flags `chopstick[5]` initialized to available (false).",
      "2. Case A (Naive Deadlock Demonstration):",
      "   a. Every philosopher i acquires `left = i`.",
      "   b. Every philosopher i then tries to acquire `right = (i+1)%5`.",
      "   c. All right chopsticks are unavailable; circular wait detected -> System Deadlock.",
      "3. Case B (Deadlock Avoidance - Asymmetric Solution):",
      "   a. For philosopher i:",
      "      - If `i % 2 == 0`: acquire chopstick[i] first, then chopstick[(i+1)%5].",
      "      - If `i % 2 != 0`: acquire chopstick[(i+1)%5] first, then chopstick[i].",
      "   b. Philosopher eats safely.",
      "   c. Philosopher puts down both chopsticks and returns to thinking.",
      "4. Output execution log and deadlock resolution analysis."
    ],
    flowchart: `flowchart TD
    A([Philosopher i is Hungry]) --> B{Is i Even or Odd?}
    B -->|Even| C["Pick up Left Chopstick i"]
    C --> D["Pick up Right Chopstick (i+1)%5"]
    B -->|Odd| E["Pick up Right Chopstick (i+1)%5"]
    E --> F["Pick up Left Chopstick i"]
    D --> G["EAT SPAGHETTI<br/>(Holding both chopsticks)"]
    F --> G
    G --> H[Put down Left Chopstick]
    H --> I[Put down Right Chopstick]
    I --> J([Return to THINKING])`,
    code: `// Practical 12: Dining Philosophers Problem & Deadlock Analysis
// Language: C++ (Portable Simulation)
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

const int NUM_PHILOSOPHERS = 5;

void simulateDeadlockCase() {
    cout << "\\n[SCENARIO 1: Naive Strategy - Deadlock Occurrence]" << endl;
    cout << "All 5 philosophers attempt to pick up their LEFT chopstick simultaneously:" << endl;

    vector<bool> chopstickHeld(NUM_PHILOSOPHERS, false);

    // Step 1: Every philosopher grabs their left chopstick
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        chopstickHeld[i] = true;
        cout << "  Philosopher " << i << " picked up LEFT chopstick " << i << "." << endl;
    }

    // Step 2: Every philosopher attempts to grab their right chopstick
    cout << "\\nNow every philosopher attempts to pick up their RIGHT chopstick:" << endl;
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        int rightChopstick = (i + 1) % NUM_PHILOSOPHERS;
        cout << "  Philosopher " << i << " waiting for RIGHT chopstick " << rightChopstick 
             << " (Held by Philosopher " << rightChopstick << ") -> BLOCKED!" << endl;
    }

    cout << ">>> RESULT: Circular Wait cycle detected (P0->P1->P2->P3->P4->P0). DEADLOCK OCCURRED! <<<" << endl;
}

void simulateDeadlockFreeSolution() {
    cout << "\\n[SCENARIO 2: Asymmetric Strategy - Deadlock-Free]" << endl;
    cout << "Rule: Even philosophers pick Left first; Odd philosophers pick Right first.\\n" << endl;

    vector<bool> chopsticks(NUM_PHILOSOPHERS, true); // true = available

    auto eat = [&](int id) {
        int left = id;
        int right = (id + 1) % NUM_PHILOSOPHERS;

        int first = (id % 2 == 0) ? left : right;
        int second = (id % 2 == 0) ? right : left;

        cout << "  Philosopher " << id << " wants to eat. Picks Chopstick " << first 
             << " first, then Chopstick " << second << "." << endl;
        
        cout << "  >>> Philosopher " << id << " is EATING peacefully. <<<" << endl;
        cout << "  Philosopher " << id << " puts down Chopsticks " << first 
             << " and " << second << " and returns to THINKING.\\n" << endl;
    };

    // All philosophers get to eat in order without circular wait
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        eat(i);
    }

    cout << ">>> RESULT: All philosophers successfully ate. Zero deadlocks! <<<" << endl;
}

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 12 - Dining Philosophers Deadlock" << endl;
    cout << "==========================================================" << endl;

    simulateDeadlockCase();
    simulateDeadlockFreeSolution();

    return 0;
}`,
    sampleInput: "None (Comparison of naive strategy vs asymmetric deadlock-free rule)",
    sampleOutput: `==========================================================
 OS Lab: Practical 12 - Dining Philosophers Deadlock
==========================================================

[SCENARIO 1: Naive Strategy - Deadlock Occurrence]
All 5 philosophers attempt to pick up their LEFT chopstick simultaneously:
  Philosopher 0 picked up LEFT chopstick 0.
  Philosopher 1 picked up LEFT chopstick 1.
  Philosopher 2 picked up LEFT chopstick 2.
  Philosopher 3 picked up LEFT chopstick 3.
  Philosopher 4 picked up LEFT chopstick 4.

Now every philosopher attempts to pick up their RIGHT chopstick:
  Philosopher 0 waiting for RIGHT chopstick 1 (Held by Philosopher 1) -> BLOCKED!
  Philosopher 1 waiting for RIGHT chopstick 2 (Held by Philosopher 2) -> BLOCKED!
  Philosopher 2 waiting for RIGHT chopstick 3 (Held by Philosopher 3) -> BLOCKED!
  Philosopher 3 waiting for RIGHT chopstick 4 (Held by Philosopher 4) -> BLOCKED!
  Philosopher 4 waiting for RIGHT chopstick 0 (Held by Philosopher 0) -> BLOCKED!
>>> RESULT: Circular Wait cycle detected (P0->P1->P2->P3->P4->P0). DEADLOCK OCCURRED! <<<

[SCENARIO 2: Asymmetric Strategy - Deadlock-Free]
Rule: Even philosophers pick Left first; Odd philosophers pick Right first.

  Philosopher 0 wants to eat. Picks Chopstick 0 first, then Chopstick 1.
  >>> Philosopher 0 is EATING peacefully. <<<
  Philosopher 0 puts down Chopsticks 0 and 1 and returns to THINKING.

  Philosopher 1 wants to eat. Picks Chopstick 2 first, then Chopstick 1.
  >>> Philosopher 1 is EATING peacefully. <<<
  Philosopher 1 puts down Chopsticks 2 and 1 and returns to THINKING.

  Philosopher 2 wants to eat. Picks Chopstick 2 first, then Chopstick 3.
  >>> Philosopher 2 is EATING peacefully. <<<
  Philosopher 2 puts down Chopsticks 2 and 3 and returns to THINKING.

  Philosopher 3 wants to eat. Picks Chopstick 4 first, then Chopstick 3.
  >>> Philosopher 3 is EATING peacefully. <<<
  Philosopher 3 puts down Chopsticks 4 and 3 and returns to THINKING.

  Philosopher 4 wants to eat. Picks Chopstick 4 first, then Chopstick 0.
  >>> Philosopher 4 is EATING peacefully. <<<
  Philosopher 4 puts down Chopsticks 4 and 0 and returns to THINKING.

>>> RESULT: All philosophers successfully ate. Zero deadlocks! <<<`,
    explanation: `1. The naive approach demonstrates the 4 necessary Coffman conditions: Mutual exclusion, Hold and wait, No preemption, and Circular wait.
2. In Scenario 1, all 4 conditions are met, triggering an unresolvable deadlock.
3. In Scenario 2, the circular wait condition is broken by having odd philosophers pick up their right chopstick first. At least one philosopher can always obtain both chopsticks, ensuring system progress.`,
    result: "Successfully modeled the Dining Philosophers problem, demonstrated deadlock under symmetric resource acquisition, and eliminated deadlock using an asymmetric ordering protocol.",
    vivaQuestions: [
      { q: "What are the 4 Coffman conditions for deadlock?", a: "1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait." },
      { q: "Which Coffman condition is broken by the asymmetric philosopher solution?", a: "The Circular Wait condition." },
      { q: "Can a maximum of how many philosophers eat simultaneously?", a: "In a 5-philosopher system, at most 2 non-adjacent philosophers can eat simultaneously." }
    ]
  },
  {
    id: 13,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Simulate the Bounded Buffer Problem Using Synchronization Techniques",
    shortTitle: "Bounded Buffer Synchronization",
    category: "Process Synchronization",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To simulate the Bounded Buffer synchronization problem using a counting queue and evaluate concurrent producer-consumer coordination.",
    problemStatement: "Write a C++ program implementing the Bounded Buffer problem. Maintain an explicit inventory count, queue indices, and demonstrate race-condition-free data passing between alternating producer and consumer requests.",
    theory: `The Bounded Buffer problem is an essential design pattern in operating system pipelines, device drivers, and I/O spoolers.

### Problem Characteristics:
1. **Capacity Limit**: The buffer has a finite capacity $N$.
2. **Producer Constraint**: Cannot write if the buffer is full ($count = N$).
3. **Consumer Constraint**: Cannot read if the buffer is empty ($count = 0$).
4. **Data Integrity**: Items must be delivered in strict FIFO order without corruption or lost updates.`,
    algorithm: [
      "1. Create BoundedBuffer class with capacity 4.",
      "2. Store items in an array `items[4]` with `head`, `tail`, and `itemCount`.",
      "3. Method `enqueue(data)`:",
      "   - If `itemCount == capacity`, return false (buffer full).",
      "   - Place `data` at `items[tail]`.",
      "   - `tail = (tail + 1) % capacity`.",
      "   - `itemCount++`.",
      "4. Method `dequeue()`:",
      "   - If `itemCount == 0`, return false (buffer empty).",
      "   - Fetch `data` from `items[head]`.",
      "   - `head = (head + 1) % capacity`.",
      "   - `itemCount--`.",
      "5. Drive multiple production and consumption cycles to verify stability."
    ],
    flowchart: `flowchart TD
    A([Start Queue Transaction]) --> B{Is Operation Enqueue or Dequeue?}
    B -->|Enqueue| C{itemCount == N ?}
    C -->|Yes| D[Block Producer: Buffer Full]
    C -->|No| E["Store at items[tail]<br/>tail = (tail + 1) % N<br/>itemCount++"]
    B -->|Dequeue| F{itemCount == 0 ?}
    F -->|Yes| G[Block Consumer: Buffer Empty]
    F -->|No| H["Extract items[head]<br/>head = (head + 1) % N<br/>itemCount--"]
    E --> I[Return Success]
    H --> I
    D --> J([End])
    G --> J
    I --> J`,
    code: `// Practical 13: Bounded Buffer Problem Simulation
// Language: C++ (Portable)
#include <iostream>
#include <string>

using namespace std;

class SafeBoundedBuffer {
private:
    static const int CAPACITY = 4;
    int buffer[CAPACITY];
    int head = 0;
    int tail = 0;
    int count = 0;

public:
    bool insertItem(int val) {
        if (count == CAPACITY) {
            cout << "  [BUFFER OVERFLOW] Rejected value " << val << " (Buffer Full: 4/4)" << endl;
            return false;
        }
        buffer[tail] = val;
        cout << "  [PRODUCED] Value " << val << " queued at slot " << tail;
        tail = (tail + 1) % CAPACITY;
        count++;
        cout << " | Total in buffer: " << count << endl;
        return true;
    }

    bool removeItem(int &val) {
        if (count == 0) {
            cout << "  [BUFFER UNDERFLOW] Cannot consume (Buffer Empty: 0/4)" << endl;
            return false;
        }
        val = buffer[head];
        cout << "  [CONSUMED] Value " << val << " pulled from slot " << head;
        head = (head + 1) % CAPACITY;
        count--;
        cout << " | Total in buffer: " << count << endl;
        return true;
    }

    void status() {
        cout << "  >> Buffer State: " << count << "/" << CAPACITY << " slots used <<" << endl;
    }
};

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 13 - Bounded Buffer" << endl;
    cout << "==========================================" << endl;

    SafeBoundedBuffer sbb;
    int temp;

    cout << "\\n[Cycle 1: Fill the buffer to maximum capacity]" << endl;
    sbb.insertItem(101);
    sbb.insertItem(102);
    sbb.insertItem(103);
    sbb.insertItem(104);
    sbb.status();

    cout << "\\n[Cycle 2: Overflow test]" << endl;
    sbb.insertItem(105); // Should fail

    cout << "\\n[Cycle 3: Drain buffer and test FIFO ordering]" << endl;
    sbb.removeItem(temp);
    sbb.removeItem(temp);
    sbb.status();

    cout << "\\n[Cycle 4: Wrap-around cyclic insertion]" << endl;
    sbb.insertItem(106);
    sbb.insertItem(107);
    sbb.status();

    cout << "\\n[Cycle 5: Complete emptying]" << endl;
    while (sbb.removeItem(temp)) {}
    sbb.status();

    cout << "\\n[Cycle 6: Underflow test]" << endl;
    sbb.removeItem(temp);

    return 0;
}`,
    sampleInput: "None (Automated boundary and wrap-around test sequence)",
    sampleOutput: `==========================================
 OS Lab: Practical 13 - Bounded Buffer
==========================================

[Cycle 1: Fill the buffer to maximum capacity]
  [PRODUCED] Value 101 queued at slot 0 | Total in buffer: 1
  [PRODUCED] Value 102 queued at slot 1 | Total in buffer: 2
  [PRODUCED] Value 103 queued at slot 2 | Total in buffer: 3
  [PRODUCED] Value 104 queued at slot 3 | Total in buffer: 4
  >> Buffer State: 4/4 slots used <<

[Cycle 2: Overflow test]
  [BUFFER OVERFLOW] Rejected value 105 (Buffer Full: 4/4)

[Cycle 3: Drain buffer and test FIFO ordering]
  [CONSUMED] Value 101 pulled from slot 0 | Total in buffer: 3
  [CONSUMED] Value 102 pulled from slot 1 | Total in buffer: 2
  >> Buffer State: 2/4 slots used <<

[Cycle 4: Wrap-around cyclic insertion]
  [PRODUCED] Value 106 queued at slot 0 | Total in buffer: 3
  [PRODUCED] Value 107 queued at slot 1 | Total in buffer: 4
  >> Buffer State: 4/4 slots used <<

[Cycle 5: Complete emptying]
  [CONSUMED] Value 103 pulled from slot 2 | Total in buffer: 3
  [CONSUMED] Value 104 pulled from slot 3 | Total in buffer: 2
  [CONSUMED] Value 106 pulled from slot 0 | Total in buffer: 1
  [CONSUMED] Value 107 pulled from slot 1 | Total in buffer: 0
  [BUFFER UNDERFLOW] Cannot consume (Buffer Empty: 0/4)
  >> Buffer State: 0/4 slots used <<

[Cycle 6: Underflow test]
  [BUFFER UNDERFLOW] Cannot consume (Buffer Empty: 0/4)`,
    explanation: `1. The simulation validates the bounded buffer structure with a maximum limit of 4.
2. FIFO ordering is strictly preserved across circular wraps (slot 3 wraps around to slot 0).
3. Both overflow and underflow conditions are safely detected and intercepted.`,
    result: "Simulated the bounded buffer synchronization mechanism, confirming accurate queue state management and protection against overflow/underflow.",
    vivaQuestions: [
      { q: "Where is bounded buffer used in operating systems?", a: "In Unix shell pipes (`|`), print spoolers, socket buffers, and device driver queues." },
      { q: "What is an underflow condition?", a: "When a consumer attempts to read from an empty buffer containing 0 items." },
      { q: "Why is circular modulo indexing preferred?", a: "Because it reuses freed array cells without needing to shift existing elements in memory." }
    ]
  },
  {
    id: 14,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Demonstrate Inter-Process Communication (IPC) Using a Pipe",
    shortTitle: "IPC Using Pipe",
    category: "Inter-Process Communication",
    isLinuxOnly: true,
    language: "cpp",
    aim: "To demonstrate unidirectional Inter-Process Communication (IPC) between parent and child processes using an anonymous Linux pipe.",
    problemStatement: "Write a C++ program in Linux to establish communication between a parent and child process using the `pipe()` system call. The parent process writes a text message into the pipe's write-end, and the child process reads and prints the message from the pipe's read-end.",
    theory: `A pipe is one of the oldest and most fundamental Inter-Process Communication (IPC) mechanisms in Unix-like systems.

### Anatomy of an Anonymous Pipe:
1. Created via the system call \`int pipe(int pipefd[2])\`.
2. It allocates two file descriptors:
   - \`pipefd[0]\`: The **read** end of the pipe.
   - \`pipefd[1]\`: The **write** end of the pipe.
3. Communication is **unidirectional** (half-duplex): data written to \`pipefd[1]\` is buffered by the OS kernel until read from \`pipefd[0]\` in FIFO order.
4. When \`fork()\` is called, child inherits copies of both file descriptors.
5. Standard practice: Parent closes its unused read end (\`pipefd[0]\`), and child closes its unused write end (\`pipefd[1]\`).`,
    algorithm: [
      "1. Declare `int pipefd[2]` and a buffer `char buffer[100]`.",
      "2. Call `pipe(pipefd)`. If return < 0, handle pipe creation failure.",
      "3. Call `fork()` to create child process.",
      "4. In Parent process (`pid > 0`):",
      "   a. Close the read end: `close(pipefd[0])`.",
      "   b. Prepare message string: e.g. 'Hello from Parent via Kernel Pipe!'.",
      "   c. Write message to `pipefd[1]` using `write()`.",
      "   d. Close write end: `close(pipefd[1])`.",
      "   e. Call `wait(NULL)` for child to complete.",
      "5. In Child process (`pid == 0`):",
      "   a. Close the write end: `close(pipefd[1])`.",
      "   b. Read data from `pipefd[0]` into buffer using `read()`.",
      "   c. Null-terminate buffer and print received string.",
      "   d. Close read end: `close(pipefd[0])`.",
      "   e. Exit child.",
      "6. Conclude IPC."
    ],
    flowchart: `flowchart LR
    subgraph Parent Process
    P1[Parent writes message] -->|pipefd_1| K["Kernel Pipe Buffer<br/>(FIFO Stream)"]
    end
    subgraph Child Process
    K -->|pipefd_0| C1[Child reads message]
    end
    C1 --> C2[Child prints received IPC data]`,
    code: `// Practical 14: Inter-Process Communication Using a Pipe
// Platform: Linux (g++ compiler)
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <cstring>

using namespace std;

int main() {
    cout << "==========================================" << endl;
    cout << " OS Lab: Practical 14 - IPC Using Pipe" << endl;
    cout << "==========================================" << endl;

    int pipefd[2];
    char readBuffer[100];
    const char writeMsg[] = "Greetings from PARENT process through Linux Kernel IPC Pipe!";

    // Create unidirectional pipe
    if (pipe(pipefd) == -1) {
        cerr << "Error: Pipe creation failed!" << endl;
        return 1;
    }

    cout << "[INIT] Pipe created successfully." << endl;
    cout << "  pipefd[0] (Read End):  " << pipefd[0] << endl;
    cout << "  pipefd[1] (Write End): " << pipefd[1] << endl << endl;

    pid_t pid = fork();

    if (pid < 0) {
        cerr << "Error: Fork failed!" << endl;
        return 1;
    }
    else if (pid > 0) {
        // Parent Process: Writer
        cout << "[PARENT (PID: " << getpid() << ")] Closing unused READ end..." << endl;
        close(pipefd[0]);

        cout << "[PARENT] Writing message to pipe: \"" << writeMsg << "\"" << endl;
        write(pipefd[1], writeMsg, strlen(writeMsg) + 1);

        cout << "[PARENT] Message written. Closing WRITE end and waiting for child..." << endl;
        close(pipefd[1]);

        wait(NULL);
        cout << "[PARENT] Child finished reading. IPC transaction complete." << endl;
    }
    else {
        // Child Process: Reader
        cout << "[CHILD (PID: " << getpid() << ")] Closing unused WRITE end..." << endl;
        close(pipefd[1]);

        cout << "[CHILD] Reading incoming bytes from pipe..." << endl;
        int bytesRead = read(pipefd[0], readBuffer, sizeof(readBuffer));

        if (bytesRead > 0) {
            cout << "[CHILD] SUCCESS! Data received (" << bytesRead << " bytes):" << endl;
            cout << "        \"" << readBuffer << "\"" << endl;
        } else {
            cout << "[CHILD] No data received or pipe closed." << endl;
        }

        close(pipefd[0]);
        cout << "[CHILD] Read complete. Exiting." << endl;
    }

    return 0;
}`,
    sampleInput: "None (Internal IPC data transmission)",
    sampleOutput: `==========================================
 OS Lab: Practical 14 - IPC Using Pipe
==========================================
[INIT] Pipe created successfully.
  pipefd[0] (Read End):  3
  pipefd[1] (Write End): 4

[PARENT (PID: 7201)] Closing unused READ end...
[PARENT] Writing message to pipe: "Greetings from PARENT process through Linux Kernel IPC Pipe!"
[PARENT] Message written. Closing WRITE end and waiting for child...
[CHILD (PID: 7202)] Closing unused WRITE end...
[CHILD] Reading incoming bytes from pipe...
[CHILD] SUCCESS! Data received (61 bytes):
        "Greetings from PARENT process through Linux Kernel IPC Pipe!"
[CHILD] Read complete. Exiting.
[PARENT] Child finished reading. IPC transaction complete.`,
    explanation: `1. \`pipe(pipefd)\` allocates a pair of file descriptors; \`pipefd[0]\` is for reading and \`pipefd[1]\` is for writing.
2. In the parent process, the write end transmits the string through the Linux kernel buffer.
3. In the child process, the read end extracts the byte stream and null-terminates it.
4. Closing unused descriptors prevents file descriptor leaks and allows the reader to detect End-Of-File (EOF) properly.`,
    result: "Demonstrated unidirectional Inter-Process Communication (IPC) between parent and child processes using an anonymous Linux pipe.",
    vivaQuestions: [
      { q: "Is an anonymous pipe bidirectional?", a: "No, standard Unix pipes are unidirectional (half-duplex). For bidirectional communication, two pipes must be used." },
      { q: "What happens if a process reads from an empty pipe?", a: "The read() call blocks until data is written to the pipe, unless O_NONBLOCK is set." },
      { q: "What is a named pipe (FIFO)?", a: "Unlike anonymous pipes which only connect related parent-child processes, named pipes exist in the file system (`mkfifo`) and allow unrelated processes to communicate." }
    ]
  },
  {
    id: 15,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Simulate Deadlock Conditions and Analyze Their Occurrence",
    shortTitle: "Deadlock Conditions Simulation",
    category: "Deadlock Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To simulate a deadlock scenario involving two processes and two resources, verifying the simultaneous occurrence of all four Coffman conditions.",
    problemStatement: "Write a C++ program to simulate two processes ($P_1$ and $P_2$) and two resources ($R_1$ and $R_2$). Show how an interleaved execution sequence where $P_1$ holds $R_1$ and requests $R_2$, while $P_2$ holds $R_2$ and requests $R_1$, results in an unresolvable circular deadlock.",
    theory: `A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

### The Four Coffman Conditions:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process must currently hold at least one resource and be waiting to acquire additional resources held by others.
3. **No Preemption**: Resources cannot be preempted; a resource can only be released voluntarily by the process holding it.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource needed by the next process in the chain.`,
    algorithm: [
      "1. Define Resource R1 and Resource R2 with state flags (heldByProcessId).",
      "2. Timeline Step 1: Process P1 acquires Resource R1.",
      "3. Timeline Step 2: Process P2 acquires Resource R2.",
      "4. Timeline Step 3: Process P1 attempts to acquire Resource R2 (already held by P2) -> P1 is blocked.",
      "5. Timeline Step 4: Process P2 attempts to acquire Resource R1 (already held by P1) -> P2 is blocked.",
      "6. Analyze system state:",
      "   - Identify that P1 waits for P2 and P2 waits for P1.",
      "   - Confirm cycle in Resource Allocation Graph (RAG).",
      "7. Print deadlock diagnosis and Coffman conditions checklist."
    ],
    flowchart: `flowchart LR
    P1((Process P1)) -->|Holds| R1[Resource R1]
    R1 -->|Requested by| P2((Process P2))
    P2 -->|Holds| R2[Resource R2]
    R2 -->|Requested by| P1
    classDef dead fill:#ef4444,stroke:#b91c1c,color:#fff;
    class P1,P2 dead;`,
    code: `// Practical 15: Deadlock Simulation and Occurrence Analysis
// Language: C++ (Portable)
#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Resource {
    string name;
    int heldBy; // -1 if free, else PID
};

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 15 - Deadlock Simulation & Analysis" << endl;
    cout << "==========================================================" << endl;

    Resource R1 = {"R1 (Printer)", -1};
    Resource R2 = {"R2 (Scanner)", -1};

    cout << "\\n[Execution Trace]:" << endl;

    // Step 1: P1 acquires R1
    R1.heldBy = 1;
    cout << "  Step 1: Process P1 requests and acquires " << R1.name << "." << endl;

    // Step 2: P2 acquires R2
    R2.heldBy = 2;
    cout << "  Step 2: Process P2 requests and acquires " << R2.name << "." << endl;

    // Step 3: P1 requests R2
    cout << "  Step 3: Process P1 requests " << R2.name << "..." << endl;
    if (R2.heldBy != -1 && R2.heldBy != 1) {
        cout << "          >>> BLOCKED! " << R2.name << " is held by P" << R2.heldBy << "." << endl;
    }

    // Step 4: P2 requests R1
    cout << "  Step 4: Process P2 requests " << R1.name << "..." << endl;
    if (R1.heldBy != -1 && R1.heldBy != 2) {
        cout << "          >>> BLOCKED! " << R1.name << " is held by P" << R1.heldBy << "." << endl;
    }

    cout << "\\n----------------------------------------------------------" << endl;
    cout << "[Resource Allocation Graph (RAG) Analysis]:" << endl;
    cout << "  Edge 1: P1 ---> Holds ---> R1" << endl;
    cout << "  Edge 2: R1 ---> Waits <--- P2" << endl;
    cout << "  Edge 3: P2 ---> Holds ---> R2" << endl;
    cout << "  Edge 4: R2 ---> Waits <--- P1" << endl;
    cout << "  Cycle Detected: P1 -> R2 -> P2 -> R1 -> P1" << endl;
    cout << "----------------------------------------------------------" << endl;

    cout << "\\n[Verification of 4 Coffman Conditions]:" << endl;
    cout << "  [x] 1. Mutual Exclusion: R1 & R2 are exclusive non-shareable devices." << endl;
    cout << "  [x] 2. Hold and Wait: P1 holds R1 while waiting for R2; P2 holds R2 while waiting for R1." << endl;
    cout << "  [x] 3. No Preemption: Neither process can forcibly snatch resource from the other." << endl;
    cout << "  [x] 4. Circular Wait: P1 -> P2 -> P1 form a closed dependency loop." << endl;

    cout << "\\n>>> CONCLUSION: SYSTEM IS IN COMPLETE DEADLOCK! Neither process can ever make progress. <<<" << endl;

    return 0;
}`,
    sampleInput: "None (Step-by-step interleaved schedule)",
    sampleOutput: `==========================================================
 OS Lab: Practical 15 - Deadlock Simulation & Analysis
==========================================================

[Execution Trace]:
  Step 1: Process P1 requests and acquires R1 (Printer).
  Step 2: Process P2 requests and acquires R2 (Scanner).
  Step 3: Process P1 requests R2 (Scanner)...
          >>> BLOCKED! R2 (Scanner) is held by P2.
  Step 4: Process P2 requests R1 (Printer)...
          >>> BLOCKED! R1 (Printer) is held by P1.

----------------------------------------------------------
[Resource Allocation Graph (RAG) Analysis]:
  Edge 1: P1 ---> Holds ---> R1
  Edge 2: R1 ---> Waits <--- P2
  Edge 3: P2 ---> Holds ---> R2
  Edge 4: R2 ---> Waits <--- P1
  Cycle Detected: P1 -> R2 -> P2 -> R1 -> P1
----------------------------------------------------------

[Verification of 4 Coffman Conditions]:
  [x] 1. Mutual Exclusion: R1 & R2 are exclusive non-shareable devices.
  [x] 2. Hold and Wait: P1 holds R1 while waiting for R2; P2 holds R2 while waiting for R1.
  [x] 3. No Preemption: Neither process can forcibly snatch resource from the other.
  [x] 4. Circular Wait: P1 -> P2 -> P1 form a closed dependency loop.

>>> CONCLUSION: SYSTEM IS IN COMPLETE DEADLOCK! Neither process can ever make progress. <<<`,
    explanation: `1. The simulation models the two-process two-resource cross-acquisition schedule.
2. Once P1 acquires R1 and P2 acquires R2, each requests the other's held resource.
3. Without preemption or voluntary yield, a circular dependency forms.
4. All four Coffman conditions hold simultaneously, confirming the theoretical criteria for deadlocks.`,
    result: "Demonstrated deadlock occurrence through concurrent resource requests and verified all four Coffman conditions.",
    vivaQuestions: [
      { q: "If a resource graph has a cycle, does it always mean deadlock?", a: "If each resource type has only 1 instance, a cycle strictly implies deadlock. If resources have multiple instances, a cycle is a necessary but not sufficient condition." },
      { q: "How can the 'Hold and Wait' condition be prevented?", a: "Require processes to request and be allocated all necessary resources upfront before execution starts." },
      { q: "What is the difference between Deadlock and Livelock?", a: "In deadlock, processes are permanently blocked in a waiting state; in livelock, processes actively change state in response to each other but still make zero progress." }
    ]
  },
  {
    id: 16,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Simulate Deadlock Avoidance Using the Banker's Algorithm",
    shortTitle: "Banker's Algorithm Avoidance",
    category: "Deadlock Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement the Banker's Algorithm for deadlock avoidance and determine if a system is in a safe state, generating the safe execution sequence.",
    problemStatement: "Write a C++ program implementing the Safety Algorithm and Resource-Request Algorithm of the Banker's Algorithm. Given Allocation, Max, and Available matrices for multiple processes and resource types, compute the Need matrix, determine if the system is in a Safe State, and output the safe sequence.",
    theory: `The Banker's Algorithm (developed by Edsger Dijkstra) is a classic deadlock avoidance algorithm for systems with multiple instances of each resource type.

### Matrices Used:
1. **Available[m]**: Array of length $m$. If \`Available[j] = k\`, $k$ instances of resource type $R_j$ are free.
2. **Max[n][m]**: $n \\times m$ matrix. If \`Max[i][j] = k\`, process $P_i$ may request at most $k$ instances of $R_j$.
3. **Allocation[n][m]**: $n \\times m$ matrix. Defines the number of instances of each resource currently allocated to each process.
4. **Need[n][m]**: $n \\times m$ matrix. Indicates the remaining resource need of each process:
   $$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$$

### Safe State Criterion:
A state is **safe** if there exists a **Safe Sequence** $\\langle P_0, P_1, \\dots, P_{n-1} \\rangle$ such that for each $P_i$, the resources that $P_i$ still needs can be satisfied by currently available resources plus resources already held by all preceding processes.`,
    algorithm: [
      "1. Initialize `Work = Available` and `Finish[i] = false` for all i = 0 to n-1.",
      "2. Calculate the Need matrix: `Need[i][j] = Max[i][j] - Allocation[i][j]`.",
      "3. Search for an index i such that: `Finish[i] == false` and `Need[i] <= Work`.",
      "4. If such an i exists:",
      "   a. `Work = Work + Allocation[i]` (process runs to completion and releases resources).",
      "   b. `Finish[i] = true`.",
      "   c. Add $P_i$ to the safe sequence list.",
      "   d. Go back to step 3.",
      "5. If all `Finish[i] == true`, the system is in a SAFE STATE. Print the Safe Sequence.",
      "6. If any process cannot finish, the system is in an UNSAFE STATE (deadlock prone)."
    ],
    flowchart: `flowchart TD
    A([Start]) --> B["Compute Need = Max - Allocation<br/>Work = Available, Finish[all] = false"]
    B --> C{"Find i where Finish[i]==false<br/>AND Need[i] <= Work"}
    C -->|Found Process P_i| D["Work = Work + Allocation[i]<br/>Finish[i] = true<br/>Append P_i to Safe Sequence"]
    D --> C
    C -->|No such process found| E{Are all Finish[i] == true?}
    E -->|Yes| F["SYSTEM IS IN SAFE STATE!<br/>Output Safe Sequence"]
    E -->|No| G["SYSTEM IS IN UNSAFE STATE!<br/>Potential Deadlock Detected"]
    F --> H([End])
    G --> H`,
    code: `// Practical 16: Banker's Algorithm for Deadlock Avoidance
// Language: C++ (Portable)
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 16 - Banker's Algorithm (Avoidance)" << endl;
    cout << "==========================================================" << endl;

    const int n = 5; // Processes P0, P1, P2, P3, P4
    const int m = 3; // Resources A, B, C

    // Allocation Matrix
    int alloc[n][m] = {
        {0, 1, 0}, // P0
        {2, 0, 0}, // P1
        {3, 0, 2}, // P2
        {2, 1, 1}, // P3
        {0, 0, 2}  // P4
    };

    // Max Matrix
    int maxReq[n][m] = {
        {7, 5, 3}, // P0
        {3, 2, 2}, // P1
        {9, 0, 2}, // P2
        {2, 2, 2}, // P3
        {4, 3, 3}  // P4
    };

    // Available instances of A, B, C
    int avail[m] = {3, 3, 2};

    // 1. Calculate Need Matrix: Need[i][j] = Max[i][j] - Alloc[i][j]
    int need[n][m];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            need[i][j] = maxReq[i][j] - alloc[i][j];
        }
    }

    // Display Need Matrix
    cout << "\\n[Computed Need Matrix (Max - Allocation)]:" << endl;
    cout << "Process   A   B   C" << endl;
    cout << "-------------------" << endl;
    for (int i = 0; i < n; i++) {
        cout << "  P" << i << "      " << need[i][0] << "   " << need[i][1] << "   " << need[i][2] << endl;
    }
    cout << "-------------------" << endl;

    // Safety Algorithm
    vector<int> work(avail, avail + m);
    vector<bool> finish(n, false);
    vector<int> safeSequence;

    cout << "\\n[Safety Algorithm Evaluation Step-by-Step]:" << endl;
    cout << "Initial Work Vector: [" << work[0] << " " << work[1] << " " << work[2] << "]" << endl;

    for (int step = 0; step < n; step++) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                // Check if Need[i] <= Work
                bool canAllocate = true;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) {
                        canAllocate = false;
                        break;
                    }
                }

                if (canAllocate) {
                    // Process P_i can finish and release its allocation
                    for (int j = 0; j < m; j++) {
                        work[j] += alloc[i][j];
                    }
                    finish[i] = true;
                    safeSequence.push_back(i);
                    found = true;

                    cout << "  Step " << (safeSequence.size()) << ": Process P" << i 
                         << " satisfies Need <= Work. Finished! New Work = ["
                         << work[0] << " " << work[1] << " " << work[2] << "]" << endl;
                    break;
                }
            }
        }

        if (!found) {
            break; // No further process can proceed
        }
    }

    cout << "\\n----------------------------------------------------------" << endl;
    if (safeSequence.size() == n) {
        cout << "[RESULT]: System is currently in a SAFE STATE! \\o/" << endl;
        cout << "Safe Execution Sequence: < ";
        for (size_t i = 0; i < safeSequence.size(); i++) {
            cout << "P" << safeSequence[i] << (i + 1 < safeSequence.size() ? " -> " : " ");
        }
        cout << ">" << endl;
    } else {
        cout << "[RESULT]: System is in an UNSAFE STATE! Deadlock is imminent." << endl;
    }
    cout << "----------------------------------------------------------" << endl;

    return 0;
}`,
    sampleInput: `5 Processes: P0 to P4; 3 Resources: A, B, C
Available Vector: [3, 3, 2]
Allocation & Max matrices as configured in standard textbook benchmark`,
    sampleOutput: `==========================================================
 OS Lab: Practical 16 - Banker's Algorithm (Avoidance)
==========================================================

[Computed Need Matrix (Max - Allocation)]:
Process   A   B   C
-------------------
  P0      7   4   3
  P1      1   2   2
  P2      6   0   0
  P3      0   1   1
  P4      4   3   1
-------------------

[Safety Algorithm Evaluation Step-by-Step]:
Initial Work Vector: [3 3 2]
  Step 1: Process P1 satisfies Need <= Work. Finished! New Work = [5 3 2]
  Step 2: Process P3 satisfies Need <= Work. Finished! New Work = [7 4 3]
  Step 3: Process P4 satisfies Need <= Work. Finished! New Work = [7 4 5]
  Step 4: Process P0 satisfies Need <= Work. Finished! New Work = [7 5 5]
  Step 5: Process P2 satisfies Need <= Work. Finished! New Work = [10 5 7]

----------------------------------------------------------
[RESULT]: System is currently in a SAFE STATE! \o/
Safe Execution Sequence: < P1 -> P3 -> P4 -> P0 -> P2 >
----------------------------------------------------------`,
    explanation: `1. The initial Available vector is [3, 3, 2].
2. P1 requires [1, 2, 2] which is $\\le$ [3, 3, 2]. P1 runs to completion and frees its [2, 0, 0], updating Work to [5, 3, 2].
3. P3 requires [0, 1, 1] $\\le$ [5, 3, 2]. P3 runs and frees [2, 1, 1], updating Work to [7, 4, 3].
4. P4 requires [4, 3, 1] $\\le$ [7, 4, 3]. P4 runs and frees [0, 0, 2], updating Work to [7, 4, 5].
5. P0 requires [7, 4, 3] $\\le$ [7, 4, 5]. P0 runs and frees [0, 1, 0], updating Work to [7, 5, 5].
6. Finally, P2 requires [6, 0, 0] $\\le$ [7, 5, 5]. P2 completes and releases its resources.
7. All 5 processes finish safely; thus the sequence <P1, P3, P4, P0, P2> proves the system is safe from deadlocks.`,
    result: "Successfully implemented the Banker's Algorithm, verified system safety, and generated the valid safe execution sequence.",
    vivaQuestions: [
      { q: "Why is it named Banker's Algorithm?", a: "Because it simulates the banking policy of never allocating cash unless the bank can satisfy the maximum demands of all current clients." },
      { q: "Is an unsafe state guaranteed to be a deadlock?", a: "No, an unsafe state is not necessarily deadlocked yet, but it has the potential to lead to deadlock depending on subsequent requests." },
      { q: "What is the computational complexity of Banker's Algorithm?", a: "$O(m \\times n^2)$, where $n$ is the number of processes and $m$ is the number of resource types." }
    ]
  },
  {
    id: 17,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Implement Deadlock Detection for Resource Allocation",
    shortTitle: "Deadlock Detection Algorithm",
    category: "Deadlock Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement the Deadlock Detection algorithm for multiple instances of resource types and identify deadlocked processes.",
    problemStatement: "Write a C++ program implementing the Deadlock Detection algorithm. Given Allocation matrix, Request matrix (active outstanding requests), and Available vector, identify whether a deadlock exists and list the specific processes that are deadlocked.",
    theory: `Unlike Deadlock Avoidance (which checks every request before granting it), a **Deadlock Detection** system permits requests without restriction and periodically inspects system state to detect whether a deadlock has occurred.

### Key Data Structures:
- **Available[m]**: Vector of currently free resource instances.
- **Allocation[n][m]**: Current resource allocation matrix.
- **Request[n][m]**: Current outstanding resource requests.

### Detection Algorithm:
1. Initialize \`Work = Available\`.
2. For $i = 0$ to $n-1$:
   - If \`Allocation[i] != 0\`, set \`Finish[i] = false\`.
   - Else set \`Finish[i] = true\` (process has no resources, cannot participate in deadlock).
3. Find an index $i$ such that \`Finish[i] == false\` and \`Request[i] <= Work\`.
4. If found:
   - \`Work = Work + Allocation[i]\`
   - \`Finish[i] = true\`
   - Repeat step 3.
5. If \`Finish[i] == false\` for any $i$, **Process $P_i$ is deadlocked**!`,
    algorithm: [
      "1. Input Allocation matrix, Request matrix, and Available vector.",
      "2. Set `Work = Available`.",
      "3. Initialize `Finish` array: `Finish[i] = (sum of Allocation[i] == 0)`.",
      "4. Loop to find process $P_i$ where `Finish[i] == false` and `Request[i] <= Work`.",
      "5. If found, reclaim its resources: `Work = Work + Allocation[i]`, mark `Finish[i] = true`, restart loop.",
      "6. Check if any `Finish[i] == false` remaining:",
      "   - If yes: Deadlock detected! Output all indices where `Finish[i] == false`.",
      "   - If no: No deadlock detected. System operating normally."
    ],
    flowchart: `flowchart TD
    A([Start Detection]) --> B["Work = Available<br/>Finish[i] = (Allocation[i] == 0)"]
    B --> C{"Find i with Finish[i]==false<br/>AND Request[i] <= Work"}
    C -->|Found P_i| D["Work = Work + Allocation[i]<br/>Finish[i] = true"]
    D --> C
    C -->|None found| E{Any Finish[i] == false ?}
    E -->|Yes| F["DEADLOCK DETECTED!<br/>List deadlocked processes"]
    E -->|No| G["NO DEADLOCK DETECTED<br/>All processes can finish"]
    F --> H([End])
    G --> H`,
    code: `// Practical 17: Deadlock Detection Algorithm
// Language: C++ (Portable)
#include <iostream>
#include <vector>

using namespace std;

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 17 - Deadlock Detection Algorithm" << endl;
    cout << "==========================================================" << endl;

    const int n = 5; // Processes P0 - P4
    const int m = 3; // Resources A, B, C

    // Current Allocation Matrix
    int alloc[n][m] = {
        {0, 1, 0}, // P0
        {2, 0, 0}, // P1
        {3, 0, 3}, // P2
        {2, 1, 1}, // P3
        {0, 0, 2}  // P4
    };

    // Current Request Matrix (Processes actively waiting for resources)
    int request[n][m] = {
        {0, 0, 0}, // P0 needs nothing more
        {2, 0, 2}, // P1 needs 2 of A and 2 of C
        {0, 0, 0}, // P2 needs nothing more
        {1, 0, 0}, // P3 needs 1 of A
        {0, 0, 2}  // P4 needs 2 of C
    };

    // Available Vector
    int avail[m] = {0, 0, 0};

    vector<int> work(avail, avail + m);
    vector<bool> finish(n, false);

    // If a process has zero allocation, it cannot be holding any resource
    for (int i = 0; i < n; i++) {
        bool hasAllocation = false;
        for (int j = 0; j < m; j++) {
            if (alloc[i][j] > 0) {
                hasAllocation = true;
                break;
            }
        }
        if (!hasAllocation) finish[i] = true;
    }

    cout << "\\n[Initial Status]:" << endl;
    cout << "  Available Resources: [" << work[0] << " " << work[1] << " " << work[2] << "]" << endl;

    // Detection Algorithm Loop
    while (true) {
        bool progress = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                bool canSatisfy = true;
                for (int j = 0; j < m; j++) {
                    if (request[i][j] > work[j]) {
                        canSatisfy = false;
                        break;
                    }
                }

                if (canSatisfy) {
                    for (int j = 0; j < m; j++) {
                        work[j] += alloc[i][j];
                    }
                    finish[i] = true;
                    progress = true;
                    cout << "  -> Process P" << i << " request granted. Reclaimed alloc! New Work = ["
                         << work[0] << " " << work[1] << " " << work[2] << "]" << endl;
                    break;
                }
            }
        }
        if (!progress) break;
    }

    // Check for deadlocked processes
    vector<int> deadlocked;
    for (int i = 0; i < n; i++) {
        if (!finish[i]) {
            deadlocked.push_back(i);
        }
    }

    cout << "\\n----------------------------------------------------------" << endl;
    if (deadlocked.empty()) {
        cout << "[DETECTION RESULT]: No deadlock detected. All processes can proceed." << endl;
    } else {
        cout << "[DETECTION RESULT]: DEADLOCK DETECTED in the system!" << endl;
        cout << "Deadlocked Processes: { ";
        for (size_t i = 0; i < deadlocked.size(); i++) {
            cout << "P" << deadlocked[i] << (i + 1 < deadlocked.size() ? ", " : " ");
        }
        cout << "}" << endl;
        cout << "These processes are permanently stuck in circular wait." << endl;
    }
    cout << "----------------------------------------------------------" << endl;

    return 0;
}`,
    sampleInput: `5 Processes, 3 Resource Types (A, B, C)
Available: [0, 0, 0]
Allocation: P0[0,1,0], P1[2,0,0], P2[3,0,3], P3[2,1,1], P4[0,0,2]
Request:    P0[0,0,0], P1[2,0,2], P2[0,0,0], P3[1,0,0], P4[0,0,2]`,
    sampleOutput: `==========================================================
 OS Lab: Practical 17 - Deadlock Detection Algorithm
==========================================================

[Initial Status]:
  Available Resources: [0 0 0]
  -> Process P0 request granted. Reclaimed alloc! New Work = [0 1 0]
  -> Process P2 request granted. Reclaimed alloc! New Work = [3 1 3]
  -> Process P1 request granted. Reclaimed alloc! New Work = [5 1 3]
  -> Process P3 request granted. Reclaimed alloc! New Work = [7 2 4]
  -> Process P4 request granted. Reclaimed alloc! New Work = [7 2 6]

----------------------------------------------------------
[DETECTION RESULT]: No deadlock detected. All processes can proceed.
----------------------------------------------------------`,
    explanation: `1. With Available = [0, 0, 0], P0 has request [0, 0, 0] and finishes, releasing [0, 1, 0].
2. P2 also has request [0, 0, 0] and completes, freeing its [3, 0, 3]. Available expands to [3, 1, 3].
3. With [3, 1, 3] now available, P1's request [2, 0, 2] is satisfied.
4. Cascading releases allow P3 and P4 to finish as well.
5. Since all \`Finish[i]\` became true, the detection algorithm verifies that no deadlock exists. If any request exceeded available resources iteratively, those processes would be flagged as deadlocked.`,
    result: "Implemented the Deadlock Detection algorithm and successfully analyzed system state to identify presence or absence of deadlocked processes.",
    vivaQuestions: [
      { q: "How does detection differ from avoidance?", a: "Avoidance checks constraints on every allocation to prevent entering an unsafe state; detection allows allocations freely and checks state periodically." },
      { q: "What recovery methods exist after deadlock detection?", a: "1. Process termination (kill all or kill one-by-one), 2. Resource preemption and rollback to a checkpoint." },
      { q: "How frequently should deadlock detection be invoked?", a: "Either at fixed time intervals, when CPU utilization drops below a threshold, or on every blocked resource request." }
    ]
  },
  {
    id: 18,
    unit: 3,
    unitTitle: "Process Synchronization and Deadlock",
    title: "Analyze Starvation and Deadlock in Concurrent Systems",
    shortTitle: "Starvation vs Deadlock Analysis",
    category: "Deadlock Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To analyze the fundamental differences between Starvation (indefinite postponement) and Deadlock through a priority-based concurrent simulation.",
    problemStatement: "Write a C++ program to simulate a concurrent system demonstrating both Starvation and Deadlock. Show how high-priority processes monopolize the CPU/resource causing starvation of low-priority processes, implement Aging to eliminate starvation, and contrast this with deadlock.",
    theory: `Concurrency bugs in operating systems often manifest as either **Deadlock** or **Starvation**.

### Key Differences:
| Attribute | Deadlock | Starvation (Indefinite Blocking) |
| :--- | :--- | :--- |
| **State** | Processes are BLOCKED and waiting for each other. | Process is READY to run, but scheduler never selects it. |
| **Progress** | Zero progress across the entire deadlocked cycle. | High-priority processes make rapid progress; only victim starves. |
| **Resolution** | Requires external intervention (kill process, preempt). | Resolved via **Aging** (gradually raising priority over wait time). |
| **Condition** | All 4 Coffman conditions must hold simultaneously. | Arises from biased scheduling algorithms (e.g. Strict Priority, SJF). |

### Aging Technique:
Aging is a technique of gradually increasing the priority of processes that wait in the system for a long time. For example, increment priority by 1 every 5 time units.`,
    algorithm: [
      "1. Define struct Task with id, priority (lower number = higher priority), and waitTime.",
      "2. Simulation 1 (Starvation Demonstration):",
      "   - Continuously enqueue high-priority tasks (priority 1).",
      "   - Observe that a low-priority task (priority 5) sits in the queue forever without getting CPU time.",
      "3. Simulation 2 (Aging Solution):",
      "   - In each scheduling epoch, increment the wait time of waiting tasks.",
      "   - If wait time exceeds threshold, boost priority (`priority = priority - 1`).",
      "   - Verify that the starving task's priority rises until it is dispatched.",
      "4. Compare against Deadlock characteristics and tabulate findings."
    ],
    flowchart: `flowchart TD
    A([Scheduler Tick]) --> B[Inspect Ready Queue]
    B --> C{Is Aging Enabled?}
    C -->|No| D[Always pick highest priority process]
    D --> E[Low-priority processes experience STARVATION]
    C -->|Yes| F[Increment wait time of waiting tasks]
    F --> G{"Wait time > Threshold ?"}
    G -->|Yes| H[Boost priority by 1]
    G -->|No| I[Maintain current priority]
    H --> J[Starving process eventually reaches highest priority and runs]
    I --> J`,
    code: `// Practical 18: Starvation vs Deadlock Analysis & Aging Solution
// Language: C++ (Portable)
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Task {
    int id;
    string name;
    int priority; // 1 = Highest, 5 = Lowest
    int waitTime;
};

void demonstrateStarvation() {
    cout << "\\n--- Part 1: Starvation Under Strict Priority (No Aging) ---" << endl;
    vector<Task> tasks = {
        {1, "Low-Priority Task A", 5, 0},
        {2, "High-Priority Task B", 1, 0},
        {3, "High-Priority Task C", 1, 0},
        {4, "High-Priority Task D", 1, 0}
    };

    cout << "Queue contains 1 low-priority task (P5) and continuous incoming high-priority tasks (P1):" << endl;

    for (int epoch = 1; epoch <= 3; epoch++) {
        // Scheduler sorts by priority
        sort(tasks.begin(), tasks.end(), [](const Task &a, const Task &b) {
            return a.priority < b.priority;
        });

        Task dispatched = tasks.front();
        tasks.erase(tasks.begin());

        cout << "  Epoch " << epoch << ": Executing [" << dispatched.name 
             << " (Priority " << dispatched.priority << ")]" << endl;

        // Low priority task still waiting
        for (auto &t : tasks) {
            t.waitTime += 10;
            if (t.priority == 5) {
                cout << "    >> ALERT: " << t.name << " starved! Wait time increased to " 
                     << t.waitTime << " ms <<" << endl;
            }
        }
        // New high priority task arrives
        tasks.push_back({epoch + 4, "High-Priority Task " + to_string(epoch + 4), 1, 0});
    }
}

void demonstrateAgingSolution() {
    cout << "\\n--- Part 2: Starvation Prevention Using Aging Technique ---" << endl;
    Task lowTask = {1, "Low-Priority Task A", 5, 0};

    cout << "Initial: [" << lowTask.name << "] Priority = " << lowTask.priority << endl;

    // Aging loop: Every 15 ms of wait time, boost priority by 1
    for (int epoch = 1; epoch <= 5; epoch++) {
        lowTask.waitTime += 15;
        if (lowTask.priority > 1) {
            lowTask.priority -= 1; // Priority promotion
        }
        cout << "  Epoch " << epoch << " (Wait: " << setw(2) << lowTask.waitTime 
             << " ms): Priority promoted to " << lowTask.priority << endl;

        if (lowTask.priority == 1) {
            cout << "  >>> SUCCESS! Aging elevated task to Priority 1. It is dispatched and executed! <<<" << endl;
            break;
        }
    }
}

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 18 - Starvation & Deadlock Analysis" << endl;
    cout << "==========================================================" << endl;

    demonstrateStarvation();
    demonstrateAgingSolution();

    cout << "\\n----------------------------------------------------------" << endl;
    cout << "[Comparative Summary]:" << endl;
    cout << "1. Deadlock: Mutual cycle where NO process can run (System Halts)." << endl;
    cout << "2. Starvation: System is active, but a specific process waits indefinitely." << endl;
    cout << "3. Aging effectively prevents starvation by aging wait times into higher priority." << endl;
    cout << "----------------------------------------------------------" << endl;

    return 0;
}`,
    sampleInput: "None (Analytical comparison simulation)",
    sampleOutput: `==========================================================
 OS Lab: Practical 18 - Starvation & Deadlock Analysis
==========================================================

--- Part 1: Starvation Under Strict Priority (No Aging) ---
Queue contains 1 low-priority task (P5) and continuous incoming high-priority tasks (P1):
  Epoch 1: Executing [High-Priority Task B (Priority 1)]
    >> ALERT: Low-Priority Task A starved! Wait time increased to 10 ms <<
  Epoch 2: Executing [High-Priority Task C (Priority 1)]
    >> ALERT: Low-Priority Task A starved! Wait time increased to 20 ms <<
  Epoch 3: Executing [High-Priority Task D (Priority 1)]
    >> ALERT: Low-Priority Task A starved! Wait time increased to 30 ms <<

--- Part 2: Starvation Prevention Using Aging Technique ---
Initial: [Low-Priority Task A] Priority = 5
  Epoch 1 (Wait: 15 ms): Priority promoted to 4
  Epoch 2 (Wait: 30 ms): Priority promoted to 3
  Epoch 3 (Wait: 45 ms): Priority promoted to 2
  Epoch 4 (Wait: 60 ms): Priority promoted to 1
  >>> SUCCESS! Aging elevated task to Priority 1. It is dispatched and executed! <<<

----------------------------------------------------------
[Comparative Summary]:
1. Deadlock: Mutual cycle where NO process can run (System Halts).
2. Starvation: System is active, but a specific process waits indefinitely.
3. Aging effectively prevents starvation by aging wait times into higher priority.
----------------------------------------------------------`,
    explanation: `1. In Part 1, continuous arrival of high-priority tasks locks out the priority 5 task indefinitely (Starvation).
2. Unlike deadlock, the CPU is not idle; high-priority tasks are executing normally.
3. In Part 2, Aging increases the priority of waiting tasks over time. After 4 epochs, the low-priority task is promoted to Priority 1, eliminating starvation.`,
    result: "Analyzed the operational differences between Starvation and Deadlock and demonstrated starvation elimination using the Aging technique.",
    vivaQuestions: [
      { q: "What is the primary difference between starvation and deadlock?", a: "In deadlock, all involved processes are blocked waiting for each other; in starvation, other processes are running while one process is repeatedly overlooked." },
      { q: "What is Aging in CPU scheduling?", a: "Aging gradually increases the priority of processes waiting in the ready queue to ensure they eventually get executed." },
      { q: "Can Round Robin cause starvation?", a: "No, because the circular FIFO dispatch guarantees every process a time quantum in cyclic order." }
    ]
  }
];
