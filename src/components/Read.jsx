import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, ImageBackground, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Read = ({ insight }) => {
    const navigation = useNavigation();

    const shareInsight = async () => {
        try {
            const formattedDescription = insight.description.join('\n\n');
    
            const shareOptions = {
                title: insight.title,
                message: `${insight.title}\n\n${formattedDescription}`,
            };
    
            await Share.share(shareOptions);
        } catch (error) {
            console.error("Error sharing insight:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#1c1c1c'}]} onPress={() => navigation.goBack('')}>
                        <Icons type={'back'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#fff'}]} onPress={shareInsight}>
                        <Icons type={'share'} />
                    </TouchableOpacity>
                </View>

                <Image source={insight.image} style={styles.image} />  

                <Text style={styles.title}>{insight.title}</Text>    

                <ScrollView style={{width: '100%'}}>
                    {
                        insight.description.map((desc, i) => (
                            <Text key={i} style={styles.description}>{desc}</Text>
                        ))
                    }      
                    <View style={{height: 50}} />
                </ScrollView>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },

    row: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         position: 'absolute',
         top: height * 0.07,
         zIndex: 10
    },

    actionBtn: {
        width: 72,
        height: 72,
        padding: 24,
        borderRadius: 100,
    },

    image: {
        width: width,
        height: height * 0.5,
        resizeMode: 'cover',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        marginBottom: 24
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 32
    },

    description: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        color: '#fff',
        marginBottom: 12
    }

})

export default Read;