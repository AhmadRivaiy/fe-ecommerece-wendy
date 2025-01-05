export const formatCurrency = (amount: number | undefined, zoneFormat: string): string => {
    const formatter = new Intl.NumberFormat(zoneFormat, {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(amount ?? 0).replace(/IDR/, 'Rp.').trim();
};

export const gramsToSomeUnit = (grams: number, unit: 'gram' | 'kilogram' | 'milligram' | 'ounce' | 'pound' ): string => {
    const conversionRates: { [key: string]: number } = {
        'milligram': 1000,   // 1 gram = 1000 milligram
        'gram': 1,           // 1 gram = 1 gram
        'kilogram': 0.001,   // 1 gram = 0.001 kilogram
        'ounce': 0.03527396, // 1 gram = 0.03527396 ounce
        'pound': 0.00220462  // 1 gram = 0.00220462 pound
    };

    const convertedValue = grams * conversionRates[unit];
    const formatter = new Intl.NumberFormat('en', {
        style: 'unit',
        unit: unit,
        unitDisplay: 'long',
    });

    return formatter.format(convertedValue).replace(unit + 's', '').trim();
}

// to uppercaser
export const toUpperCase = (str: string): string => {
    return str.toUpperCase();
}