import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const SearchBarStyle = StyleSheet.create({
  searchBar: {
    flex: 1,
    padding: 0,
    height: '100%',
    borderRadius: 19,
    paddingLeft: Spacing.Extra + Spacing.Small,
  },
  borderSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.Neutral04,
  },
  borderActive: {
    borderColor: Theme.Red206,
  },
});

export default SearchBarStyle;
