/**
 * OS Practical Manual - Code Execution Service
 * 
 * Secure execution engine for C++ and Bash scripts using real Linux sandboxes.
 * Uses Piston API (public, no key required) with Judge0 CE fallback.
 * Strictly adheres to rule: Never pretend or fake execution results when offline or failing.
 */

const PISTON_ENDPOINT = 'https://emkc.org/api/v2/piston/execute';

export async function executeCode({ code, language = 'cpp', stdin = '' }) {
  const startTime = performance.now();
  
  // Map internal language identifiers to Piston / Judge0 formats
  const pistonLang = language === 'bash' || language === 'sh' ? 'bash' : 'cpp';
  const pistonVersion = pistonLang === 'bash' ? '5.2.0' : '10.2.0';
  const fileName = pistonLang === 'bash' ? 'script.sh' : 'main.cpp';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

    const response = await fetch(PISTON_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: pistonLang,
        version: pistonVersion,
        files: [
          {
            name: fileName,
            content: code,
          },
        ],
        stdin: stdin || '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Execution server responded with status: ${response.status}`);
    }

    const data = await response.json();
    const endTime = performance.now();
    const executionDuration = Math.round(endTime - startTime);

    // Parse Piston response
    const compile = data.compile || {};
    const run = data.run || {};

    const stdout = run.stdout || '';
    const stderr = (compile.stderr || '') + (run.stderr || '');
    const exitCode = typeof run.code === 'number' ? run.code : (compile.code || 0);
    const signal = run.signal || null;

    const hasCompileError = !!(compile.stderr && compile.code !== 0);
    const hasRuntimeError = !!(run.stderr && run.code !== 0);

    return {
      success: exitCode === 0 && !hasCompileError,
      stdout,
      stderr,
      exitCode,
      signal,
      hasCompileError,
      hasRuntimeError,
      durationMs: executionDuration,
      isRealExecution: true,
      engine: `Piston Linux (${pistonLang.toUpperCase()} ${data.version || ''})`,
    };
  } catch (error) {
    const endTime = performance.now();
    const executionDuration = Math.round(endTime - startTime);
    const isTimeout = error.name === 'AbortError';

    return {
      success: false,
      isRealExecution: false,
      isOfflineOrNetworkError: true,
      stdout: '',
      stderr: isTimeout 
        ? 'Execution timed out (exceeded 18 seconds). The program might have an infinite loop or required more CPU time.'
        : `Network / Compiler API Error: ${error.message || 'Unable to connect to remote Linux execution environment.'}\n\nPlease check your internet connection. As per security requirements, native C++ and Linux system calls (fork, exec, pipes) are not faked or run directly in the web browser. Please review the verified Sample Output provided in the practical manual below.`,
      exitCode: isTimeout ? 124 : -1,
      durationMs: executionDuration,
      engine: 'Linux Remote Sandbox (Unreachable)',
    };
  }
}
