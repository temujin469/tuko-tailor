export default (status) => {
  return status === "EHELSEN"
    ? "Эхэлсэн"
    : status === "DUUSSAN"
    ? "Дууссан"
    : null;
};
