import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const App = () => {
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/websocket",
      connectHeaders: {},
      debug: function (str) {
        console.log('STOMP:', str);
      },
      onConnect: (frame) => {
        console.log('WebSocket connection established', frame);
        stompClient.subscribe('/topic/test01', (message) => {
          console.log(`Received: ${message.body}`);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      },
      reconnectDelay: 5000
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const clickHandler = () => {
  //  stompClient.publish({ destination: '/topic/test01', body: 'Hello world' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
        </p>
        <p>
          <button onClick={clickHandler}>Click me</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;

