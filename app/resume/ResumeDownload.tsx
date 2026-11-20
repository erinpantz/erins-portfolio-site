import { useEffect, useState } from 'react';
import { Button } from 'verity-design-system';
import { RESUME_HREF } from '../site';

const FILE_NAME = 'erin-tozour-resume.pdf';

// The résumé page's Download, in the top-right corner (Shell's action, placed
// in app/root.tsx). It's a link to the PDF with download, so the browser
// saves the file instead of opening it.
//
// Except in a Home Screen web app. Since iOS and iPadOS 26, a site added to
// the Home Screen always opens as a web app, with no browser controls, and
// the PDF is inside the app's own scope: following the link opens it full
// screen in the app, with no way back to the site. So there, when the browser
// can share a PDF, Download opens the share sheet with the file instead (Save
// to Files, Print, Mail, AirDrop), and closing the sheet returns to the page.
//
// Safari only opens the share sheet straight from a tap, and fetching the PDF
// after the tap can lose that permission, so in a Home Screen web app the PDF
// is fetched once when the page opens, and the tap shares it with nothing
// awaited first. Everywhere else, nothing extra runs and nothing is fetched.
// The link keeps its href and download either way, so it still works before
// JavaScript loads and wherever sharing isn't possible.
export function ResumeDownload() {
  const file = useShareableResume();
  return (
    <Button
      variant="secondary"
      background="scrim"
      startIcon="download"
      href={RESUME_HREF}
      download={FILE_NAME}
      onClick={(event) => {
        if (!file) return; // follow the link: save the file
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

// The résumé PDF as a File, ready to share, in a Home Screen web app whose
// browser can share it. Null everywhere else, and until it's fetched.
function useShareableResume() {
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (!isHomeScreenApp() || typeof navigator.canShare !== 'function') return;
    let current = true;
    fetch(RESUME_HREF)
      .then((response) => (response.ok ? response.blob() : Promise.reject(new Error(String(response.status)))))
      .then((blob) => {
        const pdf = new File([blob], FILE_NAME, { type: 'application/pdf' });
        if (current && navigator.canShare({ files: [pdf] })) setFile(pdf);
      })
      // If it can't be fetched, Download stays a plain link
      .catch(() => {});
    return () => {
      current = false;
    };
  }, []);
  return file;
}

// Whether the site is open as a Home Screen web app: the display-mode media
// query, or navigator.standalone on older iOS
function isHomeScreenApp() {
  const standalone = (navigator as Navigator & { standalone?: boolean }).standalone;
  return window.matchMedia('(display-mode: standalone)').matches || standalone === true;
}
