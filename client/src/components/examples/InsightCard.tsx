import InsightCard from "../InsightCard";

export default function InsightCardExample() {
  return (
    <div className="p-6 max-w-md">
      <InsightCard
        title="React Hooks 的使用心得"
        excerpt="在使用 React Hooks 一段時間後，我發現它們大大簡化了狀態管理和副作用處理。特別是 useEffect 和 useCallback 的組合使用..."
        tags={["React", "JavaScript", "前端"]}
        date="2024年11月7日"
        onReadMore={() => console.log("Read more clicked")}
      />
    </div>
  );
}
