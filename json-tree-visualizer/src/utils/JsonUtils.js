export const validateAndParseJSON = (text) => {
  try {
    const parsed = JSON.parse(text);
    return { valid: true, data: parsed };
  } catch (err) {
    return { valid: false, error: "Invalid JSON format. Please check syntax." };
  }
};
