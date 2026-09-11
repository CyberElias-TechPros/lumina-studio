import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  ExternalLink,
  FileArchive,
  FileCode2,
  FileText,
  FileType2,
  Folder,
  FolderOpen,
  Link2,
  LockKeyhole,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LibraryItem } from "@/lib/api/library";
import { cn } from "@/lib/utils";

const SEP = " / ";

function splitPath(path: string): string[] {
  return path.split(SEP).filter(Boolean);
}

function fileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["pdf"].includes(ext)) return FileText;
  if (["doc", "docx", "txt", "rtf", "md"].includes(ext)) return FileType2;
  if (["xls", "xlsx", "csv"].includes(ext)) return FileCode2;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return FileArchive;
  return FileType2;
}

function folderSegments(path: string, name: string): string[] {
  return [...splitPath(path), name];
}

function isDescendant(path: string, ancestor: string): boolean {
  return path === ancestor || path.startsWith(`${ancestor}${SEP}`);
}

interface LibraryBrowserProps {
  items: LibraryItem[];
  sourceName: string;
  /** When false, protected items render locked with a sign-in CTA. */
  canAccessProtected: boolean;
}

export function LibraryBrowser({ items, sourceName, canAccessProtected }: LibraryBrowserProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const childrenOf = useMemo(() => {
    const map = new Map<string, LibraryItem[]>();
    for (const item of items) {
      const list = map.get(item.folderPath) ?? [];
      list.push(item);
      map.set(item.folderPath, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) =>
        a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "folder" ? -1 : 1,
      );
    }
    return map;
  }, [items]);

  const rootPaths = useMemo(
    () =>
      [...new Set(items.map((i) => i.folderPath))]
        .filter((p) => splitPath(p).length === 1)
        .sort((a, b) => a.localeCompare(b)),
    [items],
  );

  const toggle = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderItem = (item: LibraryItem, depth: number) => {
    if (item.kind === "folder") {
      const path = folderSegments(item.folderPath, item.name).join(SEP);
      const children = childrenOf.get(path) ?? [];
      const open = expanded.has(path);
      return (
        <div key={item.id}>
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg py-1.5 pr-2 text-sm transition-colors",
              depth > 0 && "pl-4",
            )}
            style={{ paddingLeft: `${depth * 18}px` }}
          >
            <button
              type="button"
              onClick={() => toggle(path)}
              className="hover:bg-muted grid size-6 shrink-0 place-items-center rounded-md"
              aria-label={open ? "Collapse folder" : "Expand folder"}
            >
              <ChevronRight
                className={cn(
                  "text-muted-foreground size-3.5 transition-transform",
                  open && "rotate-90",
                )}
              />
            </button>
            {open ? (
              <FolderOpen className="text-primary size-4 shrink-0" />
            ) : (
              <Folder className="text-primary size-4 shrink-0" />
            )}
            <span className="min-w-0 flex-1 truncate font-semibold">{item.name}</span>
            <Badge variant="outline" className="hidden text-[10px] font-semibold sm:inline-flex">
              {children.length} item{children.length === 1 ? "" : "s"}
            </Badge>
            {item.isProtected && !canAccessProtected && (
              <LockKeyhole className="text-muted-foreground size-3.5" />
            )}
          </div>
          {open && children.map((child) => renderItem(child, depth + 1))}
        </div>
      );
    }

    const locked = item.isProtected && !canAccessProtected;
    const Icon = item.kind === "link" ? Link2 : fileIcon(item.name);
    return (
      <div
        key={item.id}
        className="group flex items-center gap-2 rounded-lg py-1.5 pr-2 text-sm"
        style={{ paddingLeft: `${(depth + 1) * 18}px` }}
      >
        <span className="w-6 shrink-0" />
        <Icon className="text-muted-foreground size-4 shrink-0" />
        {locked ? (
          <>
            <span className="min-w-0 flex-1 truncate">{item.name}</span>
            <Badge className="bg-warning/10 text-warning border-0 font-semibold">
              <LockKeyhole className="size-3" /> Students only
            </Badge>
            <Button variant="outline" size="sm" className="h-7 px-2.5 font-semibold" asChild>
              <Link to="/auth/sign-in">Sign in</Link>
            </Button>
          </>
        ) : (
          <>
            <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
            {item.kind === "link" && (
              <Badge variant="outline" className="hidden text-[10px] font-semibold sm:inline-flex">
                <ExternalLink className="size-3" /> Link
              </Badge>
            )}
            {item.isProtected && (
              <Badge className="bg-learning/10 text-learning border-0 font-semibold">
                Course material
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-7 px-2.5 font-semibold" asChild>
              <a href={item.url} target="_self" rel="noopener noreferrer">
                {item.kind === "link" ? "Visit" : "Open"}
              </a>
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderSearchResults = () => {
    const q = query.trim().toLowerCase();
    const direct = items.filter((i) => i.name.toLowerCase().includes(q));
    const matchedIds = new Set(direct.map((i) => i.id));
    for (const m of direct) {
      if (m.kind !== "folder") continue;
      const full = folderSegments(m.folderPath, m.name).join(SEP);
      for (const i of items) {
        if (isDescendant(i.folderPath, full) || i.folderPath === full) matchedIds.add(i.id);
      }
    }
    const results = items.filter((i) => matchedIds.has(i.id));
    if (results.length === 0) {
      return (
        <p className="text-muted-foreground py-8 text-center text-sm">No files match “{query}”.</p>
      );
    }
    const folders = results
      .filter((i) => i.kind === "folder")
      .sort((a, b) => a.folderPath.localeCompare(b.folderPath) || a.name.localeCompare(b.name));
    const files = results.filter((i) => i.kind === "file" || i.kind === "link");
    return (
      <div>
        {folders.map((item) => {
          const full = folderSegments(item.folderPath, item.name).join(SEP);
          const included = results.filter(
            (i) => i.id !== item.id && (i.folderPath === full || isDescendant(i.folderPath, full)),
          ).length;
          return (
            <div key={item.id} className="flex items-center gap-2 py-1.5 text-sm font-bold">
              <Folder className="text-primary size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              {item.isProtected && !canAccessProtected && (
                <LockKeyhole className="text-muted-foreground size-3.5" />
              )}
              <span className="text-muted-foreground text-xs font-semibold">
                {included} item{included === 1 ? "" : "s"}
              </span>
            </div>
          );
        })}
        {files.map((item) => {
          const locked = item.isProtected && !canAccessProtected;
          const Icon = item.kind === "link" ? Link2 : fileIcon(item.name);
          return (
            <div key={item.id} className="flex items-center gap-2 py-1.5 text-sm">
              <Icon className="text-muted-foreground size-4 shrink-0" />
              <span className="text-muted-foreground min-w-0 flex-1 truncate font-mono text-[11px]">
                {item.folderPath} / {item.name}
              </span>
              {locked ? (
                <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                  <LockKeyhole className="size-3" /> Students only
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="h-7 px-2.5 font-semibold" asChild>
                  <a href={item.url} target="_self" rel="noopener noreferrer">
                    Open
                  </a>
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${sourceName} — e.g. “SQL”, “glossary”, “PDF”…`}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border bg-card shadow-soft">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-bold">{sourceName}</p>
          <p className="text-muted-foreground text-xs">
            {items.length.toLocaleString()} files & folders
            {!canAccessProtected &&
              ` · ${items.filter((i) => i.isProtected).length.toLocaleString()} protected course materials`}
          </p>
        </div>
        <div className="p-2">
          {query.trim()
            ? renderSearchResults()
            : rootPaths.map((path) => {
                const rootName = path;
                const rootChildren = childrenOf.get(path) ?? [];
                return (
                  <div key={path}>
                    <div className="flex items-center gap-2 rounded-lg py-1.5 pr-2 text-sm">
                      <button
                        type="button"
                        onClick={() => toggle(path)}
                        className="hover:bg-muted grid size-6 shrink-0 place-items-center rounded-md"
                        aria-label="Expand folder"
                      >
                        <ChevronRight
                          className={cn(
                            "text-muted-foreground size-3.5 transition-transform",
                            expanded.has(path) && "rotate-90",
                          )}
                        />
                      </button>
                      <Folder className="text-primary size-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate font-bold">{rootName}</span>
                    </div>
                    {expanded.has(path) && rootChildren.map((child) => renderItem(child, 1))}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
