import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pickupIconContainer: {
    backgroundColor: Theme.Red201,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  distanceText: {
    padding: Spacing.SuperTiny,
    backgroundColor: Theme.Neutral02,
    borderRadius: 4,
  },
  outletButton: {
    marginTop: Spacing.Tiny,
    marginBottom: Spacing.High,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.Neutral04,
    paddingHorizontal: Spacing.Standard,
    paddingVertical: Spacing.Tiny,
  },
  outletLogo: {
    marginRight: Spacing.Tiny,
  },
  timeButton: {
    marginTop: Spacing.Tiny,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Theme.Neutral04,
    padding: Spacing.Small,
    justifyContent: 'space-between',
  },
  pickupTimeLogo: {
    marginRight: Spacing.Small,
  },
  pickupTimeText: {
    flexGrow: 1,
  },
});

export default styles;
