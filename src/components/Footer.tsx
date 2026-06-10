export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-16">
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wide uppercase text-muted">
        <p>© {year} Leo Hyams</p>
        <div className="flex gap-5">
          <a
            href="https://www.linkedin.com/in/leo-hyams-63960a163/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/leo_hyams"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            X
          </a>
          <a
            href="https://substack.com/@leonidasaurelius"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Substack
          </a>
          <a
            href="/Leo_Hyams_CV_June_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
