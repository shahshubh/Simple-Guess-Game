import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = (props) => (
    <Text style={styles.body}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default TitleText;
