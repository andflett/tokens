"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
  return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Removed</CardTitle>
            <CardContent className="pt-2 text-sm text-muted-foreground">
              Sign-in and auth-related features have been disabled.
              <div className="mt-4">
                <Link href="/" className="text-sm text-foreground underline">
                  Return home
                </Link>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
  );
}
