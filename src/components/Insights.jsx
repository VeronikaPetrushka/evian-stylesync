import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";
import insights from '../constants/insights';

const { height } = Dimensions.get('window');

const Insights = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>STYLE INSIGHTS & FASHION TIPS</Text>

                <ScrollView style={{width: '100%'}} contentContainerStyle={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    {
                        insights.map((insight, index) => (
                            <View style={styles.card} key={index}>
                                <Image source={insight.image} style={styles.cardImage} />
                                <TouchableOpacity style={styles.cardBtn} onPress={() => navigation.navigate('ReadScreen', {insight: insight})}>
                                    <Text style={styles.cardTitle}>{insight.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    <View style={{height: 100, width: '100%'}} />
                </ScrollView>

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
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 32
    },

    card: {
        width: '47%',
        height: 206,
        marginBottom: 16,
        borderRadius: 30,
        overflow: 'hidden'
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    cardBtn: {
        width: '97%',
        borderRadius: 100,
        backgroundColor: '#efe9dd',
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },

    cardTitle: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.4,
        color: '#1c1c1c',
        textAlign: 'center'
    },

})

export default Insights;