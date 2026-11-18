import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  return {
    ...theme,
    colorScheme,
    isDark: colorScheme === 'dark',
  };
};
