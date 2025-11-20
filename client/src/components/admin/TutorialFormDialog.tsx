import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertTutorialSchema, type Tutorial, type InsertTutorial } from "@shared/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TutorialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutorial: Tutorial | null;
}

export default function TutorialFormDialog({
  open,
  onOpenChange,
  tutorial,
}: TutorialFormDialogProps) {
  const { toast } = useToast();

  const form = useForm<InsertTutorial>({
    resolver: zodResolver(insertTutorialSchema),
    defaultValues: tutorial || {
      title: "",
      description: "",
      content: "",
      language: "",
      difficulty: "",
      duration: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertTutorial) => {
      if (tutorial) {
        return await apiRequest("PATCH", `/api/tutorials/${tutorial.id}`, data);
      } else {
        return await apiRequest("POST", "/api/tutorials", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tutorials"] });
      toast({
        title: tutorial ? "更新成功" : "創建成功",
        description: tutorial ? "教學已成功更新" : "教學已成功創建",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "操作失敗",
        description: "無法保存教學，請稍後再試",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTutorial) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tutorial ? "編輯教學" : "新增教學"}</DialogTitle>
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
                    <Input {...field} placeholder="輸入教學標題" data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="簡短描述這個教學的內容"
                      rows={2}
                      data-testid="input-description"
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
                      placeholder="詳細教學內容..."
                      rows={8}
                      data-testid="input-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>語言</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="JavaScript" data-testid="input-language" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>難度</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-difficulty">
                          <SelectValue placeholder="選擇難度" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="初級">初級</SelectItem>
                        <SelectItem value="中級">中級</SelectItem>
                        <SelectItem value="高級">高級</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>時長</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="2小時" data-testid="input-duration" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
