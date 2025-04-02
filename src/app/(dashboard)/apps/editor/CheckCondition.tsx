// CheckCondition.ts
export const CheckCondition = (dtvp_code: string, answer: string) => {
    console.log("Passed data is......................", { dtvp_code, answer });
    
    // Get the saved API response from localStorage
    const savedResponse = localStorage.getItem("apiResponse");
    const savedContent = localStorage.getItem("extractedHtml");
    
    if (!savedResponse || !savedContent) {
      console.error("No API response or HTML content found in localStorage");
      return;
    }
  
    try {
      const data = JSON.parse(savedResponse);
      const conditionalLogics = data?.data?.primaryData?._template?.conditionalLogics || [];
      
      // Create a DOM parser to work with the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(savedContent, 'text/html');
      
      // Track if we made any modifications
      let contentModified = false;
      
      // Process all conditional logics
      conditionalLogics.forEach((logic: any) => {
        logic.conditions.forEach((condition: any) => {
          if (condition.dtvp_code === dtvp_code) {
            const relevantTargets = (logic.targets?.targetedTags || [])
              .filter((tag: any) => tag.dtvp_code === dtvp_code);
            
            relevantTargets.forEach((tag: any) => {
              // Check if condition is met
              let isMet = false;
              const requiredValue = condition.dtvp_inputType === "decimal" 
                ? parseFloat(condition.dc_numericValue)
                : condition.dc_strValue;
              const answerValue = condition.dtvp_inputType === "decimal"
                ? parseFloat(answer)
                : answer;

              switch (condition.dc_operator) {
                case "equal":
                  isMet = answerValue === requiredValue;
                  break;
                case "inferior":
                  isMet = answerValue < requiredValue;
                  break;
                case "inferior-or-equal":
                  isMet = answerValue <= requiredValue;
                  break;
                case "superior":
                  isMet = answerValue > requiredValue;
                  break;
                case "superior-or-equal":
                  isMet = answerValue >= requiredValue;
                  break;
              }

              // Only process "hide" actions when condition is met
              if (isMet && tag.dtt_action === 'hide') {
                const element = doc.getElementById(tag.dtt_idAttribute);
                if (element) {
                  console.log(`Removing element with ID: ${tag.dtt_idAttribute}`);
                  element.remove(); // hide is element.style.display = 'none';
                  contentModified = true;
                } else {
                  console.warn(`Element not found with ID: ${tag.dtt_idAttribute}`);
                }
              }
            });
          }
        });
      });

      // If we made changes, save the updated HTML back to localStorage
      if (contentModified) {
        const newContent = doc.documentElement.outerHTML;
        localStorage.setItem('extractedHtml', newContent);
        console.log('Updated HTML content saved to localStorage');
        
        // Return the modified HTML for immediate use if needed
        return newContent;
      } else {
        console.log('No HTML modifications were needed');
        return savedContent; // Return original content if no changes
      }

    } catch (error) {
      console.error("Error processing conditional logics:", error);
      console.error("Raw localStorage content:", savedResponse);
      return savedContent; // Return original content on error
    }
};


/* hide
              // Only process "hide" actions when condition is met
              if (isMet && tag.dtt_action === 'hide') {
                const element = doc.getElementById(tag.dtt_idAttribute);
                if (element) {
                  console.log(`Hiding element with ID: ${tag.dtt_idAttribute}`);
                  element.style.display = 'none';
                  contentModified = true;
                } else {
                  console.warn(`Element not found with ID: ${tag.dtt_idAttribute}`);
                }
              }

*/