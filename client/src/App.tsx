import backgroundImage from './assets/planet-background.jpg';

function App() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      <h1>Greetings, young Padawan.</h1>
    </div>
  );
}

export default App;
