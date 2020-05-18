import { gamesList } from './lists';
import { StatReplacer, CalculateMostPlayed } from '../types/helpers';

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

export const calculateMostPlayed: CalculateMostPlayed = (user, games) => {

};