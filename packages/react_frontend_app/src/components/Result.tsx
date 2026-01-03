export function Result({ result }) {
    if (!result) { return;};  // Need this

    const resultObject = result.at(-1);
    const userlogArray = result.slice(0, -1);

    return (
        <div>
            <div> Input: </div>
            <div> {resultObject.input} </div>
            <div> My Output: </div>
            <div> {resultObject.output} </div>
            <div> Expected Output: </div>
            <div> {resultObject.expOutput} </div>
            {userlogArray.length ?
                <div>
                    <div className="border border-solid rounded-md border-gray-700 bg-gray-200 text-gray-800" >
                        Logs:
                    </div>
                    <div>
                        {
                            userlogArray.map((log: string, i: number) => {
                                return (
                                    <div key={i}>
                                        {log}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> :
                <div>
                </div>}

        </div>

    )
}
