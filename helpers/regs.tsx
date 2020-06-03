import { KeyReplacer } from 'types/helpers';
import { GameList, GameNames } from 'types/games/generic';
import { EnvList, EnvNames } from 'types/games/floating-point-online';

const gamesArr: GameList = ['floatingPoint'];
const envArr: EnvList = ['testI', 'testII'];

export const keyReplacer: KeyReplacer = (
  match,
  first,
  afterFirst,
  next,
  afterNext
) => {
  let edited = first.toUpperCase() + afterFirst;

  if (next) {
    edited +=
      ' ' +
      (gamesArr.includes(match as GameNames) ||
      envArr.includes(match as EnvNames)
        ? next
        : next.toLowerCase()) +
      afterNext;
  }

  return edited;
};
