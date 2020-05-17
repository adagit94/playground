import { gamesList } from './lists';
import { StatReplacer } from '../types/helpers';

export const statReg = /^([a-z])([a-z]+)(?:([A-Z])([a-z]+))?/;

export const statReplacer: StatReplacer = (
  match,
  first,
  afterFirst,
  next,
  afterNext
) => {
  let edited = first.toUpperCase() + afterFirst;

  if (next) {
    edited +=
      ' ' + (gamesList.includes(match) ? next : next.toLowerCase()) + afterNext;
  }

  return edited;
};
