import { useOutletContext } from 'react-router-dom';
import { Canvas } from '../components/Canvas';
import { QuestionTab } from '../components/QuestionTab';
import Slider from '../components/Slider';
import '../styles/Drawboard.css';
import { useRef, useState, useEffect, useMemo } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import { CodeSpace } from '../components/CodeSpace';
import { HorizVertSlider } from '../components/HorizVertSlider.jsx';
import { useParams } from 'react-router-dom';

function Drawboard() {
    const user = useOutletContext();

    const canvasRef = useRef();
    const codespaceRef = useRef();
    const [canvasEdgeMotionCoord, setCanvasEdgeMotionCoord] = useState(null);

    const [isCoding, setIsCoding] = useState(false);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [qDetailsQNextPrev, setQDetailsQNextPrev] = useState();
    const [error, setError] = useState();
    // reference of the context object passed shouldn't change in each render - preventing context child 
    // rerender in each render of parent
    const providerValue = useMemo(() => {
        return { isCoding, setIsCoding, qDetailsQNextPrev };
    }, [isCoding, qDetailsQNextPrev])

    useEffect(() => {
        // one controller for each request - controller is linked to the specific request
        const controller = new AbortController();

        async function questionDetailsFetcher() {

            try {
                let res = await fetch(`/draw-question/${params.qname}`, {
                    method: "GET",
                    credentials: 'include',
                    signal: controller.signal,
                });

                if (res.ok) {
                    const qDetails = await res.json();
                    setQDetailsQNextPrev(qDetails);
                    setIsLoading(false);
                } else {
                    console.log("HTTP Status: ", res.status);
                    console.log("Status Text: ", res.statusText);
                    setError(new Error(`Request failed with status: ${res.status}`));
                    return;
                }
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                    // Intentional error. So don't setError here
                } else {
                    console.log(err);
                    setError(err);
                }
            }
        }

        questionDetailsFetcher();

        return () => {
            console.log("UNMOUNTING DRAWBOARD");
            console.log("Aborting the current fetch")
            controller.abort();
        }

    }, [params.qname]);

    if (error) {
        throw error;
    }

    if (isLoading) {
        return "loading..."
    }


    return (
        <>
            <div className='space'>
                <QuestionContext.Provider value={providerValue} >
                    <QuestionTab />

                    {!isCoding ? (
                        <>
                            <Slider canvasRef={canvasRef} setCanvasEdgeMotionCoord={setCanvasEdgeMotionCoord} />
                            <Canvas ref={canvasRef} canvasEdgeMotionCoord={canvasEdgeMotionCoord} />
                        </>) : (
                        <>
                            <HorizVertSlider codespaceRef={codespaceRef} />
                            <CodeSpace ref={codespaceRef} />

                        </>
                    )}

                </QuestionContext.Provider>
            </div>
        </>
    )




}

export default Drawboard;
