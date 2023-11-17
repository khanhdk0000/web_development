import ProfileCard from "./Profile";

function App() {
  return (
    <div className="App">
      <div>Personal Digital Assistants</div>
      <ProfileCard title="Alexa" handle="@alexa99"/>
      <ProfileCard title="Siri" handle="@siri"/>
      <ProfileCard title="Cortana" handle="@cortex"/>
    </div>
  );
}

export default App;
