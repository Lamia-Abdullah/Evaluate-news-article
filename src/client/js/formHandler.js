// src/client/js/formHandler.js
import { checkForURL } from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();

  const formText = document.getElementById("url-input").value;

  if (checkForURL(formText)) {
   // console.log("Form Submitted");

    try {
      const res = await postData("http://localhost:8080/api", {
        url: formText,
    });

      // Update UI with response data
      document.getElementById(
        "polarity"
      ).innerHTML = `Polarity: ${polarityChecker(res.score_tag)}`;
      document.getElementById(
        "agreement"
      ).innerHTML = `Agreement: ${res.agreement}`;
      document.getElementById(
        "subjectivity"
      ).innerHTML = `Subjectivity: ${res.subjectivity}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence: ${res.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    alert("Invalid URL format. Please enter a valid URL.");
  }
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

function polarityChecker(score) {
  switch (score) {
    case "P+":
      return "Strong Positive";
    case "P":
      return "Positive";
    case "NEW":
      return "Neutral";
    case "N":
      return "Negative";
    case "N+":
      return "Strong Negative";
    case "NONE":
      return "No sentiment";
    default:
      return "Unknown";
  }
}

export { handleSubmit, polarityChecker };
