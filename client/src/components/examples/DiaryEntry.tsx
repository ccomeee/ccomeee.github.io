import DiaryEntry from "../DiaryEntry";

export default function DiaryEntryExample() {
  return (
    <div className="p-6 max-w-2xl">
      <DiaryEntry
        title="學習 TypeScript 的第一天"
        content="今天開始深入學習 TypeScript，發現型別系統真的能大幅提升開發體驗。雖然一開始需要花時間理解各種型別定義，但長遠來看絕對值得投資時間學習。"
        date="2024-11-07"
        tags={["TypeScript", "學習記錄"]}
      />
    </div>
  );
}
