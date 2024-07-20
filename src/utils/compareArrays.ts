// function compareArraysForDeletion(
//   fullArray: LunchDetails[],
//   newArray: LunchDetails[],
// ) {
//   // Create a Set from fullArray's IDs for efficient lookups
//   const fullArrayIdSet = new Set(fullArray.map(item => item.id));
//   //OUTPUT: fullArrayIdSet => Set {10, 11, 14}
//
//   return newArray.map(newItem => {
//     // Check if newItem's ID exists in fullArray using Set lookup
//     const isPresent = fullArrayIdSet.has(newItem.id);
//
//     // Return an object for clarity in your component
//     return {
//       id: newItem.id,
//       toBeDeleted: !isPresent, // Negate for clearer "to be deleted" logic
//       itemData: newItem, // Include item data for further processing (optional)
//     };
//   });
// }
