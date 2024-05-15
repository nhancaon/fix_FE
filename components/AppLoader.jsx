import React from 'react';
import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

const AppLoader = () => {
    console.log("Rendering AppLoader"); // Add this line for debugging
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../assets/images/loading.json')} autoPlay loop />
        </View>
    );
};

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1,
    }
});
export default AppLoader;