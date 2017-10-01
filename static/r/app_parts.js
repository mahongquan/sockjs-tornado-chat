//App//////////////////////
class App extends React.Component {
  constructor(){
   super();
   this.conn=null;
   this.state = {
     status:"disconnected",
     send_text:"",
     connect_text:"Connect",
     log_text:[]
   }
  }
  log=(msg)=>{
    console.log(msg);
    console.log(this.state.log_text);
    var newlog=this.state.log_text.concat(msg);
    console.log(newlog);
    this.setState({log_text:newlog});
  }
  connect=()=> {
    this.disconnect();

    var transports =["websocket"];

    this.conn = new SockJS('http://' + window.location.host + '/chat', transports);

    this.log('Connecting...');

    this.conn.onopen = ()=>{
      this.log('Connected.');
    };

    this.conn.onmessage = (e)=> {
      this.log('Received: ' + e.data);
    };

    this.conn.onclose =()=>{
      this.log('Disconnected.');
      this.conn = null;
    };
    if (this.conn == null || this.conn.readyState != SockJS.OPEN) {
          this.setState({status:'disconnected',connect_text:'Connect'});
        } else {
          this.setState({status:'dconnected (' + conn.protocol + ')'
            ,connect_text:'Disconnect'});
        }
  }

disconnect=()=>{
  if (this.conn != null) {
    this.log('Disconnecting...');
    this.conn.close();
    this.conn = null;
    if (this.conn == null || this.conn.readyState != SockJS.OPEN) {
          this.setState({status:'disconnected',connect_text:'Connect'});
        } else {
          this.setState({status:'dconnected (' + conn.protocol + ')'
            ,connect_text:'Disconnect'});
        }
  }
}
  connectClick=()=>{
    if (this.conn == null) {
      this.connect();
    } else {
      this.disconnect();
    }   
  }
  send_text_change=(e)=>{
    this.setState({send_text:e.target.value});
  }
  sendClick=()=>{
    this.conn.send(this.state.send_text);
  }
  render() {
    var logs=this.state.log_text.map((one,idx)=>{
       return(<div key={idx}>{one}</div>);
    });
    return (
    <div id="todoapp" className="table-responsive">
<h3>Chat!</h3>
<div id="protocols" style={{float: "right"}}>
  <ul>
    <li>
      <label htmlFor="websocket">websocket</label>
    </li>
  </ul>
</div>
<div>
  <a id="connect"  onClick={this.connectClick} href="#">{this.state.connect_text}</a>Status: <span id="status">{this.state.status}</span>
</div>
<div id="this.log" style={{width: 60+"em",height: 20+"em", overflow:"auto", border: "1px solid black"}}>
  {logs}
</div>
  <input id="text" type="text" onChange={this.send_text_change} value={this.send_text} />
  <button onClick={this.sendClick}>send </button>
  </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
