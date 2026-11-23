"use client";

import { useEffect, useState } from "react";
import { Check, Languages, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "./i18n-context";

const GITHUB_REPO_URL = "https://github.com/WWW-max/tea.md";

export function SiteControls() {
  const { locale, setLocale } = useI18n();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tea-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("tea-theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      {/* GitHub 仓库跳转图标按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        asChild
      >
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          title="GitHub"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 fill-current"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </Button>

      {/* 语言切换下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-2.5 font-medium"
            aria-label="Switch language"
          >
            <Languages className="size-3.5 text-muted-foreground" />
            <span>{locale === "en" ? "EN" : "中文"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocale("zh")}>
            <span>简体中文</span>
            {locale === "zh" && <Check className="size-3.5 text-primary" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale("en")}>
            <span>English</span>
            {locale === "en" && <Check className="size-3.5 text-primary" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 明暗主题切换图标按钮（带平滑旋转缩放动画） */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="relative size-8"
      >
        <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}
