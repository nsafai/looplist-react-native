import { StyleSheet } from 'react-native';
import { green, lightGrey } from '../../helpers/Colors';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  titleAndBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 20,
  },
  listsContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  helperText: {
    padding: 30,
  },
  newListBtn: {
    backgroundColor: green,
    paddingVertical: 15,
  },
  logOut: {
    color: green,
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  appTitle: {
    marginTop: 100,
    marginBottom: 60,
    textAlign: 'center',
    fontSize: 24,
    color: lightGrey,
  }
});

export default styles;
