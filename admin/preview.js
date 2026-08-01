(function registerGalleryPreview() {
  const element = h;
  const galleryEditorRoute = /\/collections\/finished_work_gallery\/entries\/gallery(?:[/?]|$)/;

  function updateEditorScope() {
    document.body.classList.toggle("finished-work-gallery-editor", galleryEditorRoute.test(window.location.hash));
  }

  function read(record, key, fallback = "") {
    if (!record || typeof record.get !== "function") return fallback;
    return record.get(key) ?? fallback;
  }

  function resolveImage(getAsset, path) {
    if (!path) return "";
    const asset = getAsset(path);
    return asset ? asset.toString() : path;
  }

  function FinishedWorkGalleryPreview({ entry, getAsset }) {
    const data = entry.get("data");
    const section = read(data, "section", null);
    const items = read(data, "items", null);
    const galleryItems = items && typeof items.toArray === "function" ? items.toArray() : [];

    return element(
      "section",
      { className: "section work" },
      element(
        "div",
        { className: "section-head" },
        element("span", { className: "eyebrow pink" }, read(section, "eyebrow")),
        element("h2", null, read(section, "title")),
        element("p", { className: "lede" }, read(section, "intro")),
      ),
      element("h3", { className: "work-subhead" }, read(data, "heading")),
      element(
        "div",
        { className: "work-grid" },
        ...galleryItems.map((item, index) => {
          const image = read(item, "image");
          const alt = read(item, "alt");
          const caption = read(item, "caption");
          const imageSource = resolveImage(getAsset, image);
          return element(
            "figure",
            { className: "work-card", key: `${image}-${alt}-${caption}-${index}` },
            element("img", {
              src: imageSource,
              alt,
              loading: "lazy",
            }),
            element("figcaption", null, caption),
          );
        }),
      ),
    );
  }

  CMS.registerPreviewStyle("/styles.css");
  CMS.registerPreviewTemplate("gallery", FinishedWorkGalleryPreview);
  window.addEventListener("hashchange", updateEditorScope);
  updateEditorScope();
})();
