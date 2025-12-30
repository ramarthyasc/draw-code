
interface CaseButtonProps {
    case: string;
    initColor?: string;
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export function CaseButton(props: CaseButtonProps) {

    return (
        <button type="button" onMouseDown={props.onMouseDown} onMouseUp={props.onMouseDown}
            className="border border-solid px-2 py-0.5 mx-1 my-1 hover:bg-green-200">{props.case}</button>
    )
}
