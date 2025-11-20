import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "已複製",
      description: "程式碼已複製到剪貼簿",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-card-border">
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-card-border">
        <span className="text-sm font-mono text-muted-foreground">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="gap-2"
          data-testid="button-copy-code"
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
      <div className="p-4 bg-card overflow-x-auto">
        <pre className="font-mono text-sm">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}
