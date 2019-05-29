import Pusher from "pusher-js/";

class DataPusher extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
  }

  render() {
    return (
      <div>
        <ul id="jobs">
          {this.state.messages.map(message => <li>{JSON.stringify(message)}</li>)}
        </ul>
      </div>
    );
  }

}

export default DataPusher;
