const steps = [
  "Write Story",
  "Concept Design",
  "Storyboarding",
  "Animatics",
  "3D Modeling",
  "Rigging",
  "Animation Production",
  "Visual Special Effects",
  "Rendering",
  "Composition",
  "Post-Production"
];

const stepData = steps.map(() => ({inputs: [], outputs: []}));

function createStep(index) {
  const stepDiv = document.createElement("div");
  stepDiv.className = "step";

  const h2 = document.createElement("h2");
  h2.textContent = `${index + 1}. ${steps[index]}`;
  stepDiv.appendChild(h2);

  // Input section
  const inputSection = document.createElement("div");
  inputSection.className = "assets-section";
  const inputHeader = document.createElement("h3");
  inputHeader.textContent = "Input Assets";
  inputSection.appendChild(inputHeader);
  const inputList = document.createElement("ul");
  inputList.id = `input-list-${index}`;
  inputSection.appendChild(inputList);
  const inputForm = document.createElement("form");
  inputForm.onsubmit = e => {
    e.preventDefault();
    const field = inputForm.querySelector("input");
    if (field.value.trim() !== "") {
      addAsset(index, "input", field.value.trim());
      field.value = "";
    }
  };
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "New input asset";
  inputForm.appendChild(inputField);
  const inputBtn = document.createElement("button");
  inputBtn.textContent = "Add";
  inputForm.appendChild(inputBtn);
  inputSection.appendChild(inputForm);
  stepDiv.appendChild(inputSection);

  // Output section
  const outputSection = document.createElement("div");
  outputSection.className = "assets-section";
  const outputHeader = document.createElement("h3");
  outputHeader.textContent = "Output Assets";
  outputSection.appendChild(outputHeader);
  const outputList = document.createElement("ul");
  outputList.id = `output-list-${index}`;
  outputSection.appendChild(outputList);
  const outputForm = document.createElement("form");
  outputForm.onsubmit = e => {
    e.preventDefault();
    const field = outputForm.querySelector("input");
    if (field.value.trim() !== "") {
      addAsset(index, "output", field.value.trim());
      field.value = "";
    }
  };
  const outputField = document.createElement("input");
  outputField.type = "text";
  outputField.placeholder = "New output asset";
  outputForm.appendChild(outputField);
  const outputBtn = document.createElement("button");
  outputBtn.textContent = "Add";
  outputForm.appendChild(outputBtn);
  outputSection.appendChild(outputForm);
  stepDiv.appendChild(outputSection);

  return stepDiv;
}

function addAsset(stepIndex, type, name) {
  const list = document.getElementById(`${type}-list-${stepIndex}`);
  const item = document.createElement("li");
  item.textContent = name;
  list.appendChild(item);
  stepData[stepIndex][type === "input" ? "inputs" : "outputs"].push(name);
  if (type === "output" && stepIndex + 1 < steps.length) {
    addAsset(stepIndex + 1, "input", name);
  }
}

function init() {
  const workflowDiv = document.getElementById("workflow");
  steps.forEach((s, i) => {
    workflowDiv.appendChild(createStep(i));
  });
}

window.onload = init;
