import { ImageBackground, Text, View, TouchableOpacity, Linking, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";

const Intro = () => {
    const navigation = useNavigation();

    const termsOfUse = () => {
        const url = "https://www.termsfeed.com/live/80eba861-b421-489f-9c5c-9d350f4318b8";
        Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
    };

    return (
        <ImageBackground source={require('../assts/loaders/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>YOUR WARDROBE, PERFECTLY ORGANIZED</Text>
                
                <Text style={styles.text}>Effortlessly manage your clothing, create stylish outfits, and refine your personal style. From organizing your wardrobe to testing your fashion memory.</Text>
                
                <TouchableOpacity onPress={termsOfUse}>
                    <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Terms of use</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('WardrobeScreen')}>
                    <Text style={styles.btnText}>✨ LET'S GET STARTED</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        position: 'absolute',
        bottom: 70,
        paddingHorizontal: 24
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
        marginBottom: 16
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#fff',
        marginBottom: 16
    },

    btn: {
        marginTop: 16,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 60,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#A59E89',
    }

})

export default Intro;