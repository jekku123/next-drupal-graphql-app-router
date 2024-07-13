import { ResultViewProps } from "@elastic/react-search-ui-views";

import { Badge } from "@/ui/badge";

export function SearchResult({ result }: ResultViewProps) {
  return (
    <li key={result.id.raw} className="block p-8 my-4 bg-white rounded">
      <a href={result.path.raw}>
        <h2 className="mb-4 text-xl font-bold text-primary-800">
          {result.title.raw}
        </h2>
        <p className="mb-6 text-md text-scapaflow">{result.excerpt.raw}</p>
        <Badge variant="info" size="sm">
          {result.content_type.raw}
        </Badge>
      </a>
    </li>
  );
}
