export const formatDate = stringDate => {
  const date = new Date(stringDate);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
