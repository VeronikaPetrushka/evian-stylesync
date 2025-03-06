import { View } from "react-native"
import CreateLook from "../comp/CreateLook"

const CreateLookScreen = () => {
    return (
        <View style={styles.container}>
            <CreateLook />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateLookScreen;