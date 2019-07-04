export default function Buttons(props) {
    const label = props.timingEvents.length % 2 === 0
        ? 'Start'
        : 'Stop'
        
    return (
        <div>
            <button
            onClick={props.handleClick}
            >
                {label}
            </button>
        </div>
    )
}