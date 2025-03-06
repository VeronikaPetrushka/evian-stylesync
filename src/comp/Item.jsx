import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const AddItem = ({ item }) => {
    const navigation = useNavigation();
    const [wardrobe, setWardrobe] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchWardrobe = async () => {
            try {
                const storedWardrobe = await AsyncStorage.getItem('wardrobe');
                if (storedWardrobe) {
                    setWardrobe(JSON.parse(storedWardrobe));
                }
            } catch (error) {
                console.log('Error fetching wardrobe:', error);
            }
        };
        fetchWardrobe();
    }, []);

    const confirmDelete = () => {
        const updatedWardrobe = wardrobe.filter((storedItem) => storedItem.id !== item.id);

        AsyncStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe))
            .then(() => {
                setWardrobe(updatedWardrobe);
                navigation.goBack();
            })
            .catch((error) => console.log('Error deleting item:', error));
    };

    return (
            <View style={styles.container}>

                <View style={styles.row}>
                    <Text style={styles.title}>ITEM</Text>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.deleteBtnText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack('')}>
                        <Icons type={'close'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    <Image source={{uri: item.image}} style={styles.image} />

                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.color}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.type}</Text>
                    </View>
                </ScrollView>

                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <BlurView
                        style={styles.modalBackground}
                        intensity={10}
                        tint="light"
                    />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete This Item?</Text>
                            <Text style={styles.modalText}>Are you sure you want to remove this item from your wardrobe? This action cannot be undone.</Text>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopColor: '#fff', borderTopWidth: 0.2 }}>
                                <TouchableOpacity style={[styles.modalBtn, {borderRightColor: '#fff', borderRightWidth: 0.2}]} onPress={() => setIsModalVisible(false)}>
                                    <Text style={[styles.modalBtnText, {fontWeight: '600', color: '#a59e89'}]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalBtn} onPress={confirmDelete}>
                                    <Text style={[styles.modalBtnText, {fontWeight: '400', color: '#fff'}]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
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


    deleteBtn: {
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    deleteBtnText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17,
        color: '#fff',
    },

    closeBtn: {
        width: 72,
        height: 72,
        padding: 24,
        borderRadius: 100,
        backgroundColor: '#1c1c1c',
    },

    image: {
        width: 310,
        height: 310,
        borderRadius: 60,
        resizeMode: 'cover',
        marginBottom: 32,
        alignSelf: 'center'
    },

    item: {
        width: '100%',
        backgroundColor: '#1c1c1c',
        borderRadius: 60,
        padding: 24,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    itemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
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
        width: '50%',
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBtnText: {
        fontSize: 17,
        lineHeight: 22
    }

})

export default AddItem;