import { UNITS } from './units';
import { practicalsUnit1 } from './practicalsUnit1';
import { practicalsUnit2 } from './practicalsUnit2';
import { practicalsUnit3 } from './practicalsUnit3';
import { practicalsUnit4 } from './practicalsUnit4';
import { practicalsUnit5 } from './practicalsUnit5';

export const allPracticals = [
  ...practicalsUnit1,
  ...practicalsUnit2,
  ...practicalsUnit3,
  ...practicalsUnit4,
  ...practicalsUnit5,
];

export { UNITS };

export function getAllPracticals() {
  return allPracticals;
}

export function getPracticalById(id) {
  const numericId = parseInt(id, 10);
  return allPracticals.find(p => p.id === numericId) || allPracticals[0];
}

export function getPracticalsByUnit(unitNumber) {
  return allPracticals.filter(p => p.unit === unitNumber);
}

export function searchPracticals(query) {
  if (!query || query.trim() === '') return allPracticals;
  const q = query.toLowerCase().trim();
  return allPracticals.filter(p => {
    return (
      p.id.toString() === q ||
      p.title.toLowerCase().includes(q) ||
      p.shortTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.unitTitle.toLowerCase().includes(q)
    );
  });
}
