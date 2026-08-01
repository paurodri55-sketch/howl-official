export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: readonly { heading: string; body: readonly string[] }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-2">{title}</h1>
      <p className="text-xs text-cream-dim mb-10">{updated}</p>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-condensed uppercase tracking-widest text-sm text-rust-light mb-3">
              {section.heading}
            </h2>
            <div className="space-y-3 text-sm text-cream-dim leading-relaxed">
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
