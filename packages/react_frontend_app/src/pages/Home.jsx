import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";




function Home() {

    const { user } = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [questionsList, setQuestionsList] = useState();
    console.log(questionsList);

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
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Problem</td>
                        <td>Difficulty</td>
                    </tr>
                </thead>
                <tbody>
                    {questionsList.map((obj) => {
                        return (
                            <tr key={obj.id}>
                                <td>
                                    <Link to={`/draw-code/${obj.name}`}>{obj.id}</Link>
                                </td>
                                <td>
                                    <Link to={`/draw-code/${obj.name}`}>{obj.name}</Link>
                                </td>
                                <td>{obj.difficulty}</td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table >
        )

    }
}



export default Home;
