import { StyleSheet } from 'react-native';
import { green, grey } from '../../helpers/Colors';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    margin: 10,
  }, 
  titleAndBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 20,
  },
  resetBtn: {
    backgroundColor: green,
    width: 100,
    margin: 10,
  },
  helperText: {
    padding: 30,
  },
  addItemBtnContainer: {
    margin: 26,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addItemBtn: {
    color: grey,
    padding: 10,
    fontSize: 18,
    marginLeft: 10,
  },
  deleteBtnContainer: {
    width: 110,
    height: 30,
    marginTop: 100,
    marginRight: 18,
    marginBottom: 40,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  deleteListBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteTxt: {
    marginRight: 10,
    color: grey,
    fontSize: 15,
  },
})

export default styles;
