

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
     res0 = solution.grambu("Was it a car or a cat I saw?");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res0) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 0,` + 
`"pass": ${comparer(true, res0)},` +
`"input": "Was it a car or a cat I saw?",` +
`"userOutput": ${stringLogger(res0)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res1;
try {
     res1 = solution.grambu("tab a cat");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res1) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 1,` + 
`"pass": ${comparer(false, res1)},` +
`"input": "tab a cat",` +
`"userOutput": ${stringLogger(res1)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res2;
try {
     res2 = solution.grambu("A man, a plan, a canal: Panama");
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
`"input": "A man, a plan, a canal: Panama",` +
`"userOutput": ${stringLogger(res2)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res3;
try {
     res3 = solution.grambu("race a car");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res3) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 3,` + 
`"pass": ${comparer(false, res3)},` +
`"input": "race a car",` +
`"userOutput": ${stringLogger(res3)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res4;
try {
     res4 = solution.grambu(" ");
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
`"input": " ",` +
`"userOutput": ${stringLogger(res4)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res5;
try {
     res5 = solution.grambu("a");
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
`"input": "a",` +
`"userOutput": ${stringLogger(res5)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res6;
try {
     res6 = solution.grambu("aa");
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
`"input": "aa",` +
`"userOutput": ${stringLogger(res6)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res7;
try {
     res7 = solution.grambu("ab");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res7) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 7,` + 
`"pass": ${comparer(false, res7)},` +
`"input": "ab",` +
`"userOutput": ${stringLogger(res7)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res8;
try {
     res8 = solution.grambu("!!!");
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
`"input": "!!!",` +
`"userOutput": ${stringLogger(res8)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res9;
try {
     res9 = solution.grambu("0P");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res9) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 9,` + 
`"pass": ${comparer(false, res9)},` +
`"input": "0P",` +
`"userOutput": ${stringLogger(res9)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res10;
try {
     res10 = solution.grambu("No lemon, no melon");
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
`"input": "No lemon, no melon",` +
`"userOutput": ${stringLogger(res10)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res11;
try {
     res11 = solution.grambu("Was it a car or a cat I saw");
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
`"input": "Was it a car or a cat I saw",` +
`"userOutput": ${stringLogger(res11)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res12;
try {
     res12 = solution.grambu("12321");
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
`"input": "12321",` +
`"userOutput": ${stringLogger(res12)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res13;
try {
     res13 = solution.grambu("123421");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res13) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 13,` + 
`"pass": ${comparer(false, res13)},` +
`"input": "123421",` +
`"userOutput": ${stringLogger(res13)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res14;
try {
     res14 = solution.grambu("Able was I ere I saw Elba");
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
`"input": "Able was I ere I saw Elba",` +
`"userOutput": ${stringLogger(res14)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res15;
try {
     res15 = solution.grambu("Madam In Eden, I’m Adam");
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
`"input": "Madam In Eden, I’m Adam",` +
`"userOutput": ${stringLogger(res15)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res16;
try {
     res16 = solution.grambu("racecar");
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
`"input": "racecar",` +
`"userOutput": ${stringLogger(res16)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res17;
try {
     res17 = solution.grambu("palindrome");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res17) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 17,` + 
`"pass": ${comparer(false, res17)},` +
`"input": "palindrome",` +
`"userOutput": ${stringLogger(res17)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res18;
try {
     res18 = solution.grambu("   ");
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
`"input": "   ",` +
`"userOutput": ${stringLogger(res18)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res19;
try {
     res19 = solution.grambu("a!@#a");
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
`"input": "a!@#a",` +
`"userOutput": ${stringLogger(res19)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res20;
try {
     res20 = solution.grambu("a!b@a");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res20) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 20,` + 
`"pass": ${comparer(true, res20)},` +
`"input": "a!b@a",` +
`"userOutput": ${stringLogger(res20)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res21;
try {
     res21 = solution.grambu("abc!cba");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res21) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 21,` + 
`"pass": ${comparer(true, res21)},` +
`"input": "abc!cba",` +
`"userOutput": ${stringLogger(res21)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res22;
try {
     res22 = solution.grambu("abc123321cba");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res22) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 22,` + 
`"pass": ${comparer(true, res22)},` +
`"input": "abc123321cba",` +
`"userOutput": ${stringLogger(res22)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res23;
try {
     res23 = solution.grambu("abc12321cba");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res23) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 23,` + 
`"pass": ${comparer(true, res23)},` +
`"input": "abc12321cba",` +
`"userOutput": ${stringLogger(res23)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res24;
try {
     res24 = solution.grambu("ab!c12#3cba");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res24) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 24,` + 
`"pass": ${comparer(false, res24)},` +
`"input": "ab!c12#3cba",` +
`"userOutput": ${stringLogger(res24)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res25;
try {
     res25 = solution.grambu("abcdefghijklmnopqrstuvwxyzzyxwvutsrqponmlkjihgfedcba");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res25) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 25,` + 
`"pass": ${comparer(true, res25)},` +
`"input": "abcdefghijklmnopqrstuvwxyzzyxwvutsrqponmlkjihgfedcba",` +
`"userOutput": ${stringLogger(res25)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res26;
try {
     res26 = solution.grambu("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res26) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 26,` + 
`"pass": ${comparer(false, res26)},` +
`"input": "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",` +
`"userOutput": ${stringLogger(res26)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res27;
try {
     res27 = solution.grambu("1234567890987654321");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res27) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 27,` + 
`"pass": ${comparer(true, res27)},` +
`"input": "1234567890987654321",` +
`"userOutput": ${stringLogger(res27)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res28;
try {
     res28 = solution.grambu("12345678900987654321");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(true, res28) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 28,` + 
`"pass": ${comparer(true, res28)},` +
`"input": "12345678900987654321",` +
`"userOutput": ${stringLogger(res28)},` + 
`"expOutput": true }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res29;
try {
     res29 = solution.grambu("1234567890123456789");
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(false, res29) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 29,` + 
`"pass": ${comparer(false, res29)},` +
`"input": "1234567890123456789",` +
`"userOutput": ${stringLogger(res29)},` + 
`"expOutput": false }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n



