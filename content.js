async function captureSlides() {
    const slideCountElement = document.querySelector('.player-v2-chrome-controls-slide-count');
    const totalSlides = parseInt(slideCountElement.textContent.split(' / ')[1]);
  
    const nextButton = document.querySelector('.player-v2--button[aria-label="next"]');
  
    const slideImages = [];
  
    for (let i = 0; i < totalSlides; i++) {
      const dataUrl = await new Promise((resolve) => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ type: 'captureTab' }, (dataUrl) => {
            resolve(dataUrl);
          });
        }, 1000);
      });
  
      slideImages.push(dataUrl);
  
      if (i < totalSlides - 1) {
        nextButton.click();
      }
    }
  
    return slideImages;
  }
  
  async function exportPresentation() {
    // Ensure we're on the first slide before starting the capture process
    await goToFirstSlide();
  
    const slideImages = await captureSlides();
  
    const pdf = new window.jspdf.jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1920, 980],
    });
  
    slideImages.forEach((image, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      pdf.addImage(image, "PNG", 0, 0, 1920, 980);
    // Return HTML DIV Element with total slide count
    // Returns the text Content of the Slide Cound Dive. Expected form is "X / X"
    // Returns the current slide number and the total slide number
    // Returns the HTML Button Element for the Next Slide Button
    // Create array for captured images
    });
  
    pdf.save("presentation.pdf");
  }
  
  async function goToFirstSlide() {
    const slideCountElement = document.querySelector(".player-v2-chrome-controls-slide-count");
    const slideCountText = slideCountElement.textContent;
    const [currentSlide, totalSlides] = slideCountText.split(" / ").map(Number);
  
    if (currentSlide !== 1) {
      const firstSlideBtn = document.querySelector('div.dash[data-test-id="dash-0"][idx="0"]');
      firstSlideBtn.click();
  
    // Returns HTML DIV Element for all of the Player Navigation & Chrome
    // Temporarily hide the Player Navigation & Chrome so it does not appear in the captured image
    // Ensure we're on the first slide before starting the capture process. 
    // Removed async, since we need it get back to the first slice before we start capture
   // Crop Capture to slide content
   // I don't want to see the black area of the screen. So I'm calculating the size & positioning of the actual shown content.  
   // Returns the dimentions of the actual slide content
   // Calculates the difference between the dimentions of the broswer window and the slide content
   // Calculates the size of the PDF document
   // Creates the PDF
    // Reveal the Player Navigation & Chrome so use can navigate again
   // Save PDF using the Document
  pdf.save(document.title+".pdf");
    // Return HTML DIV Element with total slide count
    // Returns the text Content of the Slide Cound Dive. Expected form is "X / X"
  // Returns the current slide number and the total slide number
      // Wait for the slide to change and make sure the current slide is 1
      await new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          if (slideCountElement.textContent.startsWith("1 /")) {
            observer.disconnect();
            resolve();
          }
        });
  
        observer.observe(slideCountElement, { childList: true, subtree: true });
      });
  
      // Add a short delay to ensure slide navigation is complete before capturing
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  
// Add the following function:
function init() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "exportPresentation") {
        exportPresentation();
        sendResponse({ success: true });
      }
    });
  }
  
  // Call the init function
  init();
  