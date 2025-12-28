function generateCitation() {
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let year = document.getElementById("year").value;
    let url = document.getElementById("url").value;
    let style = document.getElementById("style").value;

    // Validation
    if (author === "" || title === "" || year === "" || url === "") {
        alert("Please fill all fields!");
        return;
    }

    let citation = "";

    if (style === "apa") {
        citation = `${author}. (${year}). ${title}. ${url}`;
    } 
    else if (style === "mla") {
        citation = `${author}. "${title}." ${year}, ${url}.`;
    }
    else if (style === "chicago") {
        citation = `${author}. ${title}. ${year}. ${url}.`;
    }

    document.getElementById("output").value = citation;
    saveToHistory(citation);
    showHistory();
}

// Copy citation
function copyCitation() {
    let output = document.getElementById("output");
    output.select();
    navigator.clipboard.writeText(output.value);
    alert("Citation copied!");
}

// Download citation
function downloadCitation() {
    let text = document.getElementById("output").value;
    if (text === "") {
        alert("Generate citation first!");
        return;
    }

    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "citation.txt";
    link.click();
}

// Save last 5 citations
function saveToHistory(citation) {
    let history = JSON.parse(localStorage.getItem("citations")) || [];
    history.unshift(citation);
    if (history.length > 5) history.pop();
    localStorage.setItem("citations", JSON.stringify(history));
}

// Show history
function showHistory() {
    let history = JSON.parse(localStorage.getItem("citations")) || [];
    let list = document.getElementById("history");
    list.innerHTML = "";

    history.forEach(c => {
        let li = document.createElement("li");
        li.textContent = c;
        list.appendChild(li);
    });
}

window.onload = showHistory;




