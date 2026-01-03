import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";




function Home() {

    const { user } = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [questionsList, setQuestionsList] = useState();

    useEffect(() => {
        async function questionsListfetcher() {
            try {

                let res = await fetch("/draw-question", {
                    method: "GET",
                    credentials: 'include',
                })


                if (res.ok) {
                    const questionsList = await res.json();
                    setIsLoading(false);
                    setQuestionsList(questionsList);
                } else {
                    console.log("HTTP Status: ", res.status);
                    console.log("Status Text: ", res.statusText);
                    // don't need Error handling as it's a developer error
                    setError(new Error(`Request failed with status: ${res.status}`));
                    return;
                }

            } catch (err) {
                console.log(err);
                // user's network error. So need error handler
                setError(err);
                return;
            }
        }
        questionsListfetcher();
        return () => {
            console.log("UNMOUNT HOME");
        }

    }, [])

    if (error) {
        throw error;
    }

    if (isLoading) {
        return "loading";
    } else {
        return (
            <div className="flex flex-col justify-center items-center h-screen pb-80">
                <div className="mb-20">
                    <svg width="100" height="100" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 20.0004H19.9999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.9999 4.00038L17.9999 8.00038" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.1739 5.81238C20.7026 5.2838 20.9997 4.56685 20.9998 3.81923C20.9999 3.07162 20.703 2.35459 20.1744 1.82588C19.6459 1.29717 18.9289 1.00009 18.1813 1C17.4337 0.999906 16.7166 1.2968 16.1879 1.82538L2.84193 15.1744C2.60975 15.4059 2.43805 15.6909 2.34193 16.0044L1.02093 20.3564C0.99509 20.4429 0.993138 20.5347 1.01529 20.6222C1.03743 20.7097 1.08285 20.7896 1.14673 20.8534C1.21061 20.9172 1.29055 20.9624 1.37809 20.9845C1.46563 21.0065 1.55749 21.0044 1.64393 20.9784L5.99693 19.6584C6.3101 19.5631 6.59511 19.3925 6.82693 19.1614L20.1739 5.81238Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>

                <div className="flex">
                    <div className="text-8xl mb-20">
                        Draw-code
                    </div>
                    <div className="pl-5 text-8xl mb-20 text-amber-400">
                        →
                    </div>
                </div>
                <table className="mr-20">
                    <thead>
                        <tr className="border-b font-bold">
                            <td className="border-r pr-2">Id</td>
                            <td className="border-r text-center">Problem</td>
                            <td className="pl-2 text-center">Difficulty</td>
                        </tr>
                    </thead>
                    <tbody>
                        {questionsList.map((obj, i) => {
                            return (
                                <tr className={`${questionsList.length - 1 === i ? "" : "border-b"}`} key={obj.id}>
                                    <td className="border-r text-center">
                                        <Link to={`/draw-code/${obj.name}`}>{obj.id}</Link>
                                    </td>
                                    <td className="border-r px-2">
                                        <Link to={`/draw-code/${obj.name}`}>{obj.name}</Link>
                                    </td>
                                    <td className="text-center">{obj.difficulty}</td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table >
            </div>
        )

    }
}



export default Home;
