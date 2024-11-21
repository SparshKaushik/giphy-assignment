import { throttle } from "@/lib/utils";
import React, { Fragment, ReactNode, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

interface RenderItemProps<T> {
  item: T;
  index: number;
}

interface ResponsiveGridProps<T> {
  keyExtractor?: ({ item, index }: RenderItemProps<T>) => string;
  renderItem: ({ item, index }: RenderItemProps<T>) => ReactNode;
  data: T[];
  itemsPerColumn: number;
  scrollEventInterval?: number;
  showScrollIndicator?: boolean;
  style?: StyleProp<ViewStyle>;
  columnContainerStyle?: StyleProp<ViewStyle>;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const renderPropComponent = (
  Component?: React.ComponentType<any> | React.ReactElement | ReactNode | null,
) => {
  if (React.isValidElement(Component)) return Component;
  if (typeof Component === "function") return <Component />;
  return null;
};

export function ResponsiveGrid<T>({
  keyExtractor = ({ item, index }) => String(index),
  renderItem,
  data = [],
  itemsPerColumn = 2,
  scrollEventInterval = 200,
  showScrollIndicator = true,
  style = {},
  columnContainerStyle = {},
  onEndReached,
  onEndReachedThreshold = 1,
}: ResponsiveGridProps<T>) {
  const [endReachedTimeout, setEndReachedTimeout] = useState<NodeJS.Timeout>();
  const [splitData, setSplitData] = useState<T[][]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const columns: T[][] = Array.from({ length: itemsPerColumn }, () => []);
    data.forEach((item, index) => {
      columns[index % itemsPerColumn].push(item);
    });
    setSplitData(columns);
  }, [data, itemsPerColumn]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Handle infinite scroll
    if (onEndReached) {
      const paddingToBottom = contentSize.height * onEndReachedThreshold;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        onEndReached();
        setEndReachedTimeout(
          setTimeout(() => {
            setEndReachedTimeout(undefined);
          }, scrollEventInterval),
        );
      }
    }
  };

  const renderColumn = (column: T[], columnIndex: number) => {
    return column.map((item, index) => (
      <Fragment key={keyExtractor({ item, index })}>
        {renderPropComponent(renderItem({ item, index }))}
      </Fragment>
    ));
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={[styles.container, style]}
      onScroll={handleScroll}
      scrollEventThrottle={scrollEventInterval}
      showsVerticalScrollIndicator={showScrollIndicator}
    >
      {splitData.map((column, index) => (
        <View
          style={[
            styles.column,
            {
              width: `${100 / itemsPerColumn - 1}%`,
            },
            columnContainerStyle,
          ]}
          key={index}
        >
          {renderColumn(column, index)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
