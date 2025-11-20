import Hero from "@/components/Hero";
import InsightCard from "@/components/InsightCard";
import TutorialCard from "@/components/TutorialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, FileText, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const featuredInsights = [
    {
      title: "React 性能優化技巧",
      excerpt: "深入探討 React 應用的性能優化方法，包括 memo、useMemo 和 useCallback 的最佳實踐...",
      tags: ["React", "性能", "優化"],
      date: "2024-11-05",
    },
    {
      title: "TypeScript 進階型別",
      excerpt: "學習 TypeScript 的進階型別系統，掌握泛型、條件型別和映射型別的使用方法...",
      tags: ["TypeScript", "型別系統"],
      date: "2024-11-03",
    },
  ];

  const featuredTutorials = [
    {
      title: "JavaScript 基礎入門",
      description: "從零開始學習 JavaScript，掌握變數、函數、迴圈等基本概念。",
      language: "JavaScript",
      difficulty: "初級" as const,
      duration: "2小時",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "React 完整指南",
      description: "完整學習 React 框架，從基礎到進階的全方位課程。",
      language: "React",
      difficulty: "中級" as const,
      duration: "8小時",
      icon: <FileText className="w-6 h-6 text-primary" />,
    },
    {
      title: "Node.js 後端開發",
      description: "建立強大的後端應用，學習 Express、資料庫整合等技術。",
      language: "Node.js",
      difficulty: "中級" as const,
      duration: "6小時",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-12 md:py-24 px-4 md:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-3">
                最新心得分享
              </h2>
              <p className="text-muted-foreground">
                探索程式開發的心得與經驗
              </p>
            </div>
            <Link href="/insights" data-testid="link-view-all-insights">
              <Button variant="outline" className="gap-2">
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredInsights.map((insight, index) => (
              <InsightCard
                key={index}
                {...insight}
                onReadMore={() => console.log(`Reading: ${insight.title}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-3">
                精選教學課程
              </h2>
              <p className="text-muted-foreground">
                系統化學習程式設計技能
              </p>
            </div>
            <Link href="/tutorials" data-testid="link-view-all-tutorials">
              <Button variant="outline" className="gap-2">
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map((tutorial, index) => (
              <TutorialCard
                key={index}
                {...tutorial}
                onStart={() => console.log(`Starting: ${tutorial.title}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
