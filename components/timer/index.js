import styled from "styled-components";
import ElapsedTime from "./elapsed-time"; //handles the format of the time
import Buttons from "./buttons"; // handels buttons

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timingEvents: [],
      nonce: 0
    };
    //normaly when you call this inside a function it refers to the function itself but by doing binding this inside the function will now refer to the instance of the component
    this.addTimerEvent = this.addTimerEvent.bind(this);
    this.tick = this.tick.bind(this);
    this.poll = setInterval(this.tick, 1000);
  }

  tick() {
    this.setState(prevState => ({ nonce: prevState.nonce + 1 }));
  }

  addTimerEvent() {
    this.setState({
      timingEvents: [...this.state.timingEvents, new Date()]
    });
  }

  render() {
    return (
      <div>
        <ElapsedTime timingEvents={this.state.timingEvents} />
        <Buttons
          handleClick={this.addTimerEvent}
          timingEvents={this.state.timingEvents}
        />
      </div>
    );
  }
}

export default Timer;
