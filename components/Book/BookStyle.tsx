import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 5,
    
    backgroundColor: '#adadad',
    minWidth: 240,
    width: '100%',
    padding: 15,
    marginBottom: 60
  },
  bookInfo: {

  }
  ,
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 19,
    color: 'white',
    alignItems: 'center',
  },
  title: {
    display: "flex",
    marginLeft: 10,
    width: 220
  },
  content: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  withoutTagText: {

  },
  menuBut: {
    position: 'absolute',
    top: '112%',
    left: '100%',
    backgroundColor: '#3276c3',
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delBut: {
    position: 'absolute',
    top: '112%',
    left: '0%',
    backgroundColor: '#3276c3',
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText:{
    color: 'white'
  }
})