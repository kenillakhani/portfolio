/* Tiny markdown renderer for project bodies — handles ## headings, **bold**,
   *italic*, and - bullet lists. Just enough; no dependency. */

type Part = string | { b?: boolean; i?: boolean; href?: string; t: string };

function inline(text: string) {
  // **bold** | *italic* | [text](url)
  const parts: Part[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2] != null) parts.push({ b: true, t: m[2] });
    else if (m[3] != null) parts.push({ i: true, t: m[3] });
    else parts.push({ href: m[5], t: m[4] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>;
    if (p.href)
      return (
        <a key={i} href={p.href} target="_blank" rel="noopener noreferrer">
          {p.t}
        </a>
      );
    return p.b ? <strong key={i}>{p.t}</strong> : <em key={i}>{p.t}</em>;
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\n+/);
  return (
    <div className="prose-body">
      {blocks.map((block, i) => {
        // a block that starts with "## " is a heading + (optional) body on the next lines
        if (block.startsWith('## ')) {
          const nl = block.indexOf('\n');
          const heading = nl === -1 ? block.slice(3) : block.slice(3, nl);
          const rest = nl === -1 ? '' : block.slice(nl + 1).trim();
          return (
            <div key={i}>
              <h2>{inline(heading)}</h2>
              {rest && <p>{inline(rest)}</p>}
            </div>
          );
        }
        if (/^- /m.test(block)) {
          const items = block.split('\n').filter((l) => l.startsWith('- '));
          return (
            <ul key={i}>
              {items.map((it, j) => (
                <li key={j}>{inline(it.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}
