import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const CreateLook = () => {
    const navigation = useNavigation();
    const [wardrobe, setWardrobe] = useState([]);
    const [visibleItems, setVisibleItems] = useState({
        OUTWEAR: null,
        TOPS: null,
        BOTTOMS: null
    });

    useFocusEffect(
        useCallback(() => {
          fetchWardrobe();
        }, [])
      );

      const fetchWardrobe = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('wardrobe');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setWardrobe(items);
                setInitialVisibleItems(items);
            }
        } catch (error) {
            console.error("Failed to load wardrobe:", error);
        }
    };

    const setInitialVisibleItems = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
            acc[item.type].push(item);
            return acc;
        }, {});

        const initialItems = {};

        ['OUTWEAR', 'TOPS', 'BOTTOMS'].forEach((type) => {
            if (groupedItems[type] && visibleItems[type] === null) {
                initialItems[type] = groupedItems[type][0];
            }
        });

        setVisibleItems(prev => ({ ...prev, ...initialItems }));
    };

    const groupedItems = wardrobe.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
    }, {});

    const handleScroll = (type, event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = width - width * 0.19;
        const index = Math.floor(contentOffsetX / itemWidth);

        const visibleItem = groupedItems[type][index];

        setVisibleItems((prevState) => ({
            ...prevState,
            [type]: visibleItem,
        }));
    };

    const createLook = async () => {
        try {
            const finalVisibleItems = { ...visibleItems };
            ['OUTWEAR', 'TOPS', 'BOTTOMS'].forEach((type) => {
                if (!finalVisibleItems[type] && groupedItems[type]) {
                    finalVisibleItems[type] = groupedItems[type][0];
                }
            });

            const lookObject = { visibleItems: finalVisibleItems };
    
            const existingLooks = await AsyncStorage.getItem('looks');
            const updatedLooks = existingLooks ? [...JSON.parse(existingLooks), lookObject] : [lookObject];
    
            await AsyncStorage.setItem('looks', JSON.stringify(updatedLooks));
    
            navigation.goBack('');
        } catch (error) {
            console.error("Failed to save look:", error);
        }
    };

    return (
        <ImageBackground source={require('../assts/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.generateBtn} onPress={createLook}>
                        <Text style={styles.generateBtnText}>✨ GENERATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.goBack('')}>
                        <Icons type={'close'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    {['OUTWEAR', 'TOPS', 'BOTTOMS'].map((type) => (
                        groupedItems[type] ? (
                            <ScrollView 
                                key={type} 
                                horizontal 
                                showsHorizontalScrollIndicator={false} 
                                style={styles.scrollContainer}
                                onScroll={(event) => handleScroll(type, event)}
                            >
                                {groupedItems[type].map((item, index) => (
                                    <Image source={{ uri: item.image }} key={index} style={styles.itemImage} />
                                ))}
                            </ScrollView>
                        ) : null
                    ))}
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

    generateBtn: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 60,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },

    generateBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#A59E89',
    },

    row: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         marginBottom: 27
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
    },

    addBtn: {
        width: 72,
        height: 72,
        padding: 24,
        borderRadius: 100,
        backgroundColor: '#1c1c1c',
    },

    scrollContainer: {
        width: '100%',
        height: 310,
        marginBottom: 10
    },

    itemImage: {
        width: width - width * 0.19,
        height: 300,
        borderRadius: 30,
        resizeMode: 'cover',
        margin: 10,
    },

})

export default CreateLook;