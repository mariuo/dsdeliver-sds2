import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { fetchOrders } from '../api'
import { Order } from '../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';

function Orders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = () => {
        setIsloading(true);
        fetchOrders()
            .then(response => setOrders(response.data))
            .catch(error => Alert.alert('Houve um erro ao buscar os pedidos!'))
            .finally(() => setIsloading(false));
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails', {
            order
        });
    }

    return (
        <>
            <Header />
            <ScrollView style={style.container}>
                {isLoading ? (
                    <Text>Buscando pedidos...</Text>
                ) : (
                        orders.map(order => (
                            <TouchableWithoutFeedback key={order.id} onPress={() => handleOnPress(order)} >
                                <OrderCard order={order} />
                            </TouchableWithoutFeedback>
                        ))
                    )}
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%',

    }
})
export default Orders;