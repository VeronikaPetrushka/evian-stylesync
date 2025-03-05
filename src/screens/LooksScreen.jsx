import { View } from "react-native"
import Looks from "../components/Looks"
import Nav from "../components/Nav";

const LooksScreen = () => {
    return (
        <View style={styles.container}>
            <Looks />
            <View style={styles.nav}>
                <Nav />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    nav: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
    }
}

export default LooksScreen;