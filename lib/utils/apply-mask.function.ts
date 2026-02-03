export function applyMask(value: string, mask: string | string[]) {
  if (!mask) return value;
  if (Array.isArray(mask)) mask = resolveMask(value, mask)
  
  const cleanValue = value.replace(/\D/g, "");
  let result = "";
  let cleanIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (cleanIndex >= cleanValue.length) break;

    if (mask[i] === "9") {
      result += cleanValue[cleanIndex];
      cleanIndex++;
    } else {
      result += mask[i];
    }
  }

  return result;
}

function resolveMask(value: string, masks: string[]) {
  const digitsLength = value.replace(/\D/g, "").length;

  return (
    masks.find(
      (mask) => (mask.match(/9/g)?.length ?? 0) >= digitsLength
    ) ?? masks[masks.length - 1]
  );
}