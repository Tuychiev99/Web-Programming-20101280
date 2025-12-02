// create.js 완성본
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const styleSelect = document.getElementById("styleSelect");
const resultArea = document.getElementById("resultArea");
const loading = document.getElementById("loading");

// 🔥 프록시 서버 주소 (로컬/배포 환경 자동 분기)
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api/generate"
    : "/api/generate";

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const style = styleSelect.value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  loading.style.display = "block";
  resultArea.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style })
    });

    const data = await response.json();

    loading.style.display = "none";

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    // 서버는 { image: "data:image/png;base64,..." } 형태로 응답
    const imageUrl = data.image || data.data?.[0]?.url;

    if (!imageUrl) {
      alert("Error: No image returned from server.");
      return;
    }

    resultArea.innerHTML = `
      <h2>Your AI Artwork</h2>
      <img src="${imageUrl}" />
      <br/><br/>
      <button id="saveBtn">Save to Gallery</button>
    `;

    document.getElementById("saveBtn").onclick = () => {
      saveToGallery(prompt, style, imageUrl);
    };

  } catch (err) {
    loading.style.display = "none";
    alert("Failed to generate image.");
    console.error(err);
  }
});

function saveToGallery(prompt, style, url) {
  let saved = JSON.parse(localStorage.getItem("generatedArt")) || [];

  saved.push({
    title: prompt.slice(0, 20) + "...",
    tags: [style],
    prompt,
    image: url
  });

  localStorage.setItem("generatedArt", JSON.stringify(saved));
  alert("Saved! Check the gallery.");
}

