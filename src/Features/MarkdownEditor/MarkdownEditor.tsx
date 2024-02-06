import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';
import CopyToClipboard from 'react-copy-to-clipboard';
import './MarkdownEditor.css';

const MarkdownEditor: React.FC = () => {
  const defaultMarkdown = '## Markdown preview';

  const [markdownText, setMarkdownText] = useState(defaultMarkdown);
  const [isCopied, setIsCopied] = useState(false);

  const handleMarkdownChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const downloadMarkdownFile = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-preview.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex-container'>
      <div className='textarea-container'>
        <textarea
          value={markdownText}
          onChange={handleMarkdownChange}
          placeholder='Write your markdown here...'
          className='w-full h-full border p-2 rounded overflow-auto text-slate-900'
        />
      </div>
      <div className='preview-container'>
        <div className='button-container'>
          <CopyToClipboard text={markdownText} onCopy={() => setIsCopied(true)}>
            <button className='copy-button'>
              <FontAwesomeIcon icon={faCopy} />

              {isCopied ? <span className='ml-2'>Copied!</span> : null}
            </button>
          </CopyToClipboard>
          <button onClick={downloadMarkdownFile} className='download-button'>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
        <Markdown
          children={markdownText}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
