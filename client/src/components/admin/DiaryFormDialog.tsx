import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertDiaryEntrySchema, type DiaryEntry, type InsertDiaryEntry } from "@shared/schema";
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

interface DiaryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: DiaryEntry | null;
}

export default function DiaryFormDialog({
  open,
  onOpenChange,
  entry,
}: DiaryFormDialogProps) {
  const { toast } = useToast();

  const form = useForm<InsertDiaryEntry>({
    resolver: zodResolver(insertDiaryEntrySchema),
    defaultValues: entry || {
      title: "",
      content: "",
      tags: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDiaryEntry) => {
      if (entry) {
        return await apiRequest("PATCH", `/api/diary/${entry.id}`, data);
      } else {
        return await apiRequest("POST", "/api/diary", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diary"] });
      toast({
        title: entry ? "更新成功" : "創建成功",
        description: entry ? "日記已成功更新" : "日記已成功創建",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "操作失敗",
        description: "無法保存日記，請稍後再試",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDiaryEntry) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{entry ? "編輯日記" : "新增日記"}</DialogTitle>
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
                    <Input {...field} placeholder="輸入日記標題" data-testid="input-title" />
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
                      placeholder="今天的學習記錄..."
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
                      placeholder="學習記錄, Debug"
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
