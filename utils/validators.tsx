export default function isDataValid(
  boardGameName: string,
  boardGameDescription: string,
  boardGameImage: string,
  selectedCategory: string,
  handleError: (message: string) => void
) {
  if (!boardGameName || !boardGameDescription) {
    handleError("Please fill in all fields");
    return false;
  }
  if (boardGameImage === "") {
    handleError("Please upload an image");
    return false;
  }
  if (selectedCategory === "") {
    handleError("Please select a category");
    return false;
  }
  if (boardGameName.length < 3) {
    handleError("Name must be at least 3 characters long");
    return false;
  }
  if (boardGameDescription.length < 10) {
    handleError("Description must be at least 10 characters long");
    return false;
  }

  return true;
}
