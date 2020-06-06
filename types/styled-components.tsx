import { Keyframes } from 'styled-components';

import { ShapeStyles } from 'types/games/floating-point-online';

type Icon = {
  readonly top: number;
  readonly left: number;
  readonly size: number;
};

export type LayoutContainerProps = {
  readonly color: string;
  readonly backgroundColor: string;
};

export type AvatarProps = {
  readonly width: number;
  readonly height: number;
  readonly avatar: string;
};

export type SliderProps = {
  readonly isAuthenticated: boolean;
};

export type CountProps = {
  readonly validCount: boolean;
};

export type UpperProps = {
  readonly includesUpper: boolean;
};

export type NumProps = {
  readonly includesNum: boolean;
};

export type SpecialProps = {
  readonly includesSpecial: boolean;
};

export type LabelPasswordProps = {
  readonly highlightInvalid: boolean;
  readonly validPassword: boolean;
};

export type LabelPasswordConfirmProps = {
  readonly highlightInvalid: boolean;
  readonly equalPasswords: boolean;
};

export type DividerProps = {
  readonly color: string;
};

export type RectangleShapeProps = {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
  readonly styles: ShapeStyles;
};

export type CircleShapeProps = {
  readonly top: number;
  readonly left: number;
  readonly size: number;
  readonly styles: ShapeStyles;
};

export type InputCustomRadioButtonProps = {
  readonly checked: boolean;
};

export type PlayerIconProps = Icon & {
  readonly avatar: string;
};

export type FPIconProps = Icon;

export type AnimProps = {
  readonly animation: Keyframes;
};

export type ContainerStatsProps = {
  readonly statsLength: number;
};

export type ButtonReadyProps = {
  readonly isReady: boolean;
  readonly highlightUnready: boolean;
};

export type EnvOptionsContainerProps = {
  readonly highlightEnvOptions: boolean;
  readonly voted: boolean;
};

export type ValidationWindowProps = {
  readonly typedPassword: boolean;
};

export type WindowStatsExtendedProps = {
  readonly haveStats: boolean;
};

export type LoadingIndicatorFragmentsProps = { readonly animation: Keyframes };

export type LoadingIndicatorProps = { readonly color: string };

export type GetKeyframe = (props: any) => any;
