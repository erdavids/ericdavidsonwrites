const params = new URLSearchParams(window.location.search);

const story = params.get("story");


if (!story) {

    console.error("No story specified.");

} else {


    fetch(`Stories/${story}.md`)

    .then(response => {

        if (!response.ok) {

            throw new Error(
                `Could not load story: ${story}`
            );

        }

        return response.text();

    })


    .then(markdown => {


        const parsed = parseMarkdownFile(markdown);


        loadMetadata(parsed.metadata);


        loadContent(parsed.content);


    })


    .catch(error => {

        console.error(
            "Story loading failed:",
            error
        );


        document.querySelector("#content").innerHTML =
            "<p>Unable to load story.</p>";

    });


}



/*
    Splits markdown frontmatter from story content

    Example:

    ---
    title: "Forget-Me-Not"
    author: "Eric Davidson"
    category: "Short Story"
    ---

    Story text here...
*/

function parseMarkdownFile(markdown) {


    let metadata = {};

    let content = markdown;



    if (markdown.startsWith("---")) {


        const sections =
            markdown.split("---");



        const frontmatter =
            sections[1];


        content =
            sections.slice(2).join("---");



        frontmatter
            .trim()
            .split("\n")
            .forEach(line => {


                const separator =
                    line.indexOf(":");



                if (separator !== -1) {


                    const key =
                        line
                        .substring(0, separator)
                        .trim();



                    let value =
                        line
                        .substring(separator + 1)
                        .trim();



                    value =
                        value
                        .replace(/^["']|["']$/g, "");



                    metadata[key] = value;


                }


            });

    }



    return {

        metadata,
        content

    };

}





function loadMetadata(data) {


    if (data.category) {

        document.querySelector("#category").textContent =
            data.category;

    }



    if (data.title) {


        document.querySelector("#title").textContent =
            data.title;


        document.title =
            data.title;

    }



    if (data.author) {


        document.querySelector("#author").textContent =
            `Written by ${data.author}`;

    }



    if (data.title) {


        document.querySelector("#footer-title").textContent =
            data.title;

    }


}





function loadContent(content) {


    const container =
        document.querySelector("#content");



    container.innerHTML =
        marked.parse(content);


}