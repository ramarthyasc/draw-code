

class Solution {

  
    grambu() {
console.log("heyyy")
    }
}

const solution = new Solution();




function comparer(k, u) {

    let isSame = true;
    arrayOrObjectOrPrimitiveComparer(k, u);

    return isSame;

    //Case's known output array = known, User's result array/don't know which data type = unknown
    function arrayOrObjectOrPrimitiveComparer(known, unknown) {
        if (Array.isArray(known)) {
            if (!Array.isArray(unknown)) {
                isSame = false;
                return;
            }
            if (known.length !== unknown.length) {
                isSame = false;
                return;
            }

            // If known is empty array
            if (known.length === 0 && known.length === unknown.length) {
                return;
            }

            for (let i = 0; i < known.length; i++) {
                arrayOrObjectOrPrimitiveComparer(known[i], unknown[i]);
                if (isSame === false) { return; }
            }
        } else if (Object.prototype.toString.call(known) === "[object Object]") {
            if (Object.prototype.toString.call(unknown) !== "[object Object]") {
                isSame = false;
                return;
            }
            if (Object.entries(known).length !== Object.entries(unknown).length) {
                isSame = false;
                return;
            }
            //converted to array - to be used by the recurser
            known = Object.entries(known);
            unknown = Object.entries(unknown);
            if (known.length === 0 && known.length === unknown.length) {
                return;
            }

            for (let i = 0; i < known.length; i++) {
                arrayOrObjectOrPrimitiveComparer(known[i], unknown[i]);
                if (isSame === false) { return; }
            }

        } else {
            // BASE CASE
            // From the Array of Array of Array... Arrays, we get the string/number/boolean literals as known & unknown
            if (known !== unknown) {
                isSame = false;
                return;
            }
        }

    }
}



function stringify(input) {
    if ( typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
    } else if (
        typeof input === "string" 
    ){
        return `"${input}"`
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}



function stringLogger(input) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
    } else if (typeof input === "undefined") {
        return `"undefined"`;
    } else if (typeof input === "function") {
        return `"function"`;
    } else if (typeof input === "string") {
        return `"${input}"`;
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}




let res0;
try {
     res0 = solution.grambu("do you want to play a game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res0) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 0,` + 
`"pass": ${comparer(false, res0)},` +
`"input": "do you want to play a game ?",` +
`"userOutput": ${stringLogger(res0)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res1;
try {
     res1 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res1) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 1,` + 
`"pass": ${comparer(true, res1)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res1)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res2;
try {
     res2 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res2) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 2,` + 
`"pass": ${comparer(true, res2)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res2)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res3;
try {
     res3 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res3) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 3,` + 
`"pass": ${comparer(true, res3)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res3)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res4;
try {
     res4 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res4) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 4,` + 
`"pass": ${comparer(true, res4)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res4)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res5;
try {
     res5 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res5) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 5,` + 
`"pass": ${comparer(true, res5)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res5)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res6;
try {
     res6 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res6) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 6,` + 
`"pass": ${comparer(true, res6)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res6)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res7;
try {
     res7 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res7) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 7,` + 
`"pass": ${comparer(true, res7)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res7)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res8;
try {
     res8 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res8) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 8,` + 
`"pass": ${comparer(true, res8)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res8)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res9;
try {
     res9 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res9) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 9,` + 
`"pass": ${comparer(true, res9)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res9)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res10;
try {
     res10 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res10) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 10,` + 
`"pass": ${comparer(true, res10)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res10)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res11;
try {
     res11 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res11) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 11,` + 
`"pass": ${comparer(true, res11)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res11)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res12;
try {
     res12 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res12) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 12,` + 
`"pass": ${comparer(true, res12)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res12)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res13;
try {
     res13 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res13) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 13,` + 
`"pass": ${comparer(true, res13)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res13)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res14;
try {
     res14 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res14) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 14,` + 
`"pass": ${comparer(true, res14)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res14)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res15;
try {
     res15 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res15) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 15,` + 
`"pass": ${comparer(true, res15)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res15)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res16;
try {
     res16 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res16) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 16,` + 
`"pass": ${comparer(true, res16)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res16)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res17;
try {
     res17 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res17) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 17,` + 
`"pass": ${comparer(true, res17)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res17)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res18;
try {
     res18 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res18) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 18,` + 
`"pass": ${comparer(true, res18)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res18)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res19;
try {
     res19 = solution.grambu("is it a good game ?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res19) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 19,` + 
`"pass": ${comparer(true, res19)},` +
`"input": "is it a good game ?",` +
`"userOutput": ${stringLogger(res19)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n



