import { useOutletContext } from 'react-router-dom';
import { Canvas } from '../components/Canvas';
import { QuestionTab } from '../components/QuestionTab';
import Slider from '../components/Slider';
import '../styles/Drawboard.css';
import { useRef, useState, useEffect } from 'react';
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
    const [questionDetails, setQuestionDetails] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function questionDetailsFetcher() {

            try {
                let res = await fetch(`/draw-question/${params.qname}`, {
                    method: "GET",
                    credentials: 'include',
                });

                if (res.ok) {
                    const qDetails = await res.json();
                    setQuestionDetails(qDetails);
                    setIsLoading(false);
                } else {
                    console.log("HTTP Status: ", res.status);
                    console.log("Status Text: ", res.statusText);
                    setError(new Error(`Request failed with status: ${res.status}`));
                    return;
                }
            } catch (err) {
                console.log(err);
                setError(err);
            }
        }

        questionDetailsFetcher();


    }, []);

    if (error) {
        throw error;
    }

    if (isLoading) {
        return "loading..."
    }

    if (!isCoding) {
        return (
            <>
                <div className='space'>
                    <QuestionContext.Provider value={{ isCoding, setIsCoding }} >
                        <QuestionTab questionDetails={questionDetails} />
                    </QuestionContext.Provider>
                    <Slider canvasRef={canvasRef} setCanvasEdgeMotionCoord={setCanvasEdgeMotionCoord} />
                    <Canvas ref={canvasRef} canvasEdgeMotionCoord={canvasEdgeMotionCoord} />
                </div>
            </>
        )

    } else {
        return (

            <>
                <div className='space'>
                    <QuestionContext.Provider value={{ isCoding, setIsCoding }} >
                        <QuestionTab questionDetails={questionDetails} />
                    </QuestionContext.Provider>
                    <HorizVertSlider codespaceRef={codespaceRef} />
                    <CodeSpace ref={codespaceRef} />
                </div>
            </>
        )
    }



}

export default Drawboard;
