import InsightCard from "@/components/InsightCard";
import { Lightbulb } from "lucide-react";

export default function Insights() {
  const insights = [
    {
      title: "React Hooks 的使用心得",
      excerpt: "在使用 React Hooks 一段時間後，我發現它們大大簡化了狀態管理和副作用處理。特別是 useEffect 和 useCallback 的組合使用，能有效避免不必要的重新渲染...",
      tags: ["React", "JavaScript", "前端"],
      date: "2024-11-07",
    },
    {
      title: "TypeScript 讓代碼更可靠",
      excerpt: "從 JavaScript 遷移到 TypeScript 的過程中，最大的收穫是型別系統帶來的安全感。雖然初期需要投入時間學習型別定義，但長期來看大幅減少了執行時期的錯誤...",
      tags: ["TypeScript", "開發經驗"],
      date: "2024-11-06",
    },
    {
      title: "前端性能優化實戰",
      excerpt: "分享在實際專案中應用的性能優化技巧，包括代碼分割、懶載入、圖片優化等方法。這些技巧讓我們的應用載入速度提升了 40%...",
      tags: ["性能", "優化", "實戰"],
      date: "2024-11-05",
    },
    {
      title: "Git 工作流程最佳實踐",
      excerpt: "在團隊協作中，良好的 Git 工作流程至關重要。分享我們團隊採用的分支策略和 commit 規範，有效提升了開發效率...",
      tags: ["Git", "團隊協作"],
      date: "2024-11-04",
    },
    {
      title: "CSS Grid 佈局心得",
      excerpt: "CSS Grid 是現代網頁佈局的強大工具。通過實際案例分享如何運用 Grid 創建複雜的響應式佈局，讓設計實現更加靈活...",
      tags: ["CSS", "佈局", "設計"],
      date: "2024-11-03",
    },
    {
      title: "API 設計原則與實踐",
      excerpt: "設計 RESTful API 時需要考慮的重要原則，包括資源命名、HTTP 方法使用、錯誤處理等。好的 API 設計能大幅提升開發體驗...",
      tags: ["API", "後端", "設計"],
      date: "2024-11-02",
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary">程式開發心得</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              心得分享
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            分享程式開發過程中的經驗、思考與學習心得
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              {...insight}
              onReadMore={() => console.log(`Reading: ${insight.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
