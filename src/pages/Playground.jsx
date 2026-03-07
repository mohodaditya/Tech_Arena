import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Code2, AlertCircle, CheckCircle2, Terminal, RotateCcw, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

// Judge0 CE language IDs
const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript (Node.js)', langId: 63 },
    { value: 'python', label: 'Python 3', langId: 71 },
    { value: 'java', label: 'Java', langId: 62 },
    { value: 'cpp', label: 'C++', langId: 54 },
    { value: 'c', label: 'C', langId: 50 },
    { value: 'typescript', label: 'TypeScript', langId: 74 },
    { value: 'ruby', label: 'Ruby', langId: 72 },
    { value: 'go', label: 'Go', langId: 60 },
    { value: 'rust', label: 'Rust', langId: 73 },
    { value: 'php', label: 'PHP', langId: 68 },
];

const DEFAULT_CODE = {
    javascript: `// JavaScript Playground
console.log("Hello, Playground!");

// Try writing your code here
const greet = (name) => \`Welcome to Tech Arena, \${name}!\`;
console.log(greet("Developer"));
`,
    python: `# Python Playground
print("Hello, Playground!")

# Try writing your code here
def greet(name):
    return f"Welcome to Tech Arena, {name}!"

print(greet("Developer"))
`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Playground!");

        // Try writing your code here
        String name = "Developer";
        System.out.println("Welcome to Tech Arena, " + name + "!");
    }
}
`,
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello, Playground!" << endl;

    // Try writing your code here
    string name = "Developer";
    cout << "Welcome to Tech Arena, " << name << "!" << endl;
    return 0;
}
`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, Playground!\\n");

    // Try writing your code here
    char name[] = "Developer";
    printf("Welcome to Tech Arena, %s!\\n", name);
    return 0;
}
`,
    typescript: `// TypeScript Playground
const greeting: string = "Hello, Playground!";
console.log(greeting);

const greet = (name: string): string => \`Welcome to Tech Arena, \${name}!\`;
console.log(greet("Developer"));
`,
    ruby: `# Ruby Playground
puts "Hello, Playground!"

def greet(name)
  "Welcome to Tech Arena, #{name}!"
end

puts greet("Developer")
`,
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Playground!")

    name := "Developer"
    fmt.Printf("Welcome to Tech Arena, %s!\\n", name)
}
`,
    rust: `fn main() {
    println!("Hello, Playground!");

    let name = "Developer";
    println!("Welcome to Tech Arena, {}!", name);
}
`,
    php: `<?php
echo "Hello, Playground!\\n";

$name = "Developer";
echo "Welcome to Tech Arena, $name!\\n";
?>
`
};

const JUDGE0_API = 'https://ce.judge0.com';

const Playground = () => {
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].value]);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const [stdinInput, setStdinInput] = useState('');
    const textareaRef = useRef(null);
    const preRef = useRef(null);
    const lineNumberRef = useRef(null);

    const lineCount = code.split('\n').length;

    const handleLanguageChange = (e) => {
        const selectedLang = LANGUAGES.find(l => l.value === e.target.value);
        setLanguage(selectedLang);
        setCode(DEFAULT_CODE[selectedLang.value]);
        setOutput(null);
    };

    const handleReset = () => {
        setCode(DEFAULT_CODE[language.value]);
        setOutput(null);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleScroll = () => {
        if (textareaRef.current && preRef.current) {
            preRef.current.scrollTop = textareaRef.current.scrollTop;
            preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
        if (textareaRef.current && lineNumberRef.current) {
            lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = code.substring(0, start) + '    ' + code.substring(end);
            setCode(newValue);
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    };

    // Simple syntax highlighting
    const highlightCode = (rawCode) => {
        if (!rawCode) return '';

        // First, escape HTML entities
        let html = rawCode
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Tokenize: extract strings & comments first, then highlight keywords in the rest
        const tokens = [];
        // Match single-line comments (//) and strings ("..." or '...')
        const tokenRegex = /(\/\/[^\n]*|'[^']*'|"[^"]*")/g;
        let match;
        let lastIndex = 0;

        while ((match = tokenRegex.exec(html)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ type: 'code', text: html.slice(lastIndex, match.index) });
            }
            if (match[0].startsWith('//')) {
                tokens.push({ type: 'comment', text: match[0] });
            } else {
                tokens.push({ type: 'string', text: match[0] });
            }
            lastIndex = tokenRegex.lastIndex;
        }
        if (lastIndex < html.length) {
            tokens.push({ type: 'code', text: html.slice(lastIndex) });
        }

        // Highlight keywords only in code tokens
        const keywordRegex = /\b(function|var|let|const|return|if|else|for|while|class|import|from|export|default|def|print|int|void|string|char|include|using|namespace|public|private|static|new|this|super|try|catch|finally|throw|async|await|fn|mut|pub|use|mod|struct|impl|enum|match|loop)\b/g;
        const boolRegex = /\b(true|false|null|undefined|None|True|False|nil|NULL)\b/g;
        const numberRegex = /\b(\d+)\b/g;

        return tokens.map(token => {
            if (token.type === 'comment') {
                return `<span style="color:#6a9955">${token.text}</span>`;
            }
            if (token.type === 'string') {
                return `<span style="color:#ce9178">${token.text}</span>`;
            }
            // Code token: highlight keywords, booleans, numbers
            return token.text
                .replace(keywordRegex, '<span style="color:#569cd6;font-weight:bold">$1</span>')
                .replace(boolRegex, '<span style="color:#569cd6">$1</span>')
                .replace(numberRegex, '<span style="color:#b5cea8">$1</span>');
        }).join('');
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        try {
            // Base64 encode to handle special characters
            const base64Code = btoa(unescape(encodeURIComponent(code)));
            // Ensure stdin ends with newline so input() / scanf etc. work properly
            const stdinValue = stdinInput ? (stdinInput.endsWith('\n') ? stdinInput : stdinInput + '\n') : '';
            const base64Stdin = btoa(unescape(encodeURIComponent(stdinValue)));

            const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true&wait=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source_code: base64Code,
                    language_id: language.langId,
                    stdin: base64Stdin
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status.id <= 2) {
                // Still processing, poll for result
                setOutput({ type: 'info', message: 'Processing...' });
            } else if (data.status.id === 3) {
                // Accepted - decode base64 stdout
                const stdout = data.stdout ? decodeURIComponent(escape(atob(data.stdout))) : '';
                setOutput({
                    type: 'success',
                    message: stdout || 'Code executed successfully with no output.',
                    time: data.time,
                    memory: data.memory
                });
            } else if (data.status.id === 6) {
                // Compilation error - decode base64
                const compileOutput = data.compile_output ? decodeURIComponent(escape(atob(data.compile_output))) : '';
                setOutput({
                    type: 'error',
                    message: compileOutput || 'Compilation error'
                });
            } else {
                // Runtime error or other - decode base64
                const stderr = data.stderr ? decodeURIComponent(escape(atob(data.stderr))) : '';
                const compileOutput = data.compile_output ? decodeURIComponent(escape(atob(data.compile_output))) : '';
                setOutput({
                    type: 'error',
                    message: stderr || compileOutput || data.message || `Error: ${data.status.description}`
                });
            }
        } catch (error) {
            setOutput({ type: 'error', message: `Execution failed: ${error.message}` });
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-[#0d1117] text-[#222222] dark:text-gray-200 flex flex-col transition-colors duration-300">
            <Navbar />

            {/* Header Bar */}
            <div className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] px-3 sm:px-6 py-3 sm:py-4 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 bg-gradient-to-br from-[#FF5A5F] to-[#FF8E53] rounded-xl shadow-lg shadow-[#FF5A5F]/20">
                            <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-white">Code Playground</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Write, run, and experiment with code</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        {/* Language Selector */}
                        <select
                            value={language.value}
                            onChange={handleLanguageChange}
                            className="bg-gray-100 dark:bg-[#21262d] border border-gray-200 dark:border-[#30363d] rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-2 text-[#222222] dark:text-gray-300 focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none cursor-pointer hover:border-gray-300 dark:hover:border-[#484f58] transition-colors"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </select>

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="p-2 bg-gray-100 dark:bg-[#21262d] border border-gray-200 dark:border-[#30363d] rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#222222] dark:hover:text-white hover:border-gray-300 dark:hover:border-[#484f58] transition-all"
                            title="Reset Code"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>

                        {/* Copy */}
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-gray-100 dark:bg-[#21262d] border border-gray-200 dark:border-[#30363d] rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#222222] dark:hover:text-white hover:border-gray-300 dark:hover:border-[#484f58] transition-all"
                            title="Copy Code"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>

                        {/* Run Button */}
                        <button
                            onClick={handleRunCode}
                            disabled={isRunning || !code.trim()}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] hover:from-[#ff4247] hover:to-[#FF7A3F] text-white rounded-lg text-xs sm:text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF5A5F]/25 hover:shadow-[#FF5A5F]/40"
                        >
                            {isRunning ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                >
                                    <Play className="h-4 w-4" />
                                </motion.div>
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-3 sm:px-6 py-3 sm:py-5 gap-3 sm:gap-4">

                {/* Code Editor — always dark theme for readability */}
                <div className="flex-1 bg-[#1e1e1e] rounded-xl border border-gray-300 dark:border-[#30363d] overflow-hidden shadow-2xl min-h-[250px] sm:min-h-[420px] flex flex-col">
                    {/* Editor Tab */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                            </div>
                            <span className="text-xs text-gray-400 ml-3 font-mono">
                                main.{language.value === 'cpp' ? 'cpp' : language.value === 'javascript' ? 'js' : language.value === 'typescript' ? 'ts' : language.value === 'python' ? 'py' : language.value === 'ruby' ? 'rb' : language.value === 'rust' ? 'rs' : language.value}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">{lineCount} lines</span>
                    </div>

                    {/* Editor Body */}
                    <div className="relative flex flex-1 overflow-hidden font-mono text-sm">
                        {/* Line Numbers */}
                        <div
                            ref={lineNumberRef}
                            className="flex-none w-14 bg-[#1e1e1e] border-r border-[#333] text-right py-4 pr-3 pl-2 select-none overflow-hidden"
                        >
                            {Array.from({ length: Math.max(lineCount, 25) }).map((_, i) => (
                                <div key={i} className="leading-6 text-xs text-[#858585]">
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        {/* Editor Area */}
                        <div className="relative flex-1 overflow-hidden">
                            {/* Syntax Highlight Layer */}
                            <pre
                                ref={preRef}
                                className="absolute inset-0 p-4 m-0 bg-transparent pointer-events-none whitespace-pre font-mono leading-6 overflow-hidden text-[#d4d4d4]"
                                aria-hidden="true"
                            >
                                <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
                            </pre>

                            {/* Textarea Input Layer */}
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onScroll={handleScroll}
                                className="absolute inset-0 w-full h-full p-4 bg-transparent resize-none border-0 focus:ring-0 leading-6 text-transparent caret-white outline-none font-mono selection:bg-[#264f78]"
                                spellCheck="false"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                style={{ color: 'transparent', caretColor: 'white' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Unified Terminal */}
                <div className="h-72 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-[#30363d] rounded-xl overflow-hidden shadow-lg flex flex-col transition-colors duration-300">
                    {/* Terminal Header */}
                    <div className="px-4 py-2.5 border-b border-gray-200 dark:border-[#30363d] flex items-center justify-between bg-gray-50 dark:bg-[#161b22] transition-colors duration-300">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                            </div>
                            <Terminal className="h-3.5 w-3.5 text-gray-400 ml-2" />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Terminal</span>
                        </div>
                        {output && (
                            <div className="flex items-center gap-3">
                                {output.time && (
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                        {output.time}s • {Math.round((output.memory || 0) / 1024)} KB
                                    </span>
                                )}
                                <span className={`text-xs font-bold flex items-center gap-1 ${output.type === 'success' ? 'text-green-600 dark:text-green-400' : output.type === 'error' ? 'text-red-500 dark:text-red-400' : 'text-yellow-500 dark:text-yellow-400'}`}>
                                    {output.type === 'success' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                                    {output.type === 'success' ? 'Accepted' : output.type === 'error' ? 'Error' : 'Info'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Output Area */}
                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto" ref={(el) => { if (el && output) el.scrollTop = el.scrollHeight; }}>
                            {!output && !isRunning && (
                                <div className="text-gray-400 dark:text-gray-600 select-none">
                                    <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-400 dark:text-gray-500 italic">Press "Run Code" or ⌘+Enter to execute...</span>
                                </div>
                            )}
                            {isRunning && (
                                <div className="text-gray-500 dark:text-gray-400">
                                    <span className="text-green-600 dark:text-green-400">$</span> Running {language.label}...
                                    <motion.span
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1.2 }}
                                        className="text-[#FF8E53] ml-1"
                                    >
                                        ▌
                                    </motion.span>
                                </div>
                            )}
                            {output && (
                                <>
                                    <div className="text-gray-400 dark:text-gray-500 mb-1">
                                        <span className="text-green-600 dark:text-green-400">$</span> {language.label} executed
                                    </div>
                                    <pre className={`whitespace-pre-wrap ${output.type === 'success' ? 'text-[#222222] dark:text-gray-200' :
                                        output.type === 'error' ? 'text-red-600 dark:text-red-400' :
                                            'text-yellow-600 dark:text-yellow-400'
                                        }`}>
                                        {output.message}</pre>
                                </>
                            )}
                        </div>

                        {/* Input Area (stdin) */}
                        <div className="border-t border-gray-200 dark:border-[#30363d] bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300">
                            <div className="flex items-center px-4 pt-2 pb-1 gap-2">
                                <span className="text-green-600 dark:text-green-400 font-mono text-xs select-none">INPUT</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-600 italic">Type input before running (one value per line)</span>
                            </div>
                            <textarea
                                value={stdinInput}
                                onChange={(e) => setStdinInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleRunCode(); } }}
                                placeholder="Enter input values here, one per line..."
                                rows={2}
                                className="w-full bg-transparent text-[#222222] dark:text-gray-300 text-sm font-mono outline-none resize-none px-4 pb-2 placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground;
