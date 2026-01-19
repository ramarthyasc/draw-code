

class Solution {

    /**
     * @param {{nums: number[], target: number}} param0
     * @return {number}
     */
    search({nums, target}) {
let left = 0;
        let right = nums.length-1;

        while (left <= right) {
            const mid = left + Math.floor((right - left)/2);
            console.log("hello")
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid - 1;
            }
        }
        return 82;
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
     res0 = solution.search({"nums":[-1,0,2,4,6,8],"target":4});
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(3, res0) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 0,` + 
`"pass": ${comparer(3, res0)},` +
`"input": {"nums":[-1,0,2,4,6,8],"target":4},` +
`"userOutput": ${stringLogger(res0)},` + 
`"expOutput": 3 }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n





let res1;
try {
     res1 = solution.search({"nums":[-1,0,2,4,6,8],"target":3});
} catch(err) {
    // to be written to FD2
    throw err;
}

// try {
//     comparer(-1, res1) ? 
//         console.log("PASS<br>") : console.log("FAIL<br>");
// } catch(err) {
//     throw err;
// }

// Make a JSON format
    console.log(`{ "id": 1,` + 
`"pass": ${comparer(-1, res1)},` +
`"input": {"nums":[-1,0,2,4,6,8],"target":3},` +
`"userOutput": ${stringLogger(res1)},` + 
`"expOutput": -1 }`);

// "userOutput", "input", "expOutput" is made with "" characters. 
// So that JSON.parse can be done safely even if the value is undefined or a function.
    
    console.log("_&&_@849"); //problem case separator =  _&&_@849\n



