import { Button } from "@/components/ui/button";
import { Code, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Futuristic_cyberpunk_tech_hero_575f1719.png";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl top-20 left-20 animate-float" />
        <div
          className="absolute w-96 h-96 bg-chart-2/20 rounded-full blur-3xl bottom-20 right-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
          <span className="text-sm font-mono text-primary">未來程式學習平台</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-6 leading-relaxed">
          <span className="block mb-2">與</span>
          <span className="block bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent mb-2">
            hihiprogamer
          </span>
          <span className="block text-foreground">一起學習程式</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          探索酷炫的程式教學世界，分享心得、記錄日記、深入學習各種程式技術。
          打造屬於你的程式設計之路。
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
            data-testid="button-start-learning"
          >
            <Code className="w-5 h-5" />
            開始學習
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            data-testid="button-view-tutorials"
          >
            查看教學
          </Button>
        </div>
      </div>
    </div>
  );
}
