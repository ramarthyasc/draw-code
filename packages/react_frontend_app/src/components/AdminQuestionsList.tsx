import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSecureDataGetter } from "./customhooks/useSecureDataGetter";
import { colorVariants } from "./AdminQuestionDetail";

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
    setJsonWebToken: Dispatch<SetStateAction<string | null>>;
    user: IUserDetailWithRole,
    setUser: Dispatch<SetStateAction<IUserDetailWithRole | null>>;
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
}


function AdminQuestionsList() {
    const [searchParams, setSearchParams] = useSearchParams("?page=0&limit=10");
    const [error, setError] = useState(false);

    const { data, secureDataGetter } = useSecureDataGetter<IQuestionsList[]>();
    const context: IAppContext = useOutletContext();

    const { jsonWebToken, setJsonWebToken, setUser, user, setIsLoggedIn, setIsAdmin } = context;
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetcher() {
            const page = searchParams.get("page");
            const limit = searchParams.get("limit");
            const path = `/admin/questions?page=${page}&limit=${limit}`;
            try {
                await secureDataGetter({
                    setJsonWebToken,
                    jsonWebToken,
                    setUser,
                    setIsLoggedIn
                },
                    path
                );

            } catch (err) {
                setError(true);
                console.log(err);
            }
        }

        // if (!isMountedRef.current || data !== "") {
        fetcher();
        // }
        // isMountedRef.current = true;

    }, [searchParams, jsonWebToken]);


    useEffect(() => {
        if (jsonWebToken && user.role === "admin") {
            console.log(data)
            setIsAdmin(true);
            const lastqid = data.length - 1 ; // Id is added + 1 inside AdminQuestionDetail
            window.localStorage.setItem("lastqid", lastqid.toString());
        } else {
            setIsAdmin(false);
        }
    }, [jsonWebToken, data]);


    if (error) {
        throw new Error("Network Error !!")
    }
    if (data === "") {
        // initial data from customhook is ""
        return (
            <div className="text-center">
                loading...
            </div>
        )
    }

    if (typeof data === "string") {

        return (
            <div className="flex justify-center">
                {
                    data === "not-admin" ?
                        (
                            <div className="text-4xl text-center mt-20 border p-5">
                                Heyy Bro!! You're not an Admin...
                                <br />
                                <br />
                                Forget it
                            </div>
                        ) : data === "signin" ?
                            (
                                <div className="text-4xl text-center mt-20 border p-5">
                                    Signin as Admin to Access...
                                </div>
                            ) : (
                                <div className="text-4xl text-center mt-20 border p-5">
                                    BAD REQUEST
                                </div>

                            )
                }
            </div>
        )

    }

    function handleAddMouseDown() {
        navigate("/admin/question-detail/create");
    }

    async function deleteMouseDown(name: string) {
        if (confirm("Delete this question ?")) {

            if (isButtonLoading) { return; }

            const page = searchParams.get("page");
            const limit = searchParams.get("limit");
            const path = `/admin/delete-question/${name}?page=${page}&limit=${limit}`;
            try {
                setIsButtonLoading(true);
                await secureDataGetter({
                    setJsonWebToken,
                    jsonWebToken,
                    setUser,
                    setIsLoggedIn
                },
                    path,
                    {
                        content: null,
                        method: "DELETE"
                    }
                );


            } catch (err) {
                setError(true);
                console.log(err);
            }
            setIsButtonLoading(false);
        }
    }

    const questionList = data;

    return (


        <div className="flex-1 flex flex-col justify-center items-center pb-100">
            <div className="pb-20 text-4xl font-extrabold">
                Questions
            </div>
            {

                <table>
                    <thead>
                        <tr className="border-b font-bold">
                            <td className="px-2 border-r text-center">Id</td>
                            <td className="px-2 border-r text-center">Problem</td>
                            <td className="px-2 border-r text-center">Difficulty</td>
                            <td className="px-2 border-r text-center">Detail</td>
                            <td className="pl-2">Template</td>
                        </tr>
                    </thead>
                    <tbody>
                        {questionList.map((obj, i) => {
                            return (
                                <tr className={`${questionList.length - 1 === i ? "" : "border-b"}`} key={obj.id}>
                                    <td className="border-r px-2 text-center"> {i} </td>
                                    <td className="border-r px-2"> {obj.name} </td>
                                    <td className="border-r px-2 text-center">{obj.difficulty}</td>
                                    <td className="border-r px-2 text-blue-700 hover:text-gray-600">
                                        <Link to={`/admin/question-detail/${obj.name}`}>View/Edit</Link>
                                    </td>
                                    <td className="px-2 text-center text-blue-700 hover:text-gray-600">
                                        <Link to={`/admin/question-template/${obj.name}`}>View/Edit</Link>
                                    </td>
                                    {
                                        questionList.length - 1 === i ?
                                            (<td className="pl-4 ">
                                                <button className="cursor-pointer px-1 py-0 my-px bg-gray-300 border rounded-sm" onMouseDown={() => { deleteMouseDown(obj.name) }}>-</button>
                                            </td>) :
                                            <td></td>
                                    }
                                </tr>
                            )
                        })
                        }

                    </tbody>
                    <tfoot>
                        <tr >
                            <td ></td>
                            <td ></td>
                            <td className="pl-2 pt-4 text-center">
                                .<br />
                                .<br />
                                .<br />

                                <button type="button" onMouseDown={handleAddMouseDown}
                                    className={`border border-solid px-1.5 rounded-sm cursor-pointer transition-colors duration-300 ease-out active:scale-100 ${colorVariants.gray.normal}`}>
                                    Add
                                </button>
                            </td>
                            {/* <td >Detail</td> */}
                            {/* <td >Template</td> */}
                        </tr>
                    </tfoot>
                </table >

            }
        </div>
    )

}


export default AdminQuestionsList;
