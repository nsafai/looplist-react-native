import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  appTitle: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 36,
  },
  loginForm: {
    marginTop: 20,
    fontSize: 18,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'grey',
  },
  inputField: {
    fontSize: 16,
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
  otherOption: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherBtn: {
    margin: 0,
    marginLeft: 10,
  }
});

export default styles;