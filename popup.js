const button = document.querySelector('.colorPickerButton');

button.addEventListener('click', async() => {
    console.log('Listening')
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    });
})

function pickColor() {
    console.log('Its working')
}