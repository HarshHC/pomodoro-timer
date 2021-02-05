export const isInputValid = (value) => {
  return !isNaN(value);
};

export const validateMins = (mins, setMins, max, toast) => {
  if (mins > max) {
    setMins(max);
    toast({
      title: "Error",
      description: "Minutes are exceeding max limit",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  } else if (mins < 0) {
    setMins(0);
    toast({
      title: "Error",
      description: "Minutes cannot be less than 0",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  }
};
