'use client';

import React, { useState } from 'react';
import { useCaseLookup } from '../../hooks/useCaseLookup';
import { LookupForm } from '../ui/case';
import { CaseDetailView } from './CaseDetailView.view';

export const CaseLookupView: React.FC = () => {
  const [caseId, setCaseId] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);

  const { data, isLoading, error, refetch } = useCaseLookup(caseId, searchEnabled);

  const handleSearch = () => {
    if (caseId.trim()) {
      setSearchEnabled(true);
      refetch();
    }
  };

  const handleReset = () => {
    setCaseId('');
    setSearchEnabled(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <LookupForm
        caseId={caseId}
        onCaseIdChange={setCaseId}
        onSearch={handleSearch}
        onReset={handleReset}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
        error={error}
      />

      {data && <CaseDetailView caseData={data.data} />}
    </div>
  );
};
