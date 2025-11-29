import { Link } from '@tanstack/react-router';
import { FileX, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';

export default function NotFoundPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Error Illustration */}
        <Card className="border-border bg-card mb-8">
          <CardContent className="pt-12 pb-8">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <FileX className="text-muted-foreground size-24" />
                <div className="bg-destructive absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full">
                  <span className="text-destructive-foreground text-lg font-bold">
                    !
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-foreground mb-4 text-4xl font-bold">404</h2>
            <h3 className="text-foreground mb-2 text-2xl font-semibold">
              File or Page Not Found
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Oops! The file or page you were looking for doesn&apos;t exist in
              your vault. It may have been moved, deleted, or the link might be
              incorrect. Please try again or contact support if the problem
              persists.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>

        {/* Footer Copyright */}
        <div className="border-border mt-8 border-t pt-6">
          <span>
            &copy; {new Date().getFullYear()} Vault Drive. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
