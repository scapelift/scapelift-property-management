(function registerGalleryPreview() {
  const element = h;
  const galleryEditorRoute = /\/collections\/finished_work_gallery\/entries\/gallery(?:[/?]|$)/;
  const beforeAfterEditorRoute = /\/collections\/before_after_gallery\/entries\/before_after(?:[/?]|$)/;
  const onTheJobEditorRoute = /\/collections\/on_the_job_gallery\/entries\/on_the_job(?:[/?]|$)/;

  function updateEditorScope() {
    document.body.classList.toggle("finished-work-gallery-editor", galleryEditorRoute.test(window.location.hash));
    document.body.classList.toggle("before-after-gallery-editor", beforeAfterEditorRoute.test(window.location.hash));
    document.body.classList.toggle("on-the-job-gallery-editor", onTheJobEditorRoute.test(window.location.hash));
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

  function BeforeAfterGalleryPreview({ entry, getAsset }) {
    const data = entry.get("data");
    const heading = read(data, "heading", null);
    const items = read(data, "items", null);
    const projects = items && typeof items.toArray === "function" ? items.toArray() : [];
    const beforeLabel = read(heading, "before", "Before");
    const afterLabel = read(heading, "after", "After");

    function renderSide(item, imageKey, altKey, label) {
      const image = read(item, imageKey);
      const alt = read(item, altKey);
      const imageSource = resolveImage(getAsset, image);
      return element(
        "div",
        { className: "ba-side" },
        element("span", { className: "ba-label" }, label),
        imageSource
          ? element("img", { src: imageSource, alt })
          : element("div", { className: "ba-image-placeholder" }, `Choose a ${label} image`),
      );
    }

    return element(
      "section",
      { className: "section work" },
      element(
        "h3",
        { className: "work-subhead" },
        beforeLabel,
        " ",
        element("span", { className: "dash" }, read(heading, "separator", "–")),
        " ",
        afterLabel,
      ),
      element(
        "div",
        { className: "ba-grid" },
        ...projects.map((item, index) => {
          const beforeImage = read(item, "beforeImage");
          const beforeAlt = read(item, "beforeAlt");
          const afterImage = read(item, "afterImage");
          const afterAlt = read(item, "afterAlt");
          const caption = read(item, "caption");
          return element(
            "figure",
            { className: "ba-card", key: `${beforeImage}-${beforeAlt}-${afterImage}-${afterAlt}-${caption}-${index}` },
            element(
              "div",
              { className: "ba-pair" },
              renderSide(item, "beforeImage", "beforeAlt", beforeLabel),
              renderSide(item, "afterImage", "afterAlt", afterLabel),
            ),
            element("figcaption", null, caption),
          );
        }),
      ),
    );
  }

  function OnTheJobPreview({ entry, getAsset }) {
    const data = entry.get("data");
    const items = read(data, "items", null);
    const galleryItems = items && typeof items.toArray === "function" ? items.toArray() : [];

    return element(
      "section",
      { className: "section work" },
      element("h3", { className: "work-subhead" }, read(data, "heading", "On the Job")),
      galleryItems.length
        ? element(
            "div",
            { className: "action-strip" },
            ...galleryItems.map((item, index) => {
              const image = read(item, "image");
              const alt = read(item, "alt");
              const caption = read(item, "caption");
              const imageSource = resolveImage(getAsset, image);
              return element(
                "figure",
                { className: "action-card", key: `${image}-${alt}-${caption}-${index}` },
                imageSource
                  ? element("img", { src: imageSource, alt, decoding: "async" })
                  : element(
                      "div",
                      {
                        className: "action-image-placeholder",
                        style: {
                          position: "absolute",
                          inset: 0,
                          display: "grid",
                          placeItems: "center",
                          padding: "1rem",
                          color: "#b8b8b8",
                          textAlign: "center",
                        },
                      },
                      "Choose an image",
                    ),
                element("figcaption", null, caption || "Add a caption"),
              );
            }),
          )
        : element(
            "p",
            { style: { color: "#b8b8b8", padding: "1rem 0" } },
            "Add an image to begin the On-the-Job gallery.",
          ),
    );
  }

  CMS.registerPreviewStyle("/styles.css");
  CMS.registerPreviewTemplate("gallery", FinishedWorkGalleryPreview);
  CMS.registerPreviewTemplate("before_after", BeforeAfterGalleryPreview);
  CMS.registerPreviewTemplate("on_the_job", OnTheJobPreview);
  window.addEventListener("hashchange", updateEditorScope);
  updateEditorScope();
})();
