import { useEvent } from "expo";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { Dimensions, StyleSheet } from "react-native";

import IconButton from "@/components/ui/IconButton";
import { Text, View } from "@/components/ui/Themed";
import { useGIFByIDQuery } from "@/lib/models/gif";
import { useState } from "react";
import { downloadFile } from "@/lib/utils/files";

export default function PreviewGIF() {
  const { id } = useLocalSearchParams();

  const [isShareLoading, setIsShareLoading] = useState(false);

  const gif = useGIFByIDQuery({
    params: {
      gif_id: Array.isArray(id) ? id[0] : id,
    },
  });

  const player = useVideoPlayer(
    gif.data?.data.images.original.mp4 ?? "",
    (p) => {
      p.loop = true;
      p.play();
    },
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{gif.data?.data.title}</Text>
      <VideoView
        style={{
          width: Math.min(
            Number(gif.data?.data.images.original.width),
            Dimensions.get("window").width - 16,
          ),
          aspectRatio:
            Number(gif.data?.data.images.original.width) /
            Number(gif.data?.data.images.original.height),
        }}
        player={player}
        nativeControls={false}
      />
      <View style={styles.videoFooter}>
        <IconButton
          icon={isPlaying ? "pause" : "play"}
          onPress={() => {
            isPlaying ? player.pause() : player.play();
          }}
          feedbackType="Native"
        />
        <View style={styles.shareContainer}>
          <IconButton
            icon="download"
            onPress={async () => {
              setIsShareLoading(true);
              const url = gif.data?.data.images.original.url;
              if (url) {
                const file = await downloadFile(
                  gif.data?.data.id ?? "",
                  url,
                  false,
                  {
                    width: Number(gif.data?.data.images.original.width),
                    height: Number(gif.data?.data.images.original.height),
                  },
                );
              }
              setIsShareLoading(false);
            }}
            feedbackType="Opacity"
            disabled={isShareLoading}
          />
          <IconButton
            icon="share"
            onPress={async () => {
              setIsShareLoading(true);
              const url = gif.data?.data.images.original.url;
              if (url) {
                await downloadFile(gif.data?.data.id ?? "", url, true);
              }
              setIsShareLoading(false);
            }}
            feedbackType="Opacity"
            disabled={isShareLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  videoFooter: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
  },
  shareContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
