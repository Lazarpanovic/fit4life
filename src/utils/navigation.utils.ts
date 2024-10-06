export const scrollToPrograms = () => {
  const programsSection = document.getElementById("programs");
  if (programsSection) {
    programsSection.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToCoaches = () => {
  const programsSection = document.getElementById("coaches");
  if (programsSection) {
    programsSection.scrollIntoView({ behavior: "smooth" });
  }
};
