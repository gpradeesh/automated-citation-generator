const output = document.getElementById("output");
const recentList = document.getElementById("recentList");
const clearBtn = document.getElementById("clearHistory");

function generateCitation() {
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const url = document.getElementById("url").value;
  const style = document.getElementById("style").value;

  if (!author || !title || !year || !url) {
    alert("Please fill all fields");
    return;
  }

  let citation = "";

  if (style === "APA") {
    citation = `${author}. (${year}). ${title}. ${url}`;
  } 
  else if (style === "MLA") {
    citation = `${author}. "${title}." ${year}, ${url}.`;
  } 
  else if (style === "Chicago") {
    citation = `${author}. ${title}. ${year}. ${url}.`;
  }

  output.innerText = citation;
  saveCitation(citation);
  loadRecent();
}

function copyCitation() {
  if (!output.innerText) return;
  navigator.clipboard.writeText(output.innerText);
  alert("Citation copied!");
}

function saveCitation(citation) {
  let citations = JSON.parse(localStorage.getItem("citations")) || [];
  citations.unshift(citation);
  citations = citations.slice(0, 5);
  localStorage.setItem("citations", JSON.stringify(citations));
}

function loadRecent() {
  recentList.innerHTML = "";
  let citations = JSON.parse(localStorage.getItem("citations")) || [];

  citations.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    recentList.appendChild(li);
  });
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("citations");
  recentList.innerHTML = "";
});

loadRecent();

