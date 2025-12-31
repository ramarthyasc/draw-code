import { useEffect, useState, useRef } from "react";

export function useIsButtonActive(initActiveButtonId: string) {

    //// Button Handlers
    const [mouseDown, setMouseDown] = useState(false)
    const [activeButtonId, setActiveButton] = useState(initActiveButtonId)
    const mouseDownButtonIdRef = useRef("");

    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        setMouseDown(true);
        mouseDownButtonIdRef.current = e.currentTarget.id;
    }
    function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
        // if mousedown & if mouseup button and the mouse downed button are the same
        if (mouseDown && e.currentTarget.id === mouseDownButtonIdRef.current) {
            setActiveButton(mouseDownButtonIdRef.current);
        }
        setMouseDown(false);
    }

    useEffect(() => {
        function handleMouseUpWindow() {
            setMouseDown(false);
        }
        window.addEventListener("mouseup", handleMouseUpWindow);
        return () => {
            window.removeEventListener("mouseup", handleMouseUpWindow);
        }
    }, [])
    //// Button Handlers end

    return { activeButtonId, handleMouseDown, handleMouseUp};

}
