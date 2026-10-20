import { FileText } from 'lucide-react';
import { useOpenResume } from './ResumeDialog';

interface Props {
  className?: string;
  label?: string;
}

/** Opens the resume window, where visitors pick the college or ATS-friendly version. */
export function ResumeButton({ className = 'btn', label = 'Resume' }: Props) {
  const open = useOpenResume();
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={(e) => open(e.currentTarget)}>
      <FileText aria-hidden="true" />
      {label}
    </button>
  );
}
