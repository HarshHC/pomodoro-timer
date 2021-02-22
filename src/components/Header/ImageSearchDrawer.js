import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { setGradientThemeImageCustomUrl } from "../../Constants/themes";
import { config } from "dotenv";

function ImageSearchDrawer(props) {
  const [searchInput, setSearchInput] = useState("nature background");
  const [photosResponse, setPhotosResponse] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  config();

  const unsplash = createApi({
    accessKey: process.env.REACT_APP_API_KEY,
  });

  useEffect(() => {
    if (!props.theme.bgInfo.random && props.theme.bgImage && searchClicked) {
      searchUnsplash("nature background");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.theme.bgInfo.random, props.theme.bgImage, searchClicked]);

  const searchUnsplash = (searchFor) => {
    unsplash.search
      .getPhotos({
        query: searchFor,
        orientation: "landscape",
        per_page: 30,
      })
      .then((result) => {
        if (result != null) {
          setPhotosResponse(result);
        }
        console.log(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  };

  const handleSearch = () => {
    searchUnsplash(searchInput);
  };

  let images = (
    <Flex>
      {searchClicked ? (
        <Skeleton m="4" w="100%" h="240px"></Skeleton>
      ) : (
        <Flex m="4" w="100%" h="240px"></Flex>
      )}
    </Flex>
  );
  if (photosResponse != null && photosResponse.response != null) {
    images = (
      <Flex m="4" w="100%" h="220px" flexWrap="wrap" overflow="scroll">
        {photosResponse.response.results.map((photo) => (
          <Box key={photo.id} m="2">
            {console.log()}
            <Image
              h="100%"
              w="25vw"
              borderRadius="4px"
              src={photo.urls.regular}
              alt={photo.alt_description}
              onClick={() => {
                const newTheme = setGradientThemeImageCustomUrl(
                  props.theme,
                  photo.urls.regular
                );
                props.setTheme(newTheme);
              }}
            />
          </Box>
        ))}
      </Flex>
    );
  }

  return (
    <Drawer
      onClose={props.onClose}
      isOpen={props.isOpen}
      size="lg"
      placement="top">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            <Text ml="4" fontWeight="bold">
              Choose Background Image
            </Text>
            <Text ml="4" fontSize="sm">
              Images from{" "}
              <Link color="teal.500" href="https://www.unsplash.com" isExternal>
                Unsplash.com
              </Link>
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
              <Flex ml="4" w="50%" minW="max-content">
                <Input
                  w="50vw"
                  pr="2vw"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  variant="outline"
                  borderRight="0px"
                  borderRadius="4px 0px 0px 4px"
                  placeholder="Search Images"
                />
                <Button
                  size="md"
                  type="submit"
                  minW="max-content"
                  borderRadius="0px 4px 4px 0px"
                  leftIcon={<Search2Icon />}
                  onClick={() => setSearchClicked(true)}>
                  search
                </Button>
              </Flex>
            </form>

            {images}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ImageSearchDrawer;
