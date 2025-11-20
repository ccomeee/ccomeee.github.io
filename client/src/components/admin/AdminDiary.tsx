import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DiaryFormDialog from "./DiaryFormDialog";
import type { DiaryEntry } from "@shared/schema";
import { format } from "date-fns";

export default function AdminDiary() {
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: entries = [], isLoading } = useQuery<DiaryEntry[]>({
    queryKey: ["/api/diary"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/diary/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diary"] });
      toast({
        title: "刪除成功",
        description: "日記已成功刪除",
      });
    },
    onError: () => {
      toast({
        title: "刪除失敗",
        description: "無法刪除日記，請稍後再試",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div className="text-center py-12">載入中...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">日記列表</h2>
        <Button
          onClick={() => {
            setEditingEntry(null);
            setDialogOpen(true);
          }}
          className="gap-2"
          data-testid="button-create-diary"
        >
          <Plus className="w-4 h-4" />
          新增日記
        </Button>
      </div>

      <div className="grid gap-4">
        {entries.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            還沒有任何日記，點擊上方按鈕新增第一篇日記吧！
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="p-6 hover-elevate" data-testid={`card-admin-diary-${entry.id}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{entry.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(entry.date!), "yyyy-MM-dd")}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {entry.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingEntry(entry);
                      setDialogOpen(true);
                    }}
                    data-testid="button-edit-diary"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(entry.id)}
                    disabled={deleteMutation.isPending}
                    data-testid="button-delete-diary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <DiaryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={editingEntry}
      />
    </div>
  );
}
