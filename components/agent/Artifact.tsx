'use client';

import { Artifact as ArtifactType } from '@/types/chat';
import { Download, FileText, Code, Image as ImageIcon, File } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ArtifactProps {
  artifact: ArtifactType;
}

export function Artifact({ artifact }: ArtifactProps) {
  const typeIcon = {
    file: <File size={16} />,
    code: <Code size={16} />,
    image: <ImageIcon size={16} />,
    document: <FileText size={16} />,
  }[artifact.type];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">{typeIcon}</span>
          <div>
            <p className="font-semibold text-slate-900">{artifact.filename}</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {artifact.type}
            </Badge>
          </div>
        </div>
        {artifact.url && (
          <a
            href={artifact.url}
            download
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Download
          </a>
        )}
      </div>

      {/* Preview Content */}
      {artifact.content && artifact.type === 'code' && (
        <pre className="bg-slate-900 text-slate-100 rounded p-3 text-xs overflow-x-auto max-h-48">
          {artifact.content}
        </pre>
      )}

      {artifact.content && artifact.type === 'image' && (
        <img
          src={artifact.content}
          alt={artifact.filename}
          className="max-w-full h-auto rounded-lg max-h-64"
        />
      )}

      {artifact.mimeType && (
        <p className="text-xs text-slate-500">Type: {artifact.mimeType}</p>
      )}
    </div>
  );
}
