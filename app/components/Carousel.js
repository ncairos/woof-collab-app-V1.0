import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-banner-carousel";

export default function CarouselImg(props) {
  const { arrayImg, height, width } = props;

  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.activeIndicator}
    >
      {arrayImg.map((imgURL, index) => (
        <View key={imgURL}>
          <Image style={{ width, height }} source={{ uri: imgURL }} />
        </View>
      ))}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#6b7a8f",
  },
  activeIndicator: {
    backgroundColor: "#f7882f",
  },
});
