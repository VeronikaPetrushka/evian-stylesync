import { View } from "react-native"
import Read from "../components/Read"

const ReadScreen = ({ route }) => {
    const { insight } = route.params;

    return (
        <View style={styles.container}>
            <Read insight={insight} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadScreen;