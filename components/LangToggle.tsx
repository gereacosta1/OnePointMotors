'use client';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === 'en' ? 'es' : 'en';

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-xl"
      onClick={() => setLang(next)}
      aria-label="Change language"
      title="Change language"
    >
      {lang.toUpperCase()} ▸ {next.toUpperCase()}
    </Button>
  );
}
