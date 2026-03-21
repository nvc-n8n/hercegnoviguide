import { Share } from 'react-native';
import * as Linking from 'expo-linking';

import type { Place } from '@/src/types/place';

export const sharePlace = async (place: Place) => {
  try {
    const url = Linking.createURL(`/mjesto/${place.slug}`);
    await Share.share({
      message: `${place.title}\n${place.address}\n${url}`,
      url,
      title: place.title,
    });
  } catch (error) {
    if (error instanceof Error && error.message !== 'Share cancelled') {
      console.error('Failed to share place:', error);
    }
    // User cancelled share - no need to show error
  }
};
