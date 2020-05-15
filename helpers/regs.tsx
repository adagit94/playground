import { StatReplacer } from '../types/helpers';

export const statReg = /^([a-z])([a-z]+)(?:([A-Z])([a-z]+))?/;

export const statReplacer: StatReplacer = (
  match,
  first,
  afterFirst,
  next,
  afterNext
) => {
  const firstToUpper = first.toUpperCase();
  const nextToLower = next && next.toLowerCase();

  let edited = firstToUpper + afterFirst;

  if (next) edited += ' ' + nextToLower + afterNext;

  return edited;
};
