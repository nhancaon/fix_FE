import React from 'react';
import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { images } from "../constants";

const AppLoader = () => {
    const loadingAnimation = require('../assets/images/loading.json');
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={loadingAnimation} autoPlay loop style={styles.loading}/>
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
    },
    loading: {
        width: 130,
        height: 130,
    },
});
export default AppLoader;