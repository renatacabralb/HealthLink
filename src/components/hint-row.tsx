import React, { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({
  title = "Try editing",
  hint = "app/index.tsx",
}: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.codeSnippet}>
        <Text style={styles.hint}>{hint as ReactNode}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeSnippet: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 14,
  },
  hint: {
    color: "#666",
  },
});
