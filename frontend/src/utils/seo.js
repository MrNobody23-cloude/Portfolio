// SEO utility for dynamic head management
export function updateSEO({ title, description, path }) {
    const fullTitle = title
        ? `${title} | Aaryan Patel — Personal Developer OS`
        : "Aaryan Patel — Personal Developer Operating System Portfolio";

    const metaDesc = description || "Explore Aaryan Patel's personal operating system developer portfolio featuring AI projects, MERN full-stack applications, skills diagnostic, and hackathon achievements.";

    document.title = fullTitle;

    // Meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.name = "description";
        document.head.appendChild(descMeta);
    }
    descMeta.content = metaDesc;

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
    }
    ogDesc.content = metaDesc;
}
