"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
export function CopyCode({ code, label = "POWERSHELL" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setError(false);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
    }
  }
  return (
    <div className="code-block">
      <div className="code-head">
        <span>{label}</span>
        <button onClick={copy} className="copy-button" aria-label="Kodu kopyala">
          {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <span className="sr-only" aria-live="polite">
        {copied ? "Panoya kopyalandı" : ""}
      </span>
      {error && (
        <p className="copy-error" role="status">
          Panoya erişilemedi. Metni seçip elle kopyalayabilirsin.
        </p>
      )}
    </div>
  );
}
