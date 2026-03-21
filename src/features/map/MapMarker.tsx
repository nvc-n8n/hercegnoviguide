import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { categoryByKey } from '@/src/constants/categories';
import { colors } from '@/src/theme';
import type { PlaceCategory } from '@/src/types/place';

type MapMarkerProps = {
  category: PlaceCategory;
};

export const MapMarker = ({ category }: MapMarkerProps) => {
  const config = categoryByKey[category];
  const tint = config?.color ?? colors.primary;

  return (
    <View style={[styles.marker, { backgroundColor: tint }]}>
      <Ionicons color={colors.white} name={(config?.icon as never) ?? 'location'} size={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
