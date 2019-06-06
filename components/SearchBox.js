import styled from "styled-components";
import Link from "next/link";
import Pusher from "pusher-js/";

const OrangeLine = styled.div`
  background-color: #ffa200;
  height: 18px;
  width: 100%;
  margin-top: 60px;
`;

const FieldButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchFiled = styled.input`
  margin-top: 100px;
  padding: 25px 25px;
  border-radius: 10px;
  border: 2px solid #929295;
  font-size: medium;
  width: 30%;
`;

const MigrationButton = styled.a`
  background-image: linear-gradient(#fad55f, #f86e1f);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 25px;
  margin-bottom: 60px;
`;

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ``,
      messages: {}
    };
  }

  updateSearch=(event) =>{
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    const pusher = new Pusher("cfaf7a3be30a27f2a21f", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind(this.state.search, data => {
      this.setState({ messages: data });
    });
  }

  Post=()=> {
    return (
      <div>
        <Link as={`/migration/${this.state.search}`} href={`/migration?UUID=${this.state.search}`}>
          <MigrationButton >
            Track Migration
          </MigrationButton>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <FieldButtonDiv>
        <SearchFiled
          onChange={e=>this.updateSearch(e)}
          value={this.state.search}
          placeholder="Enter Migration ID (Sent as part of migration response)"
        />
        {this.Post()}
        <OrangeLine />
      </FieldButtonDiv>
    );
  }
}
export default SearchBox;
