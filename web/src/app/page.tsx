'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ReportForm from '@/components/ReportForm';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Languages } from 'lucide-react';

function MapLoading() {
  const { t } = useLanguage();
  return <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">{t.loadingMap}</div>;
}

const AccessibilityMap = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: MapLoading,
});

export default function Home() {
  const { t, toggleLanguage } = useLanguage();
  const [selectedPos, setSelectedPos] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <main className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className="w-96 h-full bg-white border-r shadow-xl z-10 flex flex-col p-6 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
              Tijuana <span className="text-gray-800">Sin Barreras</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {t.appSubtitle}
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors"
            title={t.languageLabel}
          >
            <Languages size={14} />
            {t.language}
          </button>
        </div>

        <div className="flex-1 space-y-6">
          <ReportForm 
            selectedPos={selectedPos} 
            onSuccess={() => {
              alert(t.thankYou);
              setSelectedPos(null);
            }} 
          />
          
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">{t.guide}</h3>
            <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
              <li>{t.guideClick}</li>
              <li>{t.guideMarkers}</li>
              <li>{t.guideHelp}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-auto pt-6 text-center text-xs text-gray-400">
          {t.footer}
        </div>
      </div>

      <div className="flex-1 relative">
        <AccessibilityMap onMapClick={(lat, lng) => setSelectedPos({ lat, lng })} />
      </div>
    </main>
  );
}
