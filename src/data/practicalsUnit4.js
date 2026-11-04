export const practicalsUnit4 = [
  {
    id: 19,
    unit: 4,
    unitTitle: "Memory Management",
    title: "Compare First Fit and Best Fit Memory Allocation Algorithms",
    shortTitle: "First Fit vs Best Fit Memory Allocation",
    category: "Memory Management",
    isLinuxOnly: false,
    language: "cpp",
    aim: "To implement, compare, and analyze the performance of First Fit and Best Fit contiguous dynamic memory allocation strategies.",
    problemStatement: "Write a C++ program to simulate both First Fit and Best Fit contiguous memory allocation strategies for a given set of memory partition blocks and incoming process memory requests. Display process-to-block allocation mappings, remaining fragment sizes, and compare internal fragmentation.",
    theory: `In contiguous memory allocation, free memory is partitioned into holes/blocks of variable or fixed sizes. When a process requests memory, the operating system must select an appropriate hole from the set of available free blocks.

### Strategies:
1. **First Fit**:
   - Scans memory from the beginning and allocates the **first hole that is large enough** ($Block \\ge Process$).
   - Searching can stop immediately upon finding the first valid hole.
   - Fast execution speed.

2. **Best Fit**:
   - Searches the entire list of free blocks and allocates the **smallest hole that is large enough**.
   - Minimizes the immediate leftover unused space (internal/external fragment) in that block.
   - Slower because it must examine all available blocks unless blocks are pre-sorted by size.
   - Tendency to produce many tiny, unusable memory slivers throughout RAM.

### Internal vs External Fragmentation:
- **Internal Fragmentation**: Unused memory inside an allocated partition.
- **External Fragmentation**: Total free memory exists to satisfy a request, but it is split into non-contiguous blocks.`,
    algorithm: [
      "1. Input number of memory blocks m and their sizes.",
      "2. Input number of processes n and their memory requirements.",
      "3. First Fit Algorithm:",
      "   a. For each process i from 0 to n-1:",
      "      - Loop through blocks j from 0 to m-1.",
      "      - If `blockSize[j] >= processSize[i]`:",
      "        * Assign block j to process i.",
      "        * Deduct allocated memory: `blockSize[j] -= processSize[i]`.",
      "        * Break block loop and proceed to next process.",
      "   b. Record unallocated processes.",
      "4. Best Fit Algorithm:",
      "   a. Reset block sizes to original values.",
      "   b. For each process i from 0 to n-1:",
      "      - Initialize `bestIdx = -1`.",
      "      - Loop through blocks j from 0 to m-1.",
      "      - If `blockSize[j] >= processSize[i]`:",
      "        * If `bestIdx == -1` or `blockSize[j] < blockSize[bestIdx]`:",
      "          - Update `bestIdx = j`.",
      "      - If `bestIdx != -1`:",
      "        * Assign block bestIdx to process i.",
      "        * Deduct: `blockSize[bestIdx] -= processSize[i]`.",
      "5. Tabulate and compare allocation outcomes and total wasted fragments for both methods."
    ],
    flowchart: `flowchart TD
    A([Start Allocation]) --> B[Input Block Sizes & Process Requests]
    B --> C[Execute First Fit Strategy]
    C --> D["For each process, find first block where size >= request<br/>Allocate and subtract"]
    D --> E[Reset Block Sizes]
    E --> F[Execute Best Fit Strategy]
    F --> G["For each process, find block where (size >= request) AND size is MINIMAL<br/>Allocate and subtract"]
    G --> H[Compare Total Fragments & Success Rates]
    H --> I[Display Comparative Tables]
    I --> J([End])`,
    code: `// Practical 19: First Fit vs Best Fit Memory Allocation
// Language: C++ (Portable)
#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

void runFirstFit(vector<int> blockSize, const vector<int> &processSize) {
    int m = blockSize.size();
    int n = processSize.size();
    vector<int> allocation(n, -1);
    vector<int> fragment(n, 0);

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                allocation[i] = j;
                fragment[i] = blockSize[j] - processSize[i];
                blockSize[j] -= processSize[i]; // Reduce remaining space in block
                break;
            }
        }
    }

    cout << "\\n[FIRST FIT ALLOCATION TABLE]:" << endl;
    cout << left << setw(12) << "Process No." 
         << setw(16) << "Process Size" 
         << setw(14) << "Block Allocated" 
         << setw(16) << "Remaining Frag" << endl;
    cout << "--------------------------------------------------------" << endl;

    int totalFrag = 0;
    for (int i = 0; i < n; i++) {
        cout << left << setw(12) << ("P" + to_string(i + 1))
             << setw(16) << (to_string(processSize[i]) + " KB");
        if (allocation[i] != -1) {
            cout << setw(14) << ("Block " + to_string(allocation[i] + 1))
                 << setw(16) << (to_string(fragment[i]) + " KB") << endl;
            totalFrag += fragment[i];
        } else {
            cout << setw(14) << "Not Allocated"
                 << setw(16) << "N/A" << endl;
        }
    }
    cout << "--------------------------------------------------------" << endl;
}

void runBestFit(vector<int> blockSize, const vector<int> &processSize) {
    int m = blockSize.size();
    int n = processSize.size();
    vector<int> allocation(n, -1);
    vector<int> fragment(n, 0);

    for (int i = 0; i < n; i++) {
        int bestIdx = -1;
        for (int j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (bestIdx == -1 || blockSize[j] < blockSize[bestIdx]) {
                    bestIdx = j;
                }
            }
        }

        if (bestIdx != -1) {
            allocation[i] = bestIdx;
            fragment[i] = blockSize[bestIdx] - processSize[i];
            blockSize[bestIdx] -= processSize[i];
        }
    }

    cout << "\\n[BEST FIT ALLOCATION TABLE]:" << endl;
    cout << left << setw(12) << "Process No." 
         << setw(16) << "Process Size" 
         << setw(14) << "Block Allocated" 
         << setw(16) << "Remaining Frag" << endl;
    cout << "--------------------------------------------------------" << endl;

    int totalFrag = 0;
    for (int i = 0; i < n; i++) {
        cout << left << setw(12) << ("P" + to_string(i + 1))
             << setw(16) << (to_string(processSize[i]) + " KB");
        if (allocation[i] != -1) {
            cout << setw(14) << ("Block " + to_string(allocation[i] + 1))
                 << setw(16) << (to_string(fragment[i]) + " KB") << endl;
            totalFrag += fragment[i];
        } else {
            cout << setw(14) << "Not Allocated"
                 << setw(16) << "N/A" << endl;
        }
    }
    cout << "--------------------------------------------------------" << endl;
}

int main() {
    cout << "==========================================================" << endl;
    cout << " OS Lab: Practical 19 - First Fit vs Best Fit Memory" << endl;
    cout << "==========================================================" << endl;

    // Standard benchmark memory blocks and incoming processes
    vector<int> originalBlocks = {100, 500, 200, 300, 600}; // in KB
    vector<int> processes      = {212, 417, 112, 426};      // in KB

    cout << "\\n[Memory Configuration]:" << endl;
    cout << "Available Partition Blocks: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB" << endl;
    cout << "Process Memory Demands:     P1=212 KB, P2=417 KB, P3=112 KB, P4=426 KB" << endl;

    // Run simulations
    runFirstFit(originalBlocks, processes);
    runBestFit(originalBlocks, processes);

    cout << "\\n[Comparative Conclusion]:" << endl;
    cout << "1. First Fit is faster in runtime O(n*m) worst-case but checks only until first fit." << endl;
    cout << "2. Best Fit allocates the closest match, preserving large blocks for large requests." << endl;
    cout << "3. In this test case, Best Fit successfully allocated ALL 4 processes," << endl;
    cout << "   whereas First Fit could not allocate P4 (426 KB) due to premature partition splitting!" << endl;

    return 0;
}`,
    sampleInput: `Memory Blocks: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB
Process Requests: P1 (212 KB), P2 (417 KB), P3 (112 KB), P4 (426 KB)`,
    sampleOutput: `==========================================================
 OS Lab: Practical 19 - First Fit vs Best Fit Memory
==========================================================

[Memory Configuration]:
Available Partition Blocks: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB
Process Memory Demands:     P1=212 KB, P2=417 KB, P3=112 KB, P4=426 KB

[FIRST FIT ALLOCATION TABLE]:
Process No.  Process Size     Block Allocated Remaining Frag  
--------------------------------------------------------
P1           212 KB           Block 2        288 KB          
P2           417 KB           Block 5        183 KB          
P3           112 KB           Block 2        176 KB          
P4           426 KB           Not Allocated  N/A             
--------------------------------------------------------

[BEST FIT ALLOCATION TABLE]:
Process No.  Process Size     Block Allocated Remaining Frag  
--------------------------------------------------------
P1           212 KB           Block 4        88 KB           
P2           417 KB           Block 2        83 KB           
P3           112 KB           Block 3        88 KB           
P4           426 KB           Block 5        174 KB          
--------------------------------------------------------

[Comparative Conclusion]:
1. First Fit is faster in runtime O(n*m) worst-case but checks only until first fit.
2. Best Fit allocates the closest match, preserving large blocks for large requests.
3. In this test case, Best Fit successfully allocated ALL 4 processes,
   whereas First Fit could not allocate P4 (426 KB) due to premature partition splitting!`,
    explanation: `1. In First Fit: P1 takes Block 2 (500 KB), leaving 288 KB. P2 takes Block 5 (600 KB), leaving 183 KB. When P4 (426 KB) arrives, no single remaining block can satisfy it, so P4 remains unallocated.
2. In Best Fit: P1 is matched with Block 4 (300 KB), P2 with Block 2 (500 KB), P3 with Block 3 (200 KB), leaving the large Block 5 (600 KB) intact for P4 (426 KB).
3. Best Fit successfully allocates all 4 processes, clearly proving the advantage of preserving large memory partitions.`,
    result: "Implemented and compared First Fit and Best Fit memory allocation strategies, demonstrating how Best Fit preserves large contiguous blocks for subsequent high-memory requests.",
    vivaQuestions: [
      { q: "What is the difference between First Fit and Best Fit?", a: "First Fit chooses the first hole that fits; Best Fit searches the entire memory to pick the smallest hole that fits." },
      { q: "What is Worst Fit allocation?", a: "Worst Fit allocates the largest available hole, leaving the largest leftover fragment." },
      { q: "How can external fragmentation be resolved in contiguous allocation?", a: "By compaction (relocating active processes to one end of memory to consolidate free space into one large block) or by using Paging/Segmentation." }
    ]
  }
];
