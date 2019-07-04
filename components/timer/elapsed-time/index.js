import formatDuration from 'format-duration'
import styled from "styled-components";


const Text = styled.p`
  color: #7ed322;
  font-size: 50px;
  margin: 0;
`;

const LeftText = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin: 3px;
`;

function elapsedTime(events) {
    let elapsed = 0;
    for (let i = 0; i < events.length; i+=2){
        const start = events[i]
        const stop = events[i+1] || new Date()

        elapsed += stop - start;
    }
    return elapsed
}

export default function ElapsedTime(props) {
    return (
        <>
            <Text>
            {formatDuration(elapsedTime(props.timingEvents))}
            </Text>
            <LeftText>Elapsed</LeftText>
        </>
    )
}