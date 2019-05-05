import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginForm: {
    marginTop: 60,
    fontSize: 16,
    padding: 20,
  },
  otherOption: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'grey',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  ctaBtn: {
    backgroundColor: '#28a745',
    marginLeft: 30,
    marginRight: 30,
  },
  otherBtn: {
    margin: 0,
    borderColor: '#28a745',
    // backgroundColor: '#00000000',
    // color: '#000000',
  }
});

export default styles;