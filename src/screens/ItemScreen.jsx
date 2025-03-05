import { View } from "react-native"
import Item from "../components/Item"

const ItemScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Item item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ItemScreen;