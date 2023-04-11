import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./src/styles.css";

const SITE_KEY = "6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv";

export default function App() {
  const [recaptchaLoaded, setRecaptchaLoaded] = React.useState(false);
  const recaptchaRef = React.useRef(null);
  const [inputText, setInputText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (recaptchaLoaded) {
      var duration = Math.floor(Math.random() * 2) + 1; // b/w 1 and 2
      console.log("duration: ", duration);
      setTimeout(function () {
        setInputText(duration);
      }, duration * 1000);
    }
  }, [recaptchaLoaded]);

  return (
    <div>
      <h1>Get Recaptcha</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setLoading(true);
            const recaptchaToken = await recaptchaRef.current.executeAsync();
            console.log("Recaptcha token: ", recaptchaToken);
            var root = document.getElementById("result");
            root.innerHTML = recaptchaToken;
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos/1"
            ).then((response) => response.json());
            console.log("Response Value: ", response);
          } catch (error) {
            console.error("submit form failed: ", error);
          } finally {
            recaptchaRef?.current?.reset();
            setLoading(false);
          }
        }}
      >
        <input
          id="content"
          value={inputText}
          onChange={(e) => {
            const { value } = e.target;
            setInputText(value);
          }}
          placeholder="input text here"
        />
        <button id="btn" disabled={!recaptchaLoaded || loading} type="submit">
          Submit
        </button>
        <button disabled={loading} type="reset">
          Reset
        </button>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          asyncScriptOnLoad={() => setRecaptchaLoaded(true)}
          ref={recaptchaRef}
          size="invisible"
          hl="vi"
          className="flex-none"
        />
      </form>
      <div>
        <h3 id="result">Result:</h3>
      </div>
    </div>
  );
}
