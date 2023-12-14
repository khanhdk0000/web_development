import ProfileCard from "./Profile";
import AlexaImage from "./images/alexa.png";
import SiriImage from "./images/siri.png";
import CortanaImage from "./images/cortana.png";


function App() {
  return (
    <div className="App">
      <div>Personal Digital Assistants</div>
      <ProfileCard title="Alexa" handle="@alexa99" image={AlexaImage}/>
      <ProfileCard title="Siri" handle="@siri" image={SiriImage}/>
      <ProfileCard title="Cortana" handle="@cortex" image={CortanaImage}/>
    </div>
  );
}

export default App;
