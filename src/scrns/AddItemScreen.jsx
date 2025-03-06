import { View } from "react-native"
import AddItem from "../comp/AddItem"

const AddItemScreen = ({ route }) => {
    const { image } = route.params;

    return (
        <View style={styles.container}>
            <AddItem image={image} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddItemScreen;