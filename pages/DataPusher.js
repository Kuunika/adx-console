import Pusher from "pusher-js/";

class DataPusher extends React.Component {
  state = {
    messages: ["first message"]
  };

  componentDidMount() {
    const pusher = new Pusher("ebd3c5c2a06e092dbcba", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe("test_channel");
    channel.bind("my-event", data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
  }

  render() {
    return (
      <div>
        <ul id="jobs">
          {this.state.messages.map(message => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DataPusher;
