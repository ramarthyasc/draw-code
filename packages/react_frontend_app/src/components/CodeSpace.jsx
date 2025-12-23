import { useEffect, useState, useRef, forwardRef } from "react";
import { HorizVertSlider } from "./HorizVertSlider.jsx";
import { ResultBox } from "./ResultBox.jsx";
import { useOutletContext } from "react-router-dom";
import { useSecureDataGetter } from "./customhooks/useSecureDataGetter";

// store scrollHeight as localStorage, so that the Height is always there even when changing pages and unmounted


export const CodeSpace = forwardRef((props, codespaceRef) => {

    const textAreaRef = useRef(null);
    const numberAreaRef = useRef(null);
    const pastScrollHeightRef = useRef();
    const maxLineNumberRef = useRef();
    const resultBoxRef = useRef();

    const { jsonWebToken, setJsonWebToken, setUser } = useOutletContext();
    // custom hook
    const { data: result, secureDataGetter } = useSecureDataGetter();
    const [language, setLanguage] = useState('js');
    const selectedLangRef = useRef();

    console.log(jsonWebToken)

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        // side effects - changing jsonWebToken, user
        await secureDataGetter({
            jsonWebToken,
            setJsonWebToken,
            setUser
        }, formData);

    }

    function handleScroll(e) {
        numberAreaRef.current.scrollTop = e.target.scrollTop;

        const computedStyle = window.getComputedStyle(textAreaRef.current);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const scrollDiff = textAreaRef.current.scrollHeight - pastScrollHeightRef.current;
        const maxScrollHeight = lineHeight * maxLineNumberRef.current; //maxLineNumber = 300 initially


        if (scrollDiff > 0 && textAreaRef.current.scrollHeight > maxScrollHeight) {
            maxLineNumberRef.current += 1;
            // when i press enter, i only move one line height downwards at a time - so don't need a loop
            numberAreaRef.current.value += "\n" + maxLineNumberRef.current;
        }

        pastScrollHeightRef.current = Math.max(pastScrollHeightRef.current, e.target.scrollHeight);
    }

    useEffect(() => {
        if (textAreaRef.current) {

            // When we full zoomout the browser, it accomodates less than 300 numbers. So we can put 300 as the maximum number.

            maxLineNumberRef.current = 300;
            numberAreaRef.current.value = "";
            for (let i = 1; i <= maxLineNumberRef.current; i++) {
                if (i === maxLineNumberRef.current) {
                    numberAreaRef.current.value += i;
                    break;
                }
                numberAreaRef.current.value += i + "\n";
            }
        }

        pastScrollHeightRef.current = textAreaRef.current.scrollHeight;

        // numbers showing when scrolling - control the scrolling of numberArea programmatically when i scroll the text area = concept
    }, [])

    //Language
    useEffect(() => {
        async function fetcher() {
            try {
                const body = { 
                    language: language,
                    qid: 1,
                    // qname: ;
                }
                const res = await fetch("/docs/templates", {
                    method: "POST",
                    credentials: "include",
                    // body: 
                })

                if (res.ok) {
                    const template = await res.json();

                } else {
                    console.log("HTTP error: ", res.status);
                }

            } catch (err) {
                console.log("Network/Fetch or parsing error",err);
            }
        }

        fetcher();

    }, [language]);


    function selectOnChange(e) {
        setLanguage(e.target.value);
    }

    return (
        // implement uneditable numbers along the left side +
        // backend verification
        <div ref={codespaceRef} className="flex flex-col outline-1 outline-green-400 font-(family-name:--jet-brains) ">

            <form className="flex flex-col flex-2" id="code-form" onSubmit={handleSubmit}>
                {/* change language */}
                <div className="text-left ">
                    <select name="language" id="drop" onChange={selectOnChange} value={language} 
                        className="border border-black hover:cursor-pointer">
                        <option value="js" className="hover:cursor-pointer">Javascript</option>
                        <option value="c" className="hover:cursor-pointer">C</option>
                    </select>
                </div>

                <div className="flex flex-2">
                    <textarea ref={numberAreaRef} disabled id="row-number" cols="1"
                        className=" text-right border border-black w-10 overflow-hidden resize-none pt-3">
                    </textarea>
                    <textarea ref={textAreaRef} onScroll={handleScroll} cols="130" name="code" id="code"
                        className="flex-2 border border-black resize-none pl-3 pt-3"></textarea>
                </div>
                <HorizVertSlider resultBoxRef={resultBoxRef} />
                <ResultBox ref={resultBoxRef} result={result} />
                <button type="submit" className="px-5 text-blue-700 border rounded" >run</button>
            </form>

        </div>
    )
});

