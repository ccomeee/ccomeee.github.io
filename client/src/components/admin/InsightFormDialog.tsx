import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertInsightSchema, type Insight, type InsertInsight } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InsightFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insight: Insight | null;
}

export default function InsightFormDialog({
  open,
  onOpenChange,
  insight,
}: InsightFormDialogProps) {
  const { toast } = useToast();

  const form = useForm<InsertInsight>({
    resolver: zodResolver(insertInsightSchema),
    defaultValues: insight || {
      title: "",
      excerpt: "",
      content: "",
      tags: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInsight) => {
      if (insight) {
        return await apiRequest("PATCH", `/api/insights/${insight.id}`, data);
      } else {
        return await apiRequest("POST", "/api/insights", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights"] });
      toast({
        title: insight ? "更新成功" : "創建成功",
        description: insight ? "心得已成功更新" : "心得已成功創建",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "操作失敗",
        description: "無法保存心得，請稍後再試",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInsight) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{insight ? "編輯心得" : "新增心得"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>標題</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="輸入心得標題" data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>摘要</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="簡短描述這篇心得的內容"
                      rows={2}
                      data-testid="input-excerpt"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>內容</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="詳細內容..."
                      rows={8}
                      data-testid="input-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>標籤（以逗號分隔）</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean);
                        field.onChange(tags);
                      }}
                      placeholder="React, TypeScript, 前端"
                      data-testid="input-tags"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                data-testid="button-submit"
              >
                {mutation.isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
