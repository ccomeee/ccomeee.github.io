import DiaryEntry from "@/components/DiaryEntry";
import { BookOpen } from "lucide-react";

export default function Diary() {
  const diaryEntries = [
    {
      title: "完成 React 專案重構",
      content: "今天終於完成了長達兩週的專案重構工作。將 class component 全部改寫為 functional component，並引入了 TypeScript。雖然過程辛苦，但看到更乾淨的代碼結構，一切都值得了。",
      date: "2024-11-07",
      tags: ["React", "重構", "TypeScript"],
    },
    {
      title: "學習 Next.js 的第一天",
      content: "開始探索 Next.js 框架，SSR 和 SSG 的概念非常有趣。App Router 的檔案系統路由設計很直觀，期待深入學習更多進階功能。",
      date: "2024-11-06",
      tags: ["Next.js", "學習"],
    },
    {
      title: "解決了一個棘手的記憶體洩漏問題",
      content: "花了整個下午 debug 記憶體洩漏問題，最後發現是 useEffect 中沒有正確清理事件監聽器。這次經驗讓我更加重視副作用的清理邏輯。",
      date: "2024-11-05",
      tags: ["Debug", "性能"],
    },
    {
      title: "參加技術分享會心得",
      content: "今天參加了公司的技術分享會，同事分享了微前端架構的實踐經驗。學到了很多關於模組聯邦和跨應用通訊的知識，回去要好好研究一下。",
      date: "2024-11-04",
      tags: ["技術分享", "微前端"],
    },
    {
      title: "CSS 動畫實驗",
      content: "嘗試用 CSS 和 Framer Motion 創建了一些有趣的動畫效果。發現適當的動畫能大幅提升使用者體驗，但也要注意不要過度使用影響性能。",
      date: "2024-11-03",
      tags: ["CSS", "動畫", "UX"],
    },
    {
      title: "開始寫技術部落格",
      content: "決定開始寫技術部落格，記錄學習過程和開發心得。希望能幫助到其他開發者，也能整理自己的思路。",
      date: "2024-11-02",
      tags: ["寫作", "分享"],
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary">學習日記</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              日記
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            記錄每天的學習進度、遇到的問題與解決方案
          </p>
        </div>

        <div className="relative">
          {diaryEntries.map((entry, index) => (
            <DiaryEntry key={index} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
