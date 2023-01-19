const statusOfRole = (InputRole) => {
  let statusTitle;

  switch (InputRole?.toUpperCase()) {
    case "CEO":
      statusTitle = "Оёдол";
      break;
    case "COO":
      statusTitle = "Оёдол";
      break;
    case "MANAGER":
      statusTitle = "Оёдол";
      break;
    case "DESIGNER":
      statusTitle = "Оёдол";
      break;
    case "ESGUURCHIN":
      statusTitle = "Эсгүүр";
      break;
    case "OYDOLCHIN":
      statusTitle = "Оёдол";
      break;
    case "HATGAMALCHIN":
      statusTitle = "Хатгамал";
      break;
    case "TOWCHSHILBE":
      statusTitle = "Товч шилбэ";
      break;
    case "GARCHIMEGLEL":
      statusTitle = "Гар чимэглэл";
      break;
    default:
      statusTitle = "undefined statusName";
  }

  return statusTitle;
};

export default statusOfRole;
// "CEO",
//       "COO",
//       "MANAGER",
//       "DESIGNER",
//       "ESGUURCHIN",
//       "OYDOLCHIN",
//       "HATGAMALCHIN",
//       "TOWCHSHILBE",
//       "GARCHIMEGLEL"
