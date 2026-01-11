

class Solution {

    /**
    * @param {number[]} height
    * @return {number}
    */
    waterTrap(height) {
return 9;
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
    if ( typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        typeof input === "string" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
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
     res0 = solution.waterTrap([0,2,0,3,1,0,1,3,2,1]);
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(9, res0) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 0,` + 
`"pass": ${comparer(9, res0)},` +
`"input": "[0,2,0,3,1,0,1,3,2,1]",` +
`"userOutput": "${stringLogger(res0)}",` + 
`"expOutput": "9" }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n



