import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Resume Genius</span>
            </Link>
            <p className="text-muted-foreground mt-2">
              AI-powered resume builder to help you land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
            <nav className="flex flex-col gap-3">
              <h3 className="font-medium">Product</h3>
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground">
                Examples
              </Link>
            </nav>

            <nav className="flex flex-col gap-3">
              <h3 className="font-medium">Resources</h3>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
                Career Guides
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </nav>

            <nav className="flex flex-col gap-3">
              <h3 className="font-medium">Legal</h3>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Resume Genius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}