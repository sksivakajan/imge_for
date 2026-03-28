import React, { useState } from 'react';
import { Download, Eraser, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ExportTools({ file, dashboardRef, gps }) {
  const [cleaning, setCleaning] = useState(false);
  const [exportingPI, setExportingPI] = useState(false);

  const handleCleanImage = async () => {
    setCleaning(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((res) => (img.onload = res));

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CLEANED_${file.name}`;
        a.click();
        URL.revokeObjectURL(url);
        setCleaning(false);
      }, file.type || 'image/jpeg', 1.0);
    } catch (err) {
      console.error(err);
      setCleaning(false);
    }
  };

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    setExportingPI(true);
    try {
      // Temporarily expand height for html2canvas
      const originalHeight = dashboardRef.current.style.height;
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0b0f19'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.setFillColor(11, 15, 25);
      pdf.rect(0, 0, pdfWidth, pdfHeight > pdf.internal.pageSize.getHeight() ? pdfHeight : pdf.internal.pageSize.getHeight(), 'F');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Metadata_Report_${file.name}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExportingPI(false);
    }
  };

  return (
    <div className="cyber-card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <button className="cyber-btn success" onClick={handleExportPDF} disabled={exportingPI}>
        <FileText size={18} /> {exportingPI ? 'Generating...' : 'Export PDF Report'}
      </button>
      <button className="cyber-btn danger" onClick={handleCleanImage} disabled={cleaning}>
        <Eraser size={18} /> {cleaning ? 'Scrubbing EXIF...' : 'Download Clean Image'}
      </button>
    </div>
  );
}
