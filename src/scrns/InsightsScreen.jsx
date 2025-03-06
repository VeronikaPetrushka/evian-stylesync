import { View } from "react-native"
import Insights from "../comp/Insights"
import Nav from "../comp/Nav";

const InsightsScreen = () => {
    return (
        <View style={styles.container}>
            <Insights />
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

export default InsightsScreen;