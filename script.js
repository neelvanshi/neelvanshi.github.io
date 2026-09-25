async function loadPDFs() {
    const container = document.getElementById("pdf-list");

    try {
        const response = await fetch("pdfs.json");

        if (!response.ok) {
            throw new Error("Could not load PDF list");
        }

        const pdfs = await response.json();

        container.innerHTML = "";

        if (pdfs.length === 0) {
            container.innerHTML = "<p>No PDFs available.</p>";
            return;
        }

        pdfs.forEach(pdf => {
            const item = document.createElement("div");
            item.className = "pdf";

            const pdfPath = `../pdfs/${encodeURIComponent(pdf.file)}`;

            item.innerHTML = `
                <div class="pdf-name">
                    📄 ${escapeHTML(pdf.name)}
                </div>

                <div class="pdf-actions">
                    <a
                        class="button"
                        href="${pdfPath}"
                        target="_blank"
                    >
                        View
                    </a>

                    <a
                        class="button download"
                        href="${pdfPath}"
                        download
                    >
                        Download
                    </a>
                </div>
            `;

            container.appendChild(item);
        });

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <p>
                Unable to load the PDF directory.
            </p>
        `;
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

loadPDFs();
