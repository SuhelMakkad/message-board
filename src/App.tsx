import MessageList from "@/components/message-list";
import PostMessageTextBox from "@/components/post-message-text-box";

function App() {
  return (
    <main className="container my-4">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4">Chatter</h1>

      <PostMessageTextBox />

      <MessageList />
    </main>
  );
}

export default App;
