import { Platform } from 'react-native'
export default {

    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    userpiccontainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#A0A0A0'
    },

    picinnercontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    userimage: {
        width: 70,
        height: 70,
        borderRadius: 35
    },

    cameracontainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    camerapic: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 15,
        bottom: 3
    },

    username: {
        marginVertical: 10,
    },

    usertxt: {
        textAlign: 'center',
        fontFamily: 'proximanova-bold',
        fontSize: 18
    },

    usertxt2: {
        textAlign: 'center',
        fontFamily: 'proximanova-regular',
        fontSize: 12,
        color: '#a537fd',
        paddingVertical: 5,
    }
}