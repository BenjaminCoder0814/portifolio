'use client';

import { useI18n, type Lang } from '@/lib/i18n';
import { useRouter, usePathname } from 'next/navigation';

const LANGS: Lang[] = ['pt', 'en', 'es'];

const LABELS: Record<Lang, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

export default function LanguageSwitcher() {
  const { lang } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (l: Lang) => {
    const segments = pathname.split('/');
    if (segments[1] && ['pt', 'en', 'es'].includes(segments[1])) {
      segments[1] = l;
      router.push(segments.join('/') || `/${l}`);
    } else {
      router.push(`/${l}`);
    }
  };

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-white/10 overflow-hidden">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => switchLang(l)}
          className={`px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
            lang === l
              ? 'bg-cyan-400 text-black'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          aria-label={`Switch language to ${l}`}
          aria-pressed={lang === l}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
