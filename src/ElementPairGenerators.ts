import { CSSProperties } from 'react'

export interface ColorCombo {
    commonName: string,
    darkColor: string,
    color: string,
    lightColor: string
}

export interface ElementChild {
    style: CSSProperties,
    color: ColorCombo
}

/*
 Represents the style of a container and all of its children
 */
export interface ElementPair {
    fakeViewportContainer: CSSProperties,
    container: CSSProperties,
    children: ElementChild[]
}

const initialContainer: CSSProperties = {
    border: '3px solid grey'
};

const initialChild: CSSProperties = {
};

const childrenColors: ColorCombo[] = [
    { commonName: 'Red', darkColor: '#b32212', color: '#e05b4c', lightColor: '#f29288' },
    { commonName: 'Blue', darkColor: '#0e3db3', color: '#296fd9', lightColor: '#4b91fa' },
    { commonName: 'Green', darkColor: '#07693d', color: '#1a9c62', lightColor: '#51c491' },
    { commonName: 'Orange', darkColor: '#a87100', color: '#d18e04', lightColor: '#f5c056' }
];

const randInt = (max: number) => Math.floor(Math.random() * max);

const generateRandomElement = (properties: {[name: string]: string[]}) => {
    const element: any = {};
    const allPropertyNames = new Set(Object.keys(properties));
    const totalPropertyCount = randInt(allPropertyNames.size) + 1;

    for (let propCounter = 0; propCounter < totalPropertyCount; propCounter++) {
        // pick a random property
        const randPropIndex = randInt(allPropertyNames.size);
        const randomPropName = Array.from(allPropertyNames.keys())[randPropIndex];
        allPropertyNames.delete(randomPropName);

        // pick a random value
        const randomValueIndex = randInt(properties[randomPropName].length);
        const randomPropValue = properties[randomPropName][randomValueIndex];

        element[randomPropName] = randomPropValue;
    }

    return element;
};

export const generateBlockPair = (count: number) => {
    const containerProperties = {
        position: ['relative', 'static'],
        display: ['block'],
    };

    const childProperties = {
        display: ['block', 'inline'],
        position: ['relative', 'static', 'absolute'],
        margin: ['10px 0', '0 10px', '10px 0 0 0', '0 0 10px 0', '0 10px 0 0'],
        padding: ['10px 0', '0 10px', '10px 0 0 0', '0 0 10px 0', '0 10px 0 0'],
    };

    const pair: Partial<ElementPair> = {
        container: {
            ...initialContainer,
            ...generateRandomElement(containerProperties)
        },
        children: []
    };

    for (let i = 0; i < count; i++) {
        // @ts-ignore
        pair.children.push({
            style: {
                ...initialChild,
                ...generateRandomElement(childProperties)
            },
            color: childrenColors[i]
        })
    }

    return pair
};