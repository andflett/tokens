"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  StarIcon,
  BookmarkIcon,
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface UIPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UIPreviewModal({ open, onOpenChange }: UIPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto p-0 w-full">
        <DialogHeader className="sr-only">
          <DialogTitle>Token Preview</DialogTitle>
        </DialogHeader>

        <div className="bg-background">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary-500" />
                <span className="font-semibold text-sm">Acme</span>
              </div>
              <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-xs">
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Projects
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Team
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <MagnifyingGlassIcon className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="h-8 w-48 pl-8 text-xs"
                />
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <BellIcon className="h-4 w-4" />
              </Button>
              <ThemeSwitch size="sm" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    <div className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-700">
                        JD
                      </span>
                    </div>
                    <ChevronDownIcon className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-xs">
                    <UserIcon className="h-3.5 w-3.5 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    <Cog6ToothIcon className="h-3.5 w-3.5 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-xs text-destructive">
                    <ArrowRightOnRectangleIcon className="h-3.5 w-3.5 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_260px] min-h-[500px]">
            {/* Left Sidebar */}
            <div className="hidden md:block border-r border-border p-3 space-y-4">
              {/* Tree/Menu */}
              <div className="space-y-1">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Components
                </div>
                {[
                  { name: "Box", icon: "□" },
                  { name: "Grid", icon: "⊞" },
                  { name: "Image", icon: "⊡", indent: true },
                  { name: "Image", icon: "⊡", indent: true },
                  { name: "Text", icon: "T", indent: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted cursor-pointer ${
                      item.indent ? "pl-6" : ""
                    } ${
                      i === 0
                        ? "bg-primary-subdued text-primary-subdued-foreground"
                        : ""
                    }`}
                  >
                    <span className="text-muted-foreground w-4 text-center">
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                ))}
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                <Badge variant="outline" className="text-[10px] h-5">
                  Fully-featured
                </Badge>
                <Badge variant="outline" className="text-[10px] h-5">
                  Built with Radix
                </Badge>
                <Badge variant="outline" className="text-[10px] h-5">
                  Open source
                </Badge>
              </div>

              {/* Icon Row */}
              <div className="flex items-center gap-1 pt-2 border-t border-border">
                {[
                  StarIcon,
                  BookmarkIcon,
                  Cog6ToothIcon,
                  HeartIcon,
                  ShareIcon,
                ].map((Icon, i) => (
                  <Button
                    key={i}
                    variant={i === 1 ? "default" : "outline"}
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Button>
                ))}
              </div>

              {/* User Card */}
              <div className="p-3 border border-border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent-200" />
                  <div>
                    <div className="text-xs font-medium">Emily Adams</div>
                    <div className="text-[10px] text-muted-foreground">
                      emily.adams@example.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Content - Sign Up Form */}
            <div className="p-6 flex items-center justify-center bg-muted/20">
              <div className="w-full max-w-sm bg-card border border-border rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-center mb-6">Sign up</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Full name</Label>
                    <Input placeholder="Enter your name" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-9"
                    />
                  </div>
                  <Button className="w-full" intent="default">
                    Create account
                  </Button>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex-1 h-px bg-border" />
                    <span>OR</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    Continue with GitHub
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden md:block border-l border-border p-3 space-y-4">
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {[
                  "bg-primary-300",
                  "bg-accent-300",
                  "bg-secondary-300",
                  "bg-success-300",
                  "bg-warning-300",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${color} border-2 border-background flex items-center justify-center text-xs font-medium`}
                  >
                    {["JD", "AK", "BG", "CL", "DM"][i]}
                  </div>
                ))}
              </div>

              {/* Info Block with Left Border */}
              <div className="border-l-2 border-primary-500 pl-3 py-1 text-xs text-foreground/80 leading-relaxed">
                <span className="font-semibold">Susan Kare</span> is an American
                graphic designer who contributed{" "}
                <span className="text-primary-600 font-medium">interface</span>{" "}
                elements for the first Apple Macintosh.
              </div>

              {/* Alerts */}
              <div className="space-y-2">
                <Alert className="py-2">
                  <InformationCircleIcon className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Please upgrade to the new version.
                  </AlertDescription>
                </Alert>
                <div className="flex items-start gap-2 border border-success rounded-lg bg-success-subdued px-3 py-2">
                  <CheckCircleIcon className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-success-subdued-foreground">
                    Changes saved successfully!
                  </span>
                </div>
                <div className="flex items-start gap-2 border border-warning rounded-lg bg-warning-subdued px-3 py-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-warning-subdued-foreground">
                    Your trial expires in 3 days.
                  </span>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Tasks
                </div>
                {[
                  { text: "Respond to comment #384 from Travis", link: "#384" },
                  { text: "Invite Acme Co. team to Slack", link: "Acme Co." },
                  {
                    text: "Create a report requested by Danilo",
                    link: "requested",
                  },
                  { text: "Close Q2 finances", done: true },
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Checkbox
                      checked={task.done}
                      className="mt-0.5 h-3.5 w-3.5"
                    />
                    <span
                      className={`text-xs ${
                        task.done ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.text.split(task.link || "").map((part, j) =>
                        j === 0 ? (
                          <span key={j}>
                            {part}
                            {task.link && (
                              <span className="text-primary-600 font-medium">
                                {task.link}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button Variants */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Button Variants
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Button size="sm" intent="default" className="h-7 text-xs">
                    Primary
                  </Button>
                  <Button size="sm" intent="secondary" className="h-7 text-xs">
                    Secondary
                  </Button>
                  <Button
                    size="sm"
                    intent="destructive"
                    className="h-7 text-xs"
                  >
                    Destructive
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Outline
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    Ghost
                  </Button>
                  <Button size="sm" variant="link" className="h-7 text-xs">
                    Link
                  </Button>
                </div>
              </div>

              {/* Select */}
              <div className="pt-2 border-t border-border">
                <Select defaultValue="actions">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actions" className="text-xs">
                      Actions
                    </SelectItem>
                    <SelectItem value="edit" className="text-xs">
                      Edit
                    </SelectItem>
                    <SelectItem value="delete" className="text-xs">
                      Delete
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
