import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground sm:text-8xl">404</h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Page Not Found
        </p>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
