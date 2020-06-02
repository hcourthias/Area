export interface IForm {
    slider?: ISlider;
    input?: IInput;
    checkbox?: ICheckBox;
    selectionBox?: ISelectionBox;
}

export interface IField {
    name: string;
    title: string;
}

export interface ISlider extends IField {
    values: Array<string>;
}

export interface IInput extends IField {
    regex: string;
}

export interface ICheckBox extends IField {
    values: Array<string>;
}

export interface ISelectionBox extends IField {
    values: Array<string>;
}