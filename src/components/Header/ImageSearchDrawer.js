import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
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
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { config } from 'dotenv';
import {
  FONT_FAMILY,
  setGradientThemeImageCustomUrl
  // toggleBackgroundImageInGradientTheme,
  // toggleRandomImageInGradientTheme
} from '../../Constants/themes';

function ImageSearchDrawer(props) {
  const [searchInput, setSearchInput] = useState('nature background');
  const [photosResponse, setPhotosResponse] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  config(); // config unsplash api

  const unsplash = createApi({
    accessKey: process.env.REACT_APP_API_KEY
  });

  const searchUnsplash = searchFor => {
    unsplash.search
      .getPhotos({
        query: searchFor,
        orientation: isOnmobile ? 'portrait' : 'landscape',
        per_page: 30
      })
      .then(result => {
        if (result != null) {
          setPhotosResponse(result);
        }
        // console.log(result);
      })
      .catch(() => {
        // console.log('something went wrong!');
      });
  };
  useEffect(() => {
    if (props.isOpen) {
      searchUnsplash('nature background');
    }
  }, [props.isOpen]);

  const handleSearch = () => {
    searchUnsplash(searchInput);
  };

  let images = (
    <Flex>
      {searchClicked ? (
        <Skeleton m="4" w="100%" h="100%" />
      ) : (
        <Flex m="4" w="100%" h="100%" />
      )}
    </Flex>
  );
  if (photosResponse != null && photosResponse.response != null) {
    images = (
      <Flex m="4" w="100%" h="90%" flexWrap="wrap" flexDir="row">
        {photosResponse.response.results.map(photo => (
          <Box key={photo.id} m="2" w={isOnmobile ? '28%' : '25%'}>
            <Image
              w="100%"
              h={isOnmobile ? '200px' : '100px'}
              borderRadius="4px"
              src={photo.urls.regular}
              alt={photo.alt_description}
              onClick={() => {
                const newTheme = setGradientThemeImageCustomUrl(
                  props.theme,
                  photo.urls.regular
                );
                props.setTheme(newTheme);

                toast({
                  title: 'Background changed!',
                  description:
                    'Close the image search drawer to see your changes',
                  status: 'success',
                  duration: 1500
                });
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
      size={isOnmobile ? 'sm' : 'lg'}
      placement="right">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            <Flex justify="space-between" w="100%" align="center">
              <Flex flexDir="column">
                <Text
                  fontFamily={FONT_FAMILY}
                  fontSize="2xl"
                  letterSpacing="normal"
                  ml="4"
                  fontWeight="bold">
                  Choose Background Image
                </Text>
                <Text ml="4" fontSize="sm">
                  Images from{' '}
                  <Link
                    color="teal.500"
                    href="https://www.unsplash.com"
                    isExternal>
                    Unsplash.com
                  </Link>
                </Text>
              </Flex>
              <Button variant="outline" mr="1" onClick={props.onClose}>
                Done
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSearch();
              }}>
              <Flex mx="2" w="98%">
                <Input
                  w="100%"
                  pr="1vw"
                  value={searchInput}
                  fontFamily={FONT_FAMILY}
                  fontSize="md"
                  letterSpacing="normal"
                  onChange={e => {
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
                  fontFamily={FONT_FAMILY}
                  fontSize="lg"
                  letterSpacing="normal"
                  borderRadius="0px 4px 4px 0px"
                  leftIcon={<Search2Icon />}
                  onClick={() => setSearchClicked(true)}>
                  SEARCH
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
