export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-wolf.png" alt="HOWL" className={className} />
  );
}
