import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, TrendingUp } from "lucide-react";

interface TutorialCardProps {
  title: string;
  description: string;
  language: string;
  difficulty: "初級" | "中級" | "高級";
  duration: string;
  icon?: React.ReactNode;
  onStart?: () => void;
}

export default function TutorialCard({
  title,
  description,
  language,
  difficulty,
  duration,
  icon,
  onStart,
}: TutorialCardProps) {
  const difficultyColors = {
    初級: "bg-green-500/10 text-green-500 border-green-500/20",
    中級: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    高級: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Card
      className="group p-6 hover-elevate transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border-card-border flex flex-col h-full"
      data-testid={`card-tutorial-${title}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          {icon || <BookOpen className="w-6 h-6 text-primary" />}
        </div>
        <Badge
          variant="outline"
          className={difficultyColors[difficulty]}
          data-testid="badge-difficulty"
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          {difficulty}
        </Badge>
      </div>

      <h3 className="text-xl font-mono font-semibold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-muted-foreground mb-4 flex-1">{description}</p>

      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Badge variant="secondary" data-testid="badge-language">
            {language}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>

      <Button
        className="w-full gap-2"
        onClick={onStart}
        data-testid="button-start-tutorial"
      >
        開始學習
        <BookOpen className="w-4 h-4" />
      </Button>
    </Card>
  );
}
