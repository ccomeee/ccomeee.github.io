import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const email = "arobloxderen@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: "已複製",
      description: "電子郵件已複製到剪貼簿",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6" data-testid="section-contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4 md:mb-6">
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            聯繫我
          </span>
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          有任何問題或合作機會？隨時與我聯繫
        </p>

        <Card className="p-8 md:p-12 backdrop-blur-sm bg-card/80 border-2 border-primary/20 hover-elevate transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-mono font-semibold mb-2">
                hihiprogamer
              </h3>
              <p className="text-muted-foreground mb-6">程式設計講師 & 開發者</p>

              <div className="flex items-center gap-3 justify-center flex-wrap">
                <a
                  href={`mailto:${email}`}
                  className="text-lg font-mono text-primary hover:underline"
                  data-testid="link-email"
                >
                  {email}
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyEmail}
                  className="gap-2"
                  data-testid="button-copy-email"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      複製
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="gap-2 mt-4"
              onClick={() => window.open(`mailto:${email}`, "_blank")}
              data-testid="button-send-email"
            >
              <Mail className="w-5 h-5" />
              發送郵件
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
