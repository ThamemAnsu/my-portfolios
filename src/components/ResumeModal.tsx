import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';


// Point to the worker file in the build folder
pdfjs.GlobalWorkerOptions.workerSrc = '../../public/pdf.worker.min.mjs';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumeUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
  };

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resumeUrl]);

  const handleOpenNewTab = useCallback(() => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  }, [resumeUrl]);

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      ></div>

      <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Resume</h2>
              <p className="text-sm text-gray-400">
                {numPages > 0 && `Page ${pageNumber} of ${numPages}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom Out"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <span className="text-gray-400 text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom In"
              disabled={scale >= 2.0}
            >
              <ZoomIn className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
              title="Download Resume"
            >
              <Download className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button
              onClick={handleOpenNewTab}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
              title="Open in New Tab"
            >
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-gray-950 relative smooth-scroll">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading resume...</p>
              </div>
            </div>
          )}

          <div className="flex justify-center items-start min-h-full p-4">
            <Document
              file={resumeUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
              error={
                <div className="text-red-400 text-center py-20">
                  <p className="text-lg font-semibold">Failed to load PDF</p>
                  <p className="text-sm mt-2">Please try downloading the file instead</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
                className="shadow-2xl"
              />
            </Document>
          </div>
        </div>

        {/* Page Navigation */}
        {numPages > 1 && (
          <div className="bg-gray-900 border-t border-gray-700 px-6 py-3 flex items-center justify-center gap-4 flex-shrink-0">
            <button
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <span className="text-gray-400 text-sm font-medium">
              Page {pageNumber} of {numPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .react-pdf__Page {
          max-width: 100%;
          background-color: white;
          border-radius: 4px;
        }

        .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }

        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default ResumeModal;