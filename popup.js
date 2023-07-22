// Scope of the variables are not available in the script which gets executed
// in [chrome.scripting.executeScript] until passed in the arguments as params
const colorPickerButton = document.querySelector(".colorPickerButton");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

colorPickerButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Executing the script in the active tab that we fetched
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (result) => {
      const [data] = result;
      if (data?.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
      }
    }
  );
});

// Above this point all the things get executed in the chrome extension

// Function gets executed in the active tab window
async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (error) {}
}
