import { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { type: 'left', text: "Hey! What's up! 👋" },
    { type: 'left', text: "Ask a friend to open this link and you can chat with them!" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('public');
    channel.bind('chat', function (data: { message: string }) {
      setMessages(prev => [...prev, { type: 'left', text: data.message }]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);


  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await axios.post('/broadcast', {
        message: input,
      }, {
        headers: {
        //   'X-Socket-Id': window.Echo?.socketId(), // opcional si usas Echo
        }
      });

      setMessages(prev => [...prev, { type: 'right', text: input }]);
      setInput('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  return (
    <div className="chat max-w-lg mx-auto shadow-md rounded-md overflow-hidden border">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex gap-4 items-center">
        <img
          src="https://assets.edlin.app/images/rossedlin/03/rossedlin-03-100.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-bold">Ross Edlin</p>
          <small className="text-green-400">Online</small>
        </div>
      </div>

      {/* Chat */}
      <div className="messages p-4 flex flex-col gap-2 h-80 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`message flex items-center gap-2 ${msg.type === 'right' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'left' && (
              <img
                src="https://assets.edlin.app/images/rossedlin/03/rossedlin-03-100.jpg"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <p className="bg-gray-200 rounded-lg px-4 py-2 max-w-[70%]">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <form
        onSubmit={sendMessage}
        className="bottom flex border-t bg-white"
      >
        <input
          type="text"
          placeholder="Enter message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="px-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
