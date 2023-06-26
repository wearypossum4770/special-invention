const completeLink = ({ rel, as, preference }) => ({
  crossorigin: "anonymous",
  get rel() {
    switch (preference) {
      default:
        return "stylesheet";
      case 1:
      case 2:
        return null;
      case 3:
        return "alternate stylesheet";
    }
  },
  media: "",
  fetchpriority: "",
  hreflang: "",
  imagesizes: "",
  imagesrcset: "",
  integrity: "",
  prefetch: "",
  referrerpolicy: "",
  sizes: "",
  title: "",
  type: "",
  blocking: "",
  href: "",
  src: "",
  get as() {
    return ["preload", "prefetch"].includes(this.rel) ? as : null;
  },
});
