import TutorialCard from "@/components/TutorialCard";
import CodeBlock from "@/components/CodeBlock";
import { Code2, FileCode, Server, Database } from "lucide-react";

export default function Tutorials() {
  const tutorials = [
    {
      title: "JavaScript 基礎入門",
      description: "從零開始學習 JavaScript，掌握變數、函數、迴圈等基本概念，為前端開發打下堅實基礎。",
      language: "JavaScript",
      difficulty: "初級" as const,
      duration: "2小時",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "React 完整指南",
      description: "完整學習 React 框架，從組件基礎到 Hooks、狀態管理的全方位課程。",
      language: "React",
      difficulty: "中級" as const,
      duration: "8小時",
      icon: <FileCode className="w-6 h-6 text-primary" />,
    },
    {
      title: "TypeScript 深度解析",
      description: "深入理解 TypeScript 型別系統，學習泛型、條件型別等進階特性。",
      language: "TypeScript",
      difficulty: "中級" as const,
      duration: "5小時",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Node.js 後端開發",
      description: "建立強大的後端應用，學習 Express、中介軟體、資料庫整合等技術。",
      language: "Node.js",
      difficulty: "中級" as const,
      duration: "6小時",
      icon: <Server className="w-6 h-6 text-primary" />,
    },
    {
      title: "SQL 資料庫設計",
      description: "學習關聯式資料庫設計原則，掌握 SQL 查詢語法和資料庫優化技巧。",
      language: "SQL",
      difficulty: "初級" as const,
      duration: "4小時",
      icon: <Database className="w-6 h-6 text-primary" />,
    },
    {
      title: "Git 版本控制",
      description: "掌握 Git 的核心概念和常用指令，學習分支管理和團隊協作流程。",
      language: "Git",
      difficulty: "初級" as const,
      duration: "3小時",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
  ];

  const sampleCode = `// React Hooks 範例
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      點擊次數: {count}
    </button>
  );
}`;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary">程式教學</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              教學課程
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            系統化的程式教學內容，從基礎到進階全方位學習
          </p>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold font-mono mb-4 text-left">
              程式碼範例預覽
            </h2>
            <CodeBlock code={sampleCode} language="javascript" />
          </div>
        </div>

        <h2 className="text-3xl font-bold font-mono mb-8">所有課程</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <TutorialCard
              key={index}
              {...tutorial}
              onStart={() => console.log(`Starting: ${tutorial.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
