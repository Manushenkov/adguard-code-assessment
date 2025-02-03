import UrlInput from "./UrlInput/UrlInput";

const generateDogGif = async () => {
  chrome.runtime.sendMessage({ method: 1 }, (response) => {
    console.log(response);
  });
};

const App = () => {
  return (
    <div>
      
      <UrlInput />
    </div>
  );
};
export default App;