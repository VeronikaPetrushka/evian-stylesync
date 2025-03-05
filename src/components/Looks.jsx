import React, { useState, useCallback } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Dimensions, Modal, Image, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';

const { height } = Dimensions.get('window');

const Looks = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [wardrobe, setWardrobe] = useState([]);
    const [looks, setLooks] = useState([]);

    useFocusEffect(
        useCallback(() => {
          fetchWardrobe();
          fetchLooks();
        }, [])
      );

      const fetchWardrobe = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('wardrobe');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setWardrobe(items);
                checkIncompleteOutfit(items);
            }
        } catch (error) {
            console.error("Failed to load wardrobe:", error);
        }
    };

    const fetchLooks= async () => {
        try {
            const storedItems = await AsyncStorage.getItem('looks');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setLooks(items);
            }
        } catch (error) {
            console.error("Failed to load your looks:", error);
        }
    };

    const checkIncompleteOutfit = (items) => {
        const types = ['OUTWEAR', 'TOPS', 'BOTTOMS'];
        const missingType = types.find(type => !items.some(item => item.type === type));
        
        if (missingType) {
            setIsModalVisible(true);
        }
    };

    const closeModalAndGoBack = () => {
        setIsModalVisible(false);
        navigation.navigate('WardrobeScreen');
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={styles.title}>CREATE YOUR LOOK</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CreateLookScreen')}>
                        <Text style={styles.addBtnText}>ADD +</Text>
                    </TouchableOpacity>
                </View>

                {
                    looks.length > 0 && (
                        <ScrollView style={{width: '100%'}}>
                            {
                                looks.map((look, index) => (
                                    <View key={index} style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 12, borderRadius: 13}}>
                                        {look.visibleItems.OUTWEAR && (
                                            <Image
                                                source={{ uri: look.visibleItems.OUTWEAR.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}

                                        {look.visibleItems.TOPS && (
                                            <Image
                                                source={{ uri: look.visibleItems.TOPS.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}

                                        {look.visibleItems.BOTTOMS && (
                                            <Image
                                                source={{ uri: look.visibleItems.BOTTOMS.image }}
                                                style={{width: 100, height: 100, resizeMode: 'cover', borderRadius: 13}}
                                            />
                                        )}
                                    </View>
                                ))
                            }
                            <View style={{height: 100}} />
                        </ScrollView>
                    )
                }

                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={closeModalAndGoBack}
                >
                    <BlurView
                        style={styles.modalBackground}
                        intensity={10}
                        tint="light"
                    />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Incomplete Outfit!</Text>
                            <Text style={styles.modalText}>You haven’t added enough items to create a full look. Add more pieces to complete your outfit.</Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={closeModalAndGoBack}>
                                <Text style={styles.modalBtnText}>Back to Wardrobe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.07,
        padding: 24,
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 29,
        color: '#fff',
    },

    row: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         marginBottom: 32
    },

    addBtn: {
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    addBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17,
        color: '#fff',
    },

    typeBtn: {
        width: '33%',
        backgroundColor: '#1c1c1c',
        borderRadius: 60,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    typeBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#ababab',
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
        width: '96%',
        borderRadius: 100,
        backgroundColor: '#efe9dd',
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },

    cardName: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.4,
        color: '#1c1c1c',
    },

    modalBackground: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },

    modalContent: {
        width: 273,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 14,
        paddingTop: 16,
        alignItems: 'center'
    },

    modalTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
        width: '90%',
        textAlign: 'center'
    },

    modalText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 16,
        textAlign: 'center',
        width: '90%'
    },

    modalBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 11,
        borderTopColor: '#fff',
        borderTopWidth: 0.2
    },

    modalBtnText: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
    }

})

export default Looks;