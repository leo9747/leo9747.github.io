export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="w-full max-w-2xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <p>© {year} Leo Hyams</p>
        <div className="flex gap-4">
          <a
            href="mailto:leohyams74@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/leohyams-63960a163"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
