import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-banner-carousel";

import { YellowBox } from "react-native";
import _ from "lodash";
YellowBox.ignoreWarnings(["componentWillReceiveProps", "componentWillMount"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("componentWillReceiveProps") <= -1) {
    _console.warn(message);
  } else if (message.indexOf("componentWillMount") <= -1) {
    _console.warn(message);
  }
};

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
