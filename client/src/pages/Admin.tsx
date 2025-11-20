import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import AdminInsights from "@/components/admin/AdminInsights";
import AdminDiary from "@/components/admin/AdminDiary";
import AdminTutorials from "@/components/admin/AdminTutorials";
import type { User } from "@shared/schema";

export default function Admin() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "需要登入",
        description: "正在前往登入頁面...",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/login");
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-mono">管理後台</h1>
              <p className="text-muted-foreground">
                歡迎回來, {(user as User)?.firstName || (user as User)?.username}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={async () => {
              try {
                await apiRequest("POST", "/api/auth/logout");
                await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
                toast({
                  title: "登出成功",
                  description: "期待您再次光臨！",
                });
                setLocation("/");
              } catch (error) {
                toast({
                  title: "登出失敗",
                  description: "請稍後再試",
                  variant: "destructive",
                });
              }
            }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            登出
          </Button>
        </div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="insights" data-testid="tab-insights">
              心得管理
            </TabsTrigger>
            <TabsTrigger value="diary" data-testid="tab-diary">
              日記管理
            </TabsTrigger>
            <TabsTrigger value="tutorials" data-testid="tab-tutorials">
              教學管理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <AdminInsights />
          </TabsContent>

          <TabsContent value="diary">
            <AdminDiary />
          </TabsContent>

          <TabsContent value="tutorials">
            <AdminTutorials />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
