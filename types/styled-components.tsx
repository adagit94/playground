import { Keyframes, FlattenSimpleInterpolation } from 'styled-components';

import { AnimationName } from 'types/games/floating-point-online';

type Icon = {
  readonly top: number;
  readonly left: number;
  readonly size: number;
};

export type LayoutContainerProps = {
  readonly foreground: string;
  readonly background: string;
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

export type EnvObjectStyles = {
  readonly width?: number;
  readonly height?: number;
  readonly radius?: number;
  readonly backgroundColor?: string;
  readonly backgroundClip?: string;
  readonly transform?: string;
  readonly border?: string;
  readonly borderRadius?: string;
  readonly animationName?: AnimationName;
  readonly animationDuration?: string;
  readonly animationTimingFunction?: string;
  readonly animationIterationCount?: string;
  readonly animationDelay?: string;
};

export type ShapeProps = {
  readonly top: number;
  readonly left: number;
  readonly className: string;
  readonly styles: EnvObjectStyles;
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

export type GetKeyframe = (props: ShapeProps) => FlattenSimpleInterpolation;
