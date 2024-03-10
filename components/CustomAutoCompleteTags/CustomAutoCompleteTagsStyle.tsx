import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    tagContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#7c7777',
        padding: 2,
        backgroundColor: '#d0d0d0f5',
        shadowRadius: .6,
        shadowColor: '#00000063',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.13,
        elevation: 5,
    },
    tag: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1b8ed0',
        borderRadius: 20,
        padding: 5,
        margin: 5,
    },
    tagText: {
        color: 'white',
        maxWidth: 220,
    },
    delIcon: {
        display: 'flex',
        alignItems: 'center',
        color: '#5e5e5e',
        marginLeft: 5,
        fontSize: 16,
        width: 15,
    },
    cont: {
        position: 'relative',
        display: "flex",
        alignItems: 'center',
        marginBottom: 5,
    },
    suggestionList: {
        position: 'absolute',
        top: '100%',
        maxHeight: 139,
        overflowY: 'scroll',
        zIndex: 1,
        elevation: 7,
        backgroundColor: 'grey',
        width: '96%',
        paddingHorizontal: 7
    },
    tagInput: {
        // backgroundColor: '#dededede',
        width: '100%',
    },
    withoutTagInput: {
        height: 50,
        marginBottom: 5,
        padding: 4
    },
    options: {
        marginTop: 7
    },
    text: {
        fontSize: 20
    }
})