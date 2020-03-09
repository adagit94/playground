import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { IconShape } from '../../styled-components/icons';
import { ContainerOption } from '../../styled-components/containers';

import {
  ContextParams,
  ContextDispatches
} from '../../../contexts/games/floating-point';

import { Colors } from '../../../types/layout';
import {
  PropsOptions,
  StatesPlayers
} from '../../../types/games/floating-point';

const ContainerIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 100px;
  width: 100px;
`;

const Shape: React.FC<PropsOptions> = ({ player }): JSX.Element => {
  const states = useContext(ContextParams);
  const colors: Colors = useContext(ThemeContext);
  const dispatches = useContext(ContextDispatches);

  const {
    shapesOthers,
    [player as keyof StatesPlayers]: { shape, color }
  } = states;

  const isDefined = typeof shape === 'string';
  const unclickableSquare =
    shapesOthers.includes('square') && shape !== 'square';
  const unclickableCircle =
    shapesOthers.includes('circle') && shape !== 'circle';
  const unclickableTriangle =
    shapesOthers.includes('triangle') && shape !== 'triangle';
  const unclickableCross = shapesOthers.includes('cross') && shape !== 'cross';

  const Label = styled.label`
    color: ${shape === null && '#f00'};
  `;

  const Square = styled(IconShape)`
    opacity: ${unclickableSquare ? 0.5 : 1};
    cursor: ${unclickableSquare ? 'not-allowed' : 'pointer'};
  `;

  const Circle = styled(IconShape)`
    opacity: ${unclickableCircle ? 0.5 : 1};
    cursor: ${unclickableCircle ? 'not-allowed' : 'pointer'};
  `;

  const Triangle = styled(IconShape)`
    opacity: ${unclickableTriangle ? 0.5 : 1};
    cursor: ${unclickableTriangle ? 'not-allowed' : 'pointer'};
  `;

  const Cross = styled(IconShape)`
    opacity: ${unclickableCross ? 0.5 : 1};
    cursor: ${unclickableCross ? 'not-allowed' : 'pointer'};
  `;

  return (
    <ContainerOption>
      <Label htmlFor='color'>Shape:</Label>
      <ContainerIcons>
        <Square
          onClick={
            unclickableSquare
              ? null
              : (): void => {
                  dispatches.params({
                    type: 'handleShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'square'
                      ? 'remove'
                      : 'change',
                    shape: 'square',
                    player
                  });
                }
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='3.2 3.2 17.5 17.5'>
            <path
              stroke={
                shape === 'square'
                  ? colors.theme === 'dark'
                    ? '#ffffff'
                    : '#000000'
                  : 'none'
              }
              strokeWidth='0.5'
              fill={color}
              d='M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H7c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z'
            />
          </svg>
        </Square>

        <Circle
          onClick={
            unclickableCircle
              ? null
              : (): void => {
                  dispatches.params({
                    type: 'handleShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'circle'
                      ? 'remove'
                      : 'change',
                    shape: 'circle',
                    player
                  });
                }
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 22 22'>
            <path
              stroke={
                shape === 'circle'
                  ? colors.theme === 'dark'
                    ? '#ffffff'
                    : '#000000'
                  : 'none'
              }
              strokeWidth='0.5'
              fill={color}
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
            />
          </svg>
        </Circle>

        <Triangle
          onClick={
            unclickableTriangle
              ? null
              : (): void => {
                  dispatches.params({
                    type: 'handleShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'triangle'
                      ? 'remove'
                      : 'change',
                    shape: 'triangle',
                    player
                  });
                }
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 21.5 21.5'>
            <path
              stroke={
                shape === 'triangle'
                  ? colors.theme === 'dark'
                    ? '#ffffff'
                    : '#000000'
                  : 'none'
              }
              strokeWidth='0.5'
              fill={color}
              d='M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z'
            />
          </svg>
        </Triangle>

        <Cross
          onClick={
            unclickableCross
              ? null
              : (): void => {
                  dispatches.params({
                    type: 'handleShape',
                    operation: !isDefined
                      ? 'add'
                      : shape === 'cross'
                      ? 'remove'
                      : 'change',
                    shape: 'cross',
                    player
                  });
                }
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='3.7 3.7 16.3 16.3'>
            <path
              stroke={
                shape === 'cross'
                  ? colors.theme === 'dark'
                    ? '#ffffff'
                    : '#000000'
                  : 'none'
              }
              strokeWidth='0.5'
              fill={color}
              d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
            />
          </svg>
        </Cross>
      </ContainerIcons>
    </ContainerOption>
  );
};

export default React.memo(Shape);
