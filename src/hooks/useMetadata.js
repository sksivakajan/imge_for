import { useState, useCallback } from 'react';
import exifr from 'exifr';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useMetadata() {
  const [analyzing, setAnalyzing] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `> ${msg}`]);
  };

  const calculateRisk = (gps, hasTime, hasDevice) => {
    if (gps && hasTime && hasDevice) return { score: 95, level: 'CRITICAL', color: 'var(--neon-red)' };
    if (gps) return { score: 75, level: 'HIGH', color: '#ff8800' };
    if (hasTime && hasDevice) return { score: 50, level: 'MEDIUM', color: 'var(--neon-yellow)' };
    return { score: 15, level: 'LOW', color: 'var(--neon-green)' };
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      addLog('Fetching reverse geocoding data...');
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data;
    } catch (e) {
      addLog('Reverse geocoding failed or rate-limited.');
      return null;
    }
  };

  const processImage = useCallback(async (file) => {
    setAnalyzing(true);
    setLogs([]);
    addLog('Reading image file...');

    const result = {
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      },
      gps: null,
      exif: null,
      locationDetails: null,
      risk: null,
      error: null,
      thumbnail: URL.createObjectURL(file), // for UI preview
      originalFile: file,
    };

    try {
      addLog('Allocating memory for EXIF payload extraction...');
      await sleep(400);
      const parsed = await exifr.parse(file, { mergeOutput: false });
      result.exif = parsed;

      // Ensure EXIF is captured even if null
      if (!parsed) {
        addLog('WARN: No EXIF metadata headers found in this object.');
        await sleep(400);
      } else {
        addLog('EXIF matrix decoded successfully.');
        await sleep(300);
        
        let hasTime = !!(parsed.exif?.DateTimeOriginal || parsed.ifd0?.ModifyDate);
        let hasDevice = !!(parsed.ifd0?.Make || parsed.ifd0?.Model);

        addLog('Scanning bitstream for GPS coordinate blocks...');
        await sleep(500);
        const gps = await exifr.gps(file);
        
        if (gps) {
          result.gps = gps;
          addLog(`GPS hit detected: Lat ${gps.latitude.toFixed(5)}, Lon ${gps.longitude.toFixed(5)}`);
          await sleep(400);
          addLog('Initializing OSINT reverse geocoding request...');
          result.locationDetails = await reverseGeocode(gps.latitude, gps.longitude);
        } else {
          addLog('No embedded GPS tracks found in this image block.');
        }
        await sleep(300);

        addLog('Calculating forensic privacy risk severity...');
        await sleep(500);
        result.risk = calculateRisk(result.gps, hasTime, hasDevice);
        addLog('Analysis routine completed successfully.');
        await sleep(300);
      }
      
      // If no EXIF at all, still give a baseline
      if (!result.risk) result.risk = { score: 5, level: 'LOW', color: 'var(--neon-green)' };
      
    } catch (err) {
      console.error(err);
      result.error = err.message;
      addLog(`Error parsing file: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }

    return result;
  }, []);

  return { processImage, analyzing, logs };
}
