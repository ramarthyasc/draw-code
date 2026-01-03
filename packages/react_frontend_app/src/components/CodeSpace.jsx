import { useEffect, useState, useRef, forwardRef } from "react";
import { HorizVertSlider } from "./HorizVertSlider.jsx";
import { ResultBox } from "./ResultBox.jsx";
import { useOutletContext } from "react-router-dom";
import { useSecureDataGetter } from "./customhooks/useSecureDataGetter";
import { useParams } from "react-router-dom";
import { OneClickButton } from "./utilityComponents/OneClickButton.js";

// store scrollHeight as localStorage, so that the Height is always there even when changing pages and unmounted


export const CodeSpace = forwardRef((props, codespaceRef) => {

    const textAreaRef = useRef(null);
    const numberAreaRef = useRef(null);
    const pastScrollHeightRef = useRef();
    const maxLineNumberRef = useRef();
    const resultBoxRef = useRef();

    const { jsonWebToken, setJsonWebToken, setUser } = useOutletContext();
    // custom hook
    const { data: result, setData: setResult, secureDataGetter } = useSecureDataGetter();
    const [language, setLanguage] = useState('js');
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [qTemplate, setQTemplate] = useState();
    //extract from route params
    const params = useParams();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    console.log(jsonWebToken)

    async function handleSubmit(e) {
        e.preventDefault();

        // Don't send requests when pressing the submit button when loading (ie' it's fetching)
        if (isButtonLoading) { return; }

        const formData = new FormData(e.target);
        // side effects - changing jsonWebToken, user
        try {
            setIsButtonLoading(true);
            await secureDataGetter({
                jsonWebToken,
                setJsonWebToken,
                setUser
            },
                params.qname,
                formData);
        } catch (err) {
            setError(err);
        }
        setIsButtonLoading(false);

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

    // Showing numbers
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
                console.log(params.qname);
                const res = await fetch(`/docs/templates/${params.qname}?language=${language}`, {
                    method: "GET",
                })

                if (res.ok) {
                    const qtemplate = await res.text();
                    setIsLoading(false);
                    setQTemplate(qtemplate);
                    setResult(""); // Reset the Resultbox result
                    console.log(qtemplate);

                } else {
                    console.log("HTTP error: ", res.status);
                    setError(new Error(`Http error: ${res.status}`));
                }

            } catch (err) {
                console.log("Network/Fetch or parsing error", err);
                setError(err);
            }
        }

        fetcher();

    }, [params.qname, language]);


    function selectOnChange(e) {
        setLanguage(e.target.value);
        setIsLoading(true);
    }
    function editOnChange(e) {
        setQTemplate(e.target.value);
    }

    if (error) {
        throw error;
    }
    // loading state given inside async handling & useEffect's elements only
    const submitProps = {
        id: "submit-button",
        name: "Submit",
        color: "green",
        type: "submit"
    }
    const loadingProps = {
        id: "submit-button",
        name: "🌀",
        color: "green",
        type: "submit"
    }
    return (
        // implement uneditable numbers along the left side +
        // backend verification
        <div ref={codespaceRef} className="flex flex-col font-jet-brains">

            <form className="flex flex-col flex-2" id="code-form" onSubmit={handleSubmit}>
                {/* change language */}
                <div className="text-left">
                    <select name="language" id="drop" onChange={selectOnChange} value={language}
                        className="border-t border-r border-b border-black hover:cursor-pointer">
                        <option value="js" className="hover:cursor-pointer">Javascript</option>
                        <option value="c" className="hover:cursor-pointer">C</option>
                    </select>
                </div>

                <div className="flex flex-2">
                    <textarea ref={numberAreaRef} disabled id="row-number" cols="1"
                        className=" text-right border-t border-r border-b border-black w-10 overflow-hidden resize-none pt-3"
                    > </textarea>
                    <textarea ref={textAreaRef} onScroll={handleScroll}
                        value={isLoading ? "...loading" : qTemplate} onChange={editOnChange}
                        cols="130" name="code" id="code"
                        className="flex-2 border border-black resize-none pl-3 pt-3"
                    ></textarea>
                </div>

                <HorizVertSlider resultBoxRef={resultBoxRef} />
                <ResultBox ref={resultBoxRef} result={result} />

                <div className="flex justify-end px-2 border-t border-r border-b border-solid py-2 min-w-24 bg-amber-100">
                    {isButtonLoading ?
                        <OneClickButton buttonProps={loadingProps} /> :
                        <OneClickButton buttonProps={submitProps} />
                    }
                </div>
            </form>

        </div>
    )
});

