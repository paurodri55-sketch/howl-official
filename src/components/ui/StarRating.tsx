function Star({ fill }: { fill: number }) {
  const id = `star-clip-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
        fill="none"
        stroke="#c98a3e"
        strokeWidth={1}
      />
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
        fill="#e8b84b"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function StarRating({
  rating,
  reviewCount,
  className = "",
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    Math.max(0, Math.min(1, rating - i))
  );

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex gap-0.5">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="font-condensed text-cream-dim text-xs">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
