import styled from "styled-components";
import ElapsedTime from './elapsed-time';
import Buttons from './buttons';

const Text = styled.p`
  color: #7ed322;
  font-size: 30px;
`;

class Timer extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      timingEvents: []
    }
    //normaly when you call this inside a function it refers to the function itself but by doing binding this inside the function will now refer to the instance of the component
    this.addTimerEvent = this.addTimerEvent.bind(this)
  }

  addTimerEvent() {
    this.setState({
      timingEvents: [
        ...this.state.timingEvents,
        new Date()
      ]
    })
  }

  render() {
    return (
      <div>
        <ElapsedTime/>
        <Buttons handleClick={this.addTimerEvent} 
        timingEvents={this.state.timingEvents}/>
      </div>
    );
  }
}

export default Timer;
