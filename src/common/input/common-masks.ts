/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/mineco-application
 */

import { InputMask } from "./index";

/**
 * List of common masks for the input component
 */
const commonMasks = {
    /** Just clean extra spaces from input */
    cleanSpaces: [ /\s{2,}/, " " ] as InputMask,

    /** Allow input only latin symbols and numbers */
    numbersLatinOnly: [ /[^A-Za-z0-9]/g, "" ] as InputMask,

    /** Allow input latin symbols, numbers and some special symbols */
    latinWithSymbols: [ /[^A-Za-z0-9\-_+=.,?!()*$#%^&\\|/<>\[\]"@ ]/g, "" ] as InputMask,

    /** Allow input latin and cyrillic symbols, numbers and some special symbols */
    latinCyrillicWithSymbols: [ /[^A-Za-zА-ЯЁа-яё0-9\-_+=.,?!()*$#%^&\\|/<>\[\]"@ ]/g, "" ] as InputMask,

    /** Allow input only latin and cyrillic symbols and numbers */
    latinCyrillicOnly: [ /[^A-Za-z0-9А-ЯЁа-яё]/g, "" ] as InputMask,

    /** Just format punctuation of the input value */
    formatPunctuation: [
        [ /\s{2,}/, " " ],
        [ /([,.]){2,}/g, "$1" ],
        [ /([,.])([^\s])/g, "$1 $2" ],
        [ /\.\s([a-zа-яё])/g, (f: string) => f.toLocaleUpperCase() ],
        [ /(\s+)([А-Я])\.\s+([А-Я])\.(\s*)/g, "$1$2.$3.$4" ]
    ] as InputMask[]
};

export default commonMasks;
