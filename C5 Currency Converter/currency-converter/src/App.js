import { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import CurrencyBox from "./CurrencyBox";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [inputA, setInputA] = useState("0");
  const [inputB, setInputB] = useState("0");
  const [currencyA, setCurrencyA] = useState("USD");
  const [currencyB, setCurrencyB] = useState("USD");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);
  const convertFromA = useRef(null);

  async function convert(controller, setOutput, amount, from, to) {
    try {
      setLoadingMessage("Fetching Conversion ...");

      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error('Network Error');
      }

      const data = await response.json();
      if (data.Response === "False"){
        throw new Error("Unable to make conversion");
      }

      setError(null);
      setOutput(data.rates[to]);
    } catch (err) {
      if (err.name !== "AbortError"){
        setError(err.message);
      }
    }
    finally{
      setLoadingMessage("");
    }
  }

  useEffect(function() {
    if (convertFromA.current) {
      if (isNaN(inputA)) {
        setInputB("NaN");
      }
      else if (inputA === "") {
        setInputB("");
      }
      else if (Number(inputA) <= 0) {
        setInputB(0);

      }
      else if (currencyA ===  currencyB){
        setInputB(inputA);
      }
      else{
        const controller = new AbortController();
        convert(controller, setInputB, inputA, currencyA, currencyB);
        return () => controller.abort;
      }
    }
    else {
      if (isNaN(inputB)) {
        setInputA("NaN");
      }
      else if (inputB === "") {
        setInputA("");
      }
      else if (Number(inputB) <= 0) {
        setInputA(0);
      }
      else if (currencyA ===  currencyB){
        setInputA(inputB);
      }
      else {
        const controller = new AbortController();
        convert(controller, setInputA, inputB, currencyB, currencyA);
        return () => controller.abort;
      }
    }

  }, [inputA, inputB, currencyA, currencyB]);

  function handleInputA(value) {
    convertFromA.current = true;
    setInputA(value);
  }

  function handleInputB(value) {
    convertFromA.current = false;
    setInputB(value);
  }

  function handleCurrencyA(value) {
    convertFromA.current = false;
    setCurrencyA(value);
  }

  function handleCurrencyB(value) {
    convertFromA.current = true;
    setCurrencyB(value);
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={12} className="banner">
            <h1>Currency Converter</h1>
          </Col>
        </Row>
      </Container>
      <Container className="box">
        <Row>
          <Col xs={12}> 
            <CurrencyBox marginTop="1em" selected={currencyA} onSelected={handleCurrencyA} input={inputA} onInput={handleInputA}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CurrencyBox marginTop="1em" selected={currencyB} onSelected={handleCurrencyB} input={inputB} onInput={handleInputB}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 xs={12} style={{marginTop: "1em", textAlign: "center"}}>{loadingMessage}{error}</h3>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
