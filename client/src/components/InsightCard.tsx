import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";

interface InsightCardProps {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  onReadMore?: () => void;
}

export default function InsightCard({
  title,
  excerpt,
  tags,
  date,
  onReadMore,
}: InsightCardProps) {
  return (
    <Card
      className="group p-6 hover-elevate transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border-card-border"
      data-testid={`card-insight-${title}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-md bg-primary/10">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-mono font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" data-testid={`badge-tag-${tag}`}>
            {tag}
          </Badge>
        ))}
      </div>

      <Button
        variant="ghost"
        className="gap-2 group-hover:text-primary"
        onClick={onReadMore}
        data-testid="button-read-more"
      >
        閱讀更多
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
}
