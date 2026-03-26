const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="font-mono font-bold text-primary-foreground text-xs">TN</span>
          </div>
          <span className="font-mono text-sm text-muted-foreground">
            Tech<span className="text-primary">Nest</span> © {new Date().getFullYear()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Premium technology accessories for modern creators.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
