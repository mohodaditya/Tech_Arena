import React, { useState, useRef } from 'react';

const CodeEditor = ({ code, setCode, language }) => {
    const [lines, setLines] = useState(code.split('\n').length);
    const textareaRef = useRef(null);
    const preRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;
        setCode(val);
        setLines(val.split('\n').length);
    };

    const handleScroll = () => {
        if (textareaRef.current && preRef.current) {
            preRef.current.scrollTop = textareaRef.current.scrollTop;
            preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = code.substring(0, start) + '    ' + code.substring(end);

            // We need to manually fire the change event or update state directly
            // But standard way is to update state and then reset cursor
            setCode(newValue);

            // Move cursor
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    };

    // Single-pass syntax highlighting to avoid regex-inside-HTML bugs
    const highlightCode = (fullCode) => {
        if (!fullCode) return '';

        const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const keywords = new Set([
            'function', 'var', 'let', 'const', 'return', 'if', 'else', 'for', 'while',
            'class', 'import', 'from', 'export', 'default', 'new', 'typeof', 'instanceof',
            'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw',
            'async', 'await', 'yield', 'of', 'in', 'do', 'void', 'delete',
            'def', 'self', 'print', 'elif', 'lambda', 'pass', 'raise', 'with', 'as', 'not', 'and', 'or', 'is', 'None', 'True', 'False',
            'public', 'private', 'protected', 'static', 'final', 'abstract', 'interface', 'extends', 'implements', 'package',
            'int', 'long', 'double', 'float', 'char', 'boolean', 'byte', 'short', 'void', 'String',
            'include', 'using', 'namespace', 'struct', 'template', 'typename', 'auto', 'nullptr', 'cout', 'cin', 'endl', 'vector', 'string', 'map', 'set', 'queue', 'stack', 'pair'
        ]);
        const builtins = new Set(['true', 'false', 'null', 'undefined', 'this', 'super', 'None', 'True', 'False', 'System', 'Math', 'Arrays', 'Integer', 'Collections']);

        // Tokenize with a single regex that captures strings, comments, words, numbers, and everything else
        const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b[A-Za-z_]\w*\b|\b\d+\.?\d*\b|[^\s]|\s+)/g;

        let html = '';
        let match;
        while ((match = tokenRegex.exec(fullCode)) !== null) {
            const tok = match[0];
            const esc = escape(tok);

            if (tok.startsWith('//') || tok.startsWith('/*') || tok.startsWith('#')) {
                html += `<span style="color:#6a9955">${esc}</span>`;
            } else if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'")) || (tok.startsWith('`') && tok.endsWith('`'))) {
                html += `<span style="color:#ce9178">${esc}</span>`;
            } else if (/^\d/.test(tok)) {
                html += `<span style="color:#b5cea8">${esc}</span>`;
            } else if (builtins.has(tok)) {
                html += `<span style="color:#569cd6">${esc}</span>`;
            } else if (keywords.has(tok)) {
                html += `<span style="color:#569cd6;font-weight:bold">${esc}</span>`;
            } else if (/^[A-Z]/.test(tok)) {
                html += `<span style="color:#4ec9b0">${esc}</span>`;
            } else {
                html += esc;
            }
        }
        return html;
    };

    return (
        <div className="relative flex h-full border border-[#333333] rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-sm shadow-inner group">
            {/* Line Numbers */}
            <div className="flex-none w-12 bg-[#1e1e1e] border-r border-[#333333] text-right py-4 px-2 select-none z-10">
                {Array.from({ length: Math.max(lines, 20) }).map((_, i) => (
                    <div key={i} className="text-[#858585] leading-6 text-xs">
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Editor Container */}
            <div className="relative flex-1 h-full overflow-hidden">
                {/* Syntax Highlight Layer */}
                <pre
                    ref={preRef}
                    className="absolute inset-0 p-4 m-0 bg-transparent pointer-events-none whitespace-pre font-mono leading-6 overflow-hidden"
                    aria-hidden="true"
                >
                    <code
                        className="font-mono text-[#d4d4d4]"
                        dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
                    />
                </pre>

                {/* Input Layer */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    className="absolute inset-0 w-full h-full p-4 bg-transparent resize-none border-0 focus:ring-0 leading-6 text-transparent caret-white outline-none font-mono z-0 selection:bg-[#264f78]"
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    style={{ color: 'transparent' }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
