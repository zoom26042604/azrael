import { MouseEvent, KeyboardEvent, FocusEvent, ChangeEvent } from 'react';

// Type strict pour les événements HTML
export type MouseHandler<T = HTMLElement> = (event: MouseEvent<T>) => void;
export type KeyboardHandler<T = HTMLElement> = (event: KeyboardEvent<T>) => void;
export type FocusHandler<T = HTMLElement> = (event: FocusEvent<T>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: ChangeEvent<T>) => void;

// Types spécifiques pour les boutons
export type ButtonMouseHandler = MouseHandler<HTMLButtonElement>;
export type ButtonKeyboardHandler = KeyboardHandler<HTMLButtonElement>;

// Types spécifiques pour les liens
export type LinkMouseHandler = MouseHandler<HTMLAnchorElement>;
export type LinkKeyboardHandler = KeyboardHandler<HTMLAnchorElement>;

// Types spécifiques pour les inputs
export type InputChangeHandler = ChangeHandler<HTMLInputElement>;
export type InputFocusHandler = FocusHandler<HTMLInputElement>;
export type InputKeyboardHandler = KeyboardHandler<HTMLInputElement>;

// Types spécifiques pour les textarea
export type TextareaChangeHandler = ChangeEvent<HTMLTextAreaElement>;
export type TextareaFocusHandler = FocusEvent<HTMLTextAreaElement>;

// Types pour les divs cliquables
export type DivMouseHandler = MouseHandler<HTMLDivElement>;
export type DivKeyboardHandler = KeyboardHandler<HTMLDivElement>;
