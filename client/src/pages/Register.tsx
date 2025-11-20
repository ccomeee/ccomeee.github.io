import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, type RegisterUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: undefined,
      firstName: undefined,
      lastName: undefined,
    },
  });

  const onSubmit = async (data: RegisterUser) => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/auth/register", data);

      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "註冊成功",
        description: "歡迎加入！",
      });

      setLocation("/");
    } catch (error: any) {
      toast({
        title: "註冊失敗",
        description: error.message || "註冊過程中發生錯誤",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-card/30 to-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-primary" />
            註冊
          </CardTitle>
          <CardDescription>創建新帳號開始使用</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用戶名 *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="請輸入用戶名"
                        {...field}
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密碼 *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="至少6個字符"
                        {...field}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件（選填）</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名（選填）</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="名"
                          {...field}
                          data-testid="input-firstname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>姓（選填）</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="姓"
                          {...field}
                          data-testid="input-lastname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-register"
              >
                {isLoading ? "註冊中..." : "註冊"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            已有帳號？{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setLocation("/login")}
              data-testid="link-login"
            >
              立即登入
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
