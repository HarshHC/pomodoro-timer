export const generateGradientTheme = (
  color,
  colorMode,
  bg = { image: false, random: true },
  name = ""
) => {
  const theme = {
    color,
    colorMode,
    name: name === "" ? color.name : name,
    startColor: color.darkColor1,
    endColor: color.darkColor2,
    bgImage: bg.image != null ? bg.image : false,
    bgInfo: {
      location: "online",
      random_url:
        "https://source.unsplash.com/1600x900/?background," + color.name,
      custom_url: "",
      random: bg.random != null ? bg.random : true,
    },
    styles: {
      bg: {
        color: color.textColor,
        _hover: { bg: color.hover },
        bgGradient:
          colorMode === "light"
            ? "linear(to-bl," +
              color.lightColor1 +
              "," +
              color.lightColor2 +
              ")"
            : "linear(to-bl," + color.darkColor1 + "," + color.darkColor2 + ")",
        reverse: {
          color: color.textColor,
          _hover: { bg: color.hover },
          bgGradient:
            colorMode === "light"
              ? "linear(to-r," +
                color.lightColor1 +
                "," +
                color.lightColor2 +
                ")"
              : "linear(to-r," +
                color.darkColor1 +
                "," +
                color.darkColor2 +
                ")",
        },
      },
      bgNoHover: {
        color: color.textColor,
        bgGradient:
          colorMode === "light"
            ? "linear(to-bl," +
              color.lightColor1 +
              "," +
              color.lightColor2 +
              ")"
            : "linear(to-bl," + color.darkColor1 + "," + color.darkColor2 + ")",
      },
      darkTransparentBg: {
        bg: "rgba(0, 0, 0, 0.5);",
        "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      },
      lightTransparentBg: {
        bg: "rgba(255, 255, 255, 0.2)",
        "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      },
    },
  };
  return theme;
};

export const changeGradientThemeColorTo = (oldTheme, color) => {
  const newTheme = generateGradientTheme(color, oldTheme.colorMode, {
    image: oldTheme.bgImage,
    random: oldTheme.bgInfo.random,
  });
  saveThemeToStorage(newTheme);
  return newTheme;
};

export const toggleBackgroundImageInGradientTheme = (oldTheme) => {
  const newTheme = generateGradientTheme(oldTheme.color, oldTheme.colorMode, {
    image: !oldTheme.bgImage,
    random: oldTheme.bgInfo.random,
  });
  saveThemeToStorage(newTheme);
  return newTheme;
};

export const toggleRandomImageInGradientTheme = (oldTheme) => {
  const newTheme = generateGradientTheme(oldTheme.color, oldTheme.colorMode, {
    image: oldTheme.bgImage,
    random: !oldTheme.bgInfo.random,
  });
  saveThemeToStorage(newTheme);
  return newTheme;
};

export const saveThemeToStorage = (newTheme) => {
  window.localStorage.setItem("timer-theme", JSON.stringify(newTheme));
};

export const BLUE = {
  name: "blue",
  baseColor: "blue.500",
  lightColor1: "#149fff",
  lightColor2: "#117aff",
  darkColor1: "#149fff",
  darkColor2: "#117aff",
  hover: "blue.600",
  textColor: "white",
};

export const PURPLE = {
  name: "purple",
  baseColor: "#9b00fa",
  lightColor1: "#5d0cff",
  lightColor2: "#9b00fa",
  darkColor1: "#5d0cff",
  darkColor2: "#9b00fa",
  hover: "#5d0cff",
  textColor: "white",
};

export const ORANGE = {
  name: "orange",
  baseColor: "orange.500",
  lightColor1: "#F98745",
  lightColor2: "#FC6952",
  darkColor1: "#F98745",
  darkColor2: "#FC6952",
  hover: "#e56a39",
  textColor: "white",
};

export const RED = {
  name: "red",
  baseColor: "red.500",
  lightColor1: "#F22E44",
  lightColor2: "#CE263B",
  darkColor1: "#F22E44",
  darkColor2: "#CE263B",
  hover: "#D43A5A",
  textColor: "white",
};

export const GREEN = {
  name: "green",
  baseColor: "lime",
  lightColor1: "#9AF945",
  lightColor2: "#65F883",
  darkColor1: "#9AF945",
  darkColor2: "#65F883",
  hover: "lime",
  textColor: "black",
};

export const YELLOW = {
  name: "yellow",
  baseColor: "yellow",
  lightColor1: "#FECE52",
  lightColor2: "#FDA714",
  darkColor1: "#FECE52",
  darkColor2: "#FDA714",
  hover: "#FFCC30",
  textColor: "black",
};

export const themesList = [BLUE, PURPLE, ORANGE, RED, GREEN, YELLOW];
