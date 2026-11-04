import React from 'react';
import PracticalContent from '../components/PracticalContent';
import { getPracticalById, allPracticals } from '../data/practicals';

export default function Manual({
  activePracticalId,
  onSelectPractical,
  completedIds,
  onToggleComplete
}) {
  const practical = getPracticalById(activePracticalId);
  const currentIndex = allPracticals.findIndex(p => p.id === practical.id);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allPracticals.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      onSelectPractical(allPracticals[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectPractical(allPracticals[currentIndex + 1].id);
    }
  };

  const isCompleted = completedIds.includes(practical.id);

  return (
    <PracticalContent
      practical={practical}
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onPreviousPractical={handlePrevious}
      onNextPractical={handleNext}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
    />
  );
}
