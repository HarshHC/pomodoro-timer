export const isInputValid = value => {
  return !Number.isNaN(value) && value !== '' && Number.isNaN(value) != null;
};

export const validateMins = (
  sessionMins,
  setSessionMins,
  maxSessionMins,
  toast
) => {
  if (sessionMins > maxSessionMins) {
    setSessionMins(maxSessionMins);
    toast({
      title: 'Error',
      description: 'Minutes are exceeding max limit',
      status: 'error',
      duration: 1000,
      isClosable: true
    });
  } else if (sessionMins < 1) {
    setSessionMins(1);
    toast({
      title: 'Error',
      description: 'Minutes cannot be less than 1',
      status: 'error',
      duration: 1000,
      isClosable: true
    });
  }
};
