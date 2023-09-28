import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

interface ISpinner {
    visible: boolean;
    spinnerContent: string;
}

const LoadingSpinner = ({ visible, spinnerContent }: ISpinner) => {
    return (
        <View>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={visible}
                //Text with the Spinner
                textContent={spinnerContent}
                //Text style of the Spinner Text
                // textStyle={styles.spinnerTextStyle}
            />
            {/* <Text style={{ textAlign: 'center', fontSize: 20 }}>
                Spinner Overlay Example
            </Text> */}
        </View>
    );
};

export default LoadingSpinner;
