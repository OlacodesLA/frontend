export function getInitials(fullName: string) {
  // Split the name by spaces and filter out empty strings (in case of multiple spaces)
  const nameParts = fullName?.trim()?.split(" ")?.filter(Boolean);

  // Get the first character of the first and last part (if available)

  if (!nameParts.length) {
    return;
  }
  const initials =
    nameParts?.length > 1
      ? nameParts[0][0]?.toUpperCase() +
        nameParts[nameParts?.length - 1][0]?.toUpperCase()
      : nameParts[0][0]?.toUpperCase();

  return initials;
}
