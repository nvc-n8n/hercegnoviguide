import type { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { RefreshControlProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  refreshControl?: ReactElement<RefreshControlProps>;
};

export const Screen = ({ children, scroll = true, refreshControl }: ScreenProps) => {
  if (!scroll) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.container}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
    gap: spacing.section,
  },
});
