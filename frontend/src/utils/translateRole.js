const translateRole = (InputRole) => {
  let role;

  switch (InputRole) {
    case "CEO":
      role = "CEO";
      break;
    case "COO":
      role = "COO";
      break;
    case "MANAGER":
      role = "Manager";
      break;
    case "DESIGNER":
      role = "Designer";
      break;
    case "ESGUURCHIN":
      role = "Эсгүүрчин";
      break;
    case "OYDOLCHIN":
      role = "Оёдолчин";
      break;
    case "HATGAMALCHIN":
      role = "Хатгамалчин";
      break;
    case "TOWCHSHILBE":
      role = "Товч шилбэ";
      break;
    case "GARCHIMEGLEL":
      role = "Гар чимэглэл";
      break;
    default:
      role = "undefined role";
  }

  return role;
};

export default translateRole;
// "CEO",
//       "COO",
//       "MANAGER",
//       "DESIGNER",
//       "ESGUURCHIN",
//       "OYDOLCHIN",
//       "HATGAMALCHIN",
//       "TOWCHSHILBE",
//       "GARCHIMEGLEL"
