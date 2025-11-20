import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InsightFormDialog from "./InsightFormDialog";
import type { Insight } from "@shared/schema";

export default function AdminInsights() {
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: insights = [], isLoading } = useQuery<Insight[]>({
    queryKey: ["/api/insights"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/insights/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights"] });
      toast({
        title: "刪除成功",
        description: "心得已成功刪除",
      });
    },
    onError: () => {
      toast({
        title: "刪除失敗",
        description: "無法刪除心得，請稍後再試",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (insight: Insight) => {
    setEditingInsight(insight);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingInsight(null);
    setDialogOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-12">載入中...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">心得列表</h2>
        <Button onClick={handleCreate} className="gap-2" data-testid="button-create-insight">
          <Plus className="w-4 h-4" />
          新增心得
        </Button>
      </div>

      <div className="grid gap-4">
        {insights.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            還沒有任何心得，點擊上方按鈕新增第一篇心得吧！
          </Card>
        ) : (
          insights.map((insight) => (
            <Card key={insight.id} className="p-6 hover-elevate" data-testid={`card-admin-insight-${insight.id}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {insight.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag) => (
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
                    onClick={() => handleEdit(insight)}
                    data-testid="button-edit-insight"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(insight.id)}
                    disabled={deleteMutation.isPending}
                    data-testid="button-delete-insight"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <InsightFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        insight={editingInsight}
      />
    </div>
  );
}
