import { Download } from 'lucide-react';
import { useId, useState } from 'react';
import { resume, links } from '../data/profile';
import { useResume } from '../hooks/useResume';

interface Props {
  className?: string;
  label?: string;
}

export function ResumeButton({ className = 'btn', label = 'Download resume' }: Props) {
  const state = useResume();
  const [showMsg, setShowMsg] = useState(false);
  const msgId = useId();

  if (state === 'available') {
    return (
      <a className={className} href={resume.path} download={resume.downloadName} type="application/pdf">
        <Download aria-hidden="true" />
        {label}
      </a>
    );
  }

  // While checking, or when the PDF is missing, render a button that explains instead of a broken link.
  return (
    <span className="resume-wrap">
      <button
        type="button"
        className={className}
        aria-disabled={state === 'missing'}
        aria-describedby={showMsg ? msgId : undefined}
        onClick={() => setShowMsg(true)}
      >
        <Download aria-hidden="true" />
        {label}
      </button>
      <span id={msgId} className="resume-msg" role="status" aria-live="polite">
        {showMsg && state === 'missing' && (
          <>
            The resume PDF isn’t uploaded yet.{' '}
            {links.email ? (
              <a className="text-link" href={`mailto:${links.email}?subject=Resume%20request`}>
                Email me for a copy.
              </a>
            ) : null}
          </>
        )}
        {showMsg && state === 'checking' && 'Checking for the resume… try again in a moment.'}
      </span>
    </span>
  );
}
