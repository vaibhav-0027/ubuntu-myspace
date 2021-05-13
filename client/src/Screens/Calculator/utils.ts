interface CalcOption {
    value?: string;
    src?: string;
    big?: boolean;
    engineVal: string;
}

export const CALCOPTIONS: Array<Array<CalcOption>> = [
    [
        { value: 'C', engineVal: 'C' },
        { value: '+/-', engineVal: '=/-' },
        { src: "ri-percent-line", engineVal: '%' },
        { src: "ri-divide-fill", engineVal: "\u00F7" },
    ],
    [
        { value: '7', engineVal: '7' },
        { value: '8', engineVal: '8' },
        { value: '9', engineVal: '9' },
        { src: "ri-close-line", engineVal: 'x' },
    ],
    [
        { value: '4', engineVal: '4' },
        { value: '5', engineVal: '5' },
        { value: '6', engineVal: '6' },
        { src: "ri-subtract-line", engineVal: '-' },
    ],
    [
        { value: '1', engineVal: '1' },
        { value: '2', engineVal: '2' },
        { value: '3', engineVal: '3' },
        { src: "ri-add-line", engineVal: '+' },
    ],
    [
        { value: '.', engineVal: '.' },
        { value: '0', engineVal: '0' },
        { value: "=", big: true, engineVal: '=' },
    ],
]