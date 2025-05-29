import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type LoadingIconProps = {
  size?: 'small' | 'large' | number;
  color?: string;
  centered?: boolean;
};

export default function LoadingIcon({ size = 'large', color = '#007AFF', centered = true }: LoadingIconProps) {
  return (
    <View style={[centered && styles.center]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
