document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progressText = document.getElementById("progress");

  function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll("input[type='checkbox']:checked").length;
    const percent = Math.round((checked / total) * 100);
    progressText.textContent = `Progression : ${percent}% (${checked} / ${total})`;
  }

  checkboxes.forEach((checkbox, index) => {
    const saved = localStorage.getItem("checkbox_" + index);
    checkbox.checked = saved === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem("checkbox_" + index, checkbox.checked);
      updateProgress();
    });
  });

  updateProgress();
});
