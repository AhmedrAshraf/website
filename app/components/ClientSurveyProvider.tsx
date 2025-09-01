'use client';

import { useSurveyModal } from './SurveyModal';

export const ClientSurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { SurveyModal } = useSurveyModal();

  return (
    <>
      {children}
      {SurveyModal}
    </>
  );
};
