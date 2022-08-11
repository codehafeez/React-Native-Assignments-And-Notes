import { Platform } from 'react-native'
export default {

    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    buttoncontainer: {
        marginHorizontal: 60,
        justifyContent: 'flex-end',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 80
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: 'black',
        paddingVertical: 15,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },

    buttoncontainer1: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: 'white',
        borderWidth: 2,
        marginHorizontal: 60,
        marginBottom: 60,
        borderRadius: 80
    },

    footer: {
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent:'center',
        alignItems: 'center',
    },

    footertxt: {
        color: 'white',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    }
}