import { useEffect, useState } from 'react';
import { Button } from 'verity-design-system';
import { RESUME_HREF } from '../site';

const FILE_NAME = 'erin-tozour-resume.pdf';

// The résumé page's Download, in the top-right corner (Shell's action, placed
// in app/root.tsx). On a touch screen whose browser can share a PDF, it opens
// the share sheet with the file (Save to Files, Print, Mail, AirDrop), and
// closing the sheet returns to the page. Otherwise it's a link to the PDF
// with download, so the browser saves the file.
//
// Why: on an iPhone, a download link doesn't save the file. Safari opens the
// PDF in a new tab and Chrome does nothing. And since iOS and iPadOS 26, a
// site added to the Home Screen opens as a web app with no browser controls,
// where the PDF opens full screen with no way back to the site. The share
// sheet works in all of them. On a computer without a touch screen, like a
// Mac, the download link saves the file to Downloads as expected, so it stays
// a plain link there, even though Safari and Chrome on the Mac can share.
//
// Safari only opens the share sheet straight from a tap, and fetching the PDF
// after the tap can lose that permission, so the PDF is fetched once when the
// page opens (only on a touch screen whose browser can share), and the tap
// shares it with nothing awaited first. The link keeps its href and download,
// so it still works before JavaScript loads, before the PDF has arrived, and
// wherever sharing isn't possible.
export function ResumeDownload() {
  const file = useResumeFile();
  return (
    <Button
      variant="secondary"
      background="scrim"
      startIcon="download"
      href={RESUME_HREF}
      download={FILE_NAME}
      onClick={(event) => {
        // Can't share it (or it hasn't arrived yet): follow the link
        if (!file || !navigator.canShare?.({ files: [file] })) return;
        event.preventDefault();
        navigator.share({ files: [file], title: 'Erin Tozour résumé' }).catch((error: unknown) => {
          // Closed without choosing anything: stay on the page
          if (error instanceof DOMException && error.name === 'AbortError') return;
          // Anything else: open the PDF the normal way
          window.location.assign(RESUME_HREF);
        });
      }}
    >
      Download
    </Button>
  );
}

// The résumé PDF as a File, fetched when the page opens, on a touch screen
// whose browser can share. Null everywhere else, and until it's fetched.
function useResumeFile() {
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (!hasTouchScreen() || typeof navigator.share !== 'function') return;
    let current = true;
    fetch(RESUME_HREF)
      .then((response) => (response.ok ? response.blob() : Promise.reject(new Error(String(response.status)))))
      .then((blob) => {
        if (current) setFile(new File([blob], FILE_NAME, { type: 'application/pdf' }));
      })
      // If it can't be fetched, Download stays a plain link
      .catch(() => {});
    return () => {
      current = false;
    };
  }, []);
  return file;
}

// Whether the device has a touch screen: any pointer that's coarse, like a
// finger. "Any" so an iPad with a trackpad or keyboard case still counts. A
// Mac has none, so it's false there.
function hasTouchScreen() {
  return window.matchMedia('(any-pointer: coarse)').matches;
}
