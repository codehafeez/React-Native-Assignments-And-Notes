import { Platform } from 'react-native'
export default {

    textcontainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 25
    },

    iconcontainer: {
        justifyContent: 'center',
        paddingLeft: 3,
        flex:1
    },

    textinputname: {
        justifyContent: 'center',
        borderBottomColor: '#A0A0A0',
        borderBottomWidth: 0.5,
        flex: 9
    },

    textinputtxt: {
        fontSize: 15,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontStyle: 'italic',
    }
}