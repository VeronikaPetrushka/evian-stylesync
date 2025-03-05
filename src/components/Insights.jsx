import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const Insights = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>STYLE INSIGHTS & FASHION TIPS</Text>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#000'
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
    },

})

export default Insights;