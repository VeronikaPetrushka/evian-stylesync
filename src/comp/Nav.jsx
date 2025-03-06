import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Nav = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'WardrobeScreen' && {backgroundColor: '#fff'}]} 
                onPress={() => handleNavigate('WardrobeScreen')}>
                <Icons type={'1'} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'LooksScreen' && {backgroundColor: '#fff'}]} 
                onPress={() => handleNavigate('LooksScreen')}>
                <Icons type={'2'} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'InsightsScreen' && {backgroundColor: '#fff'}]} 
                onPress={() => handleNavigate('InsightsScreeen')}>
                <Icons type={'3'} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, activeButton === 'TestScreen' && {backgroundColor: '#fff'}]} 
                onPress={() => handleNavigate('TestScreeen')}>
                <Icons type={'4'} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 345,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#000',
        borderRadius: 100,
        padding: 2
    },
    
    button: {
        width: 72,
        height: 72,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#1c1c1c'
    },

});

export default Nav;
