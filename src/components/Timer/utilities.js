export const isInputValid = (value) => {
  console.log("val", value);
  return !isNaN(value) && value !== "" && isNaN(value) != null;
};

export const validateMins = (mins, setMins, max, toast) => {
  if (mins > max) {
    console.log(max);
    setMins(max);
    toast({
      title: "Error",
      description: "Minutes are exceeding max limit",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  } else if (mins < 1) {
    setMins(1);
    toast({
      title: "Error",
      description: "Minutes cannot be less than 1",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  }
};
