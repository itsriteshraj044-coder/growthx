import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
}

/** Standard section header: eyebrow chip, display title with gradient highlight, optional copy. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      data-reveal-group
      className={cn(
        'mb-14 max-w-3xl md:mb-20',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      <span data-reveal className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        data-reveal
        className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p data-reveal className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
