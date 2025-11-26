"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/page-layout";
import { createBrowserClient } from "@/lib/supabase";
import Link from "next/link";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
        },
      });

      if (error) {
        throw error;
      }

      setIsSent(true);
      toast.success("Check your email for a magic link!");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <EnvelopeIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a magic link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Click the link in your email to sign in. The link will expire in 1 hour.
          </p>
          <Button variant="outline" onClick={() => setIsSent(false)} className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Use a different email
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Link href="/" className="mx-auto mb-4 flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
            V
          </div>
          <span>Vibe Themes</span>
        </Link>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your email to receive a magic link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account needed - just enter your email and we&apos;ll send you a link.
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <PageLayout showGrid>
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-10">
        <React.Suspense fallback={
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              Loading...
            </CardContent>
          </Card>
        }>
          <LoginForm />
        </React.Suspense>
      </div>
    </PageLayout>
  );
}
