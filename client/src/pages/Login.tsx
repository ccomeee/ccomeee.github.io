import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUser } from "@shared/schema";
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
import { LogIn } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/auth/login", data);

      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "登入成功",
        description: "歡迎回來！",
      });

      setLocation("/");
    } catch (error: any) {
      toast({
        title: "登入失敗",
        description: error.message || "用戶名或密碼錯誤",
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
            <LogIn className="w-6 h-6 text-primary" />
            登入
          </CardTitle>
          <CardDescription>輸入您的帳號密碼以登入</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用戶名</FormLabel>
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
                    <FormLabel>密碼</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="請輸入密碼"
                        {...field}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "登入中..." : "登入"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            還沒有帳號？{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setLocation("/register")}
              data-testid="link-register"
            >
              立即註冊
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
