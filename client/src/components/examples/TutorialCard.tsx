import TutorialCard from "../TutorialCard";
import { Code2 } from "lucide-react";

export default function TutorialCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <TutorialCard
        title="JavaScript 基礎入門"
        description="從零開始學習 JavaScript，掌握變數、函數、迴圈等基本概念，為前端開發打下堅實基礎。"
        language="JavaScript"
        difficulty="初級"
        duration="2小時"
        icon={<Code2 className="w-6 h-6 text-primary" />}
        onStart={() => console.log("Start tutorial clicked")}
      />
    </div>
  );
}
