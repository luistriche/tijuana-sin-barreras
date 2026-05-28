'use client';
import { useState } from 'react';
import axios from 'axios';
import { AlertCircle, MapPin, Image as ImageIcon, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface ReportFormProps {
  selectedPos: { lat: number; lng: number } | null;
  onSuccess: () => void;
}

export default function ReportForm({ selectedPos, onSuccess }: ReportFormProps) {
  const { t, barrierTypeLabel } = useLanguage();
  const [type, setType] = useState('Broken Sidewalk');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPos) return;

    setLoading(true);
      try {
        await axios.post('/api/barriers', {

        type,
        lat: selectedPos.lat,
        lng: selectedPos.lng,
        description,
      });
      onSuccess();
      setDescription('');
    } catch (err) {
      alert(t.errorReporting);
    } finally {
      setLoading(false);
    }
  };

  const barrierTypes = ['Broken Sidewalk', 'No Ramp', 'Blocked Passage', 'Other'];

  if (!selectedPos) {
    return (
      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 border border-blue-200">
        <MapPin size={20} />
        <p>{t.selectPoint}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <AlertCircle className="text-red-500" /> {t.reportBarrier}
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">{t.barrierType}</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
        >
          {barrierTypes.map(bt => (
            <option key={bt} value={bt}>{barrierTypeLabel(bt)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t.description}</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          className="w-full p-2 border rounded-md mt-1 h-24"
        />
      </div>

      <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-md text-gray-500 justify-center cursor-pointer hover:bg-gray-50">
        <ImageIcon size={20} />
        <span className="text-sm">{t.uploadPhoto}</span>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300"
      >
        <Send size={18} /> {loading ? t.sending : t.submitReport}
      </button>
    </form>
  );
}
