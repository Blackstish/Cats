import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@styles/Home.module.css';

function Home(): JSX.Element {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);

  // Zapytanie o geolokalizację
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolokalizacja nie jest wspierana przez tę przeglądarkę');
    }
  }, []);

  // Zapytanie o dostęp do kamery i mikrofonu
  useEffect(() => {
    if ('mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // Sprawdzamy, czy kamera i mikrofon są aktywne
          const videoTrack = stream.getVideoTracks()[0];
          const audioTrack = stream.getAudioTracks()[0];

          if (videoTrack) setIsCameraOn(true);
          if (audioTrack) setIsMicrophoneOn(true);
        })
        .catch((err) => {
          setMediaError('Nie można uzyskać dostępu do kamery lub mikrofonu: ' + err.message);
        });
    } else {
      setMediaError('Ta przeglądarka nie wspiera dostępu do urządzeń multimedialnych');
    }
  }, []);

  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>Aplikacja Progressive Web App Next.js</h1>
      <br />
      <h2 className={styles.content}>Fakty o kotach</h2>
      <br />
      <div className="mt-10">
        {/* Geolokalizacja */}
        <h3>🌍 Geolokalizacja użytkownika:</h3>
        {location ? (
          <p>
            📍 Współrzędne: <strong>{location.latitude}</strong>,{' '}
            <strong>{location.longitude}</strong>
          </p>
        ) : error ? (
          <p className="text-red-500">❌ Błąd: {error}</p>
        ) : (
          <p>⏳ Pobieranie geolokalizacji...</p>
        )}

        <br />
        
        {/* Dostęp do kamery i mikrofonu */}
        <h3>📷 Dostęp do kamery i mikrofonu:</h3>
        {mediaError ? (
          <p className="text-red-500">❌ {mediaError}</p>
        ) : (
          <p>
            {isCameraOn && isMicrophoneOn
              ? '✅ Kamera i mikrofon są włączone.'
              : '⏳ Oczekiwanie na dostęp do kamery i mikrofonu...'}
          </p>
        )}
      </div>
      <br />
    </div>
  );
}

export default Home;
