import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TutorialFormDialog from "./TutorialFormDialog";
import type { Tutorial } from "@shared/schema";

export default function AdminTutorials() {
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: tutorials = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/tutorials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tutorials"] });
      toast({
        title: "刪除成功",
        description: "教學已成功刪除",
      });
    },
    onError: () => {
      toast({
        title: "刪除失敗",
        description: "無法刪除教學，請稍後再試",
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
        <h2 className="text-2xl font-bold">教學列表</h2>
        <Button
          onClick={() => {
            setEditingTutorial(null);
            setDialogOpen(true);
          }}
          className="gap-2"
          data-testid="button-create-tutorial"
        >
          <Plus className="w-4 h-4" />
          新增教學
        </Button>
      </div>

      <div className="grid gap-4">
        {tutorials.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            還沒有任何教學，點擊上方按鈕新增第一個教學吧！
          </Card>
        ) : (
          tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="p-6 hover-elevate" data-testid={`card-admin-tutorial-${tutorial.id}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">
                      {tutorial.language}
                    </span>
                    <span>{tutorial.difficulty}</span>
                    <span>{tutorial.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingTutorial(tutorial);
                      setDialogOpen(true);
                    }}
                    data-testid="button-edit-tutorial"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(tutorial.id)}
                    disabled={deleteMutation.isPending}
                    data-testid="button-delete-tutorial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <TutorialFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tutorial={editingTutorial}
      />
    </div>
  );
}
