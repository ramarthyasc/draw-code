import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export type Difficulty = "easy" | "medium" | "hard";
export interface IQuestionsList {
    id: number;
    name: string;
    difficulty: Difficulty;
}

export interface IUserDetailWithRole {
    userid: string;
    name: string;
    email: string;
    picture: string;
    role: "admin" | "user";
}
export interface IAppContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    jsonWebToken: string;
    setJsonWebToken: Dispatch<SetStateAction<string>>;
    user: IUserDetailWithRole,
    setUser: Dispatch<SetStateAction<IUserDetailWithRole>>;
}

function AdminQuestionsList() {
    const [searchParams, setSearchParams] = useSearchParams("?page=0&limit=10");
    const [questionsList, setQuestionsList] = useState<IQuestionsList[]>([]);
    const [error, setError] = useState(false);
    const [errorPage, setErrorPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onMountRef = useRef(false);
    const context: IAppContext = useOutletContext();

    const { jsonWebToken} = context;
    console.log(jsonWebToken)

    useEffect(() => {

        // when doing await, react sets this state
        setErrorPage(false);

        async function fetcher() {
            // searchParams is webapi itself
            const page = searchParams.get("page") ?? "0";
            const limit = searchParams.get("limit") ?? "10";
            try {
                //fetching secure api - need jwt
                const res = await fetch(`/admin/questions?page=${page}&limit=${limit}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${jsonWebToken}`
                    },
                });

                if (res.ok) {
                    const questionsList: IQuestionsList[] = await res.json();
                    console.log("EHYYYY")
                    setQuestionsList(questionsList);
                    if (!onMountRef.current) {
                        // run only on Mount
                        setSearchParams([
                            ["page", page],
                            ["limit", limit]
                        ])
                        onMountRef.current = true;
                    }
                } else {
                    const error = await res.text();
                    console.log("HTTP server status: ", res.status);
                    console.log("HTTP error ", error);
                    setErrorPage(true);
                }

            } catch (err) {
                console.log(err);
                setError(true);
            }
        }

        fetcher();
    }, [searchParams, jsonWebToken]);

    if (error) {
        throw new Error("Network Error !!")
    }
    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (errorPage) {
        return (
            <div className="flex justify-center">
                <div className="text-4xl text-center mt-20 border p-5">
                    Heyy Bro!! You're not an Admin...
                    <br />
                    <br />
                    Forget it
                </div>
            </div>
        )

    } else {
        return (
            <div>
                {

                    <table className="mr-20">
                        <thead>
                            <tr className="border-b font-bold">
                                <td className="border-r pr-2">Id</td>
                                <td className="border-r text-center">Problem</td>
                                <td className="pl-2 text-center">Difficulty</td>
                                <td className="pl-2 text-center">Detail</td>
                                <td className="pl-2 text-center">Template</td>
                            </tr>
                        </thead>
                        <tbody>
                            {questionsList.map((obj, i) => {
                                return (
                                    <tr className={`${questionsList.length - 1 === i ? "" : "border-b"}`} key={obj.id}>
                                        <td className="border-r text-center"> {obj.id} </td>
                                        <td className="border-r px-2"> {obj.name} </td>
                                        <td className="text-center">{obj.difficulty}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/question-detail/${obj.name}`}>View/Edit</Link>
                                        </td>
                                        <td className="text-center">
                                            <Link to={`/admin/question-template/${obj.name}`}>View/Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table >

                }
            </div>
        )

    }

}

export default AdminQuestionsList;
