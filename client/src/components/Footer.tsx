import { Link } from "wouter";
import { Code2, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    內容: [
      { label: "心得分享", path: "/insights" },
      { label: "學習日記", path: "/diary" },
      { label: "程式教學", path: "/tutorials" },
    ],
    資源: [
      { label: "關於我", path: "/contact" },
      { label: "聯繫方式", path: "/contact" },
    ],
  };

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-mono font-bold">hihiprogamer</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              未來感的程式教學平台，致力於分享高品質的程式設計內容，幫助開發者成長。
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:arobloxderen@gmail.com"
                className="p-2 rounded-md bg-muted hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid="link-footer-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={`${link.path}-${index}`}>
                    <Link 
                      href={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-footer-${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} hihiprogamer. 保留所有權利。
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
