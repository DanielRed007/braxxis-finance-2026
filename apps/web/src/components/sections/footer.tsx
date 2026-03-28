const FOOTER_LINKS = ["Features", "Pricing", "Security", "Support"];

export function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-12">
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
              fill="#8660fa"
              opacity="0.3"
            />
            <path
              d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
              stroke="#8660fa"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span className="text-white font-bold text-sm">Braxxis Finance</span>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-colors duration-200 hover:text-white/70"
              style={{ color: "var(--color-text-muted)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          &copy; 2026 Braxxis Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
