import ChatBox from "../components/ChatBox";
console.log("ChatBox type:", typeof ChatBox); // trebuie să fie "function"

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>NewsFlow 🗞️ + AI 🤖</h1>
      <ChatBox />
    </div>
  );
}
