import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

    modalContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        maxWidth: 300,
        backgroundColor: '#fbfbfb',
        padding: 20,
        fontSize: 30,
        minWidth: 300,
        minHeight: 300,
        justifyContent: 'space-between'
    },
    removeQuestionModal: {
        minHeight: 180,
    },
    fieldAndButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tagBut: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#edeaeacc',
        borderRadius: 15
    },
    header: {
        color: '#838383',
    }
})