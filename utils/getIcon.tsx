import {
    Feather,
    Ionicons,
    FontAwesome5,
    MaterialIcons,
} from '@expo/vector-icons';

const getIcon = (amenity: AmenityProps['amenity']) => {
    switch (amenity) {
        case 'map':
            return <Feather name="map" size={29} color="black" />;
        case 'toilets':
            return <FontAwesome5 name="toilet" size={29} color="black" />;
        case 'drinking_water':
            return <Ionicons name="water-outline" size={29} color="black" />;
        case 'bench':
            return (
                <MaterialIcons
                    name="airline-seat-legroom-reduced"
                    size={29}
                    color="black"
                />
            );
        case 'waste_disposal':
            return <FontAwesome5 name="trash" size={29} color="black" />;
        case 'shower':
            return <FontAwesome5 name="shower" size={29} color="black" />;
        default:
            return null;
    }
};

export default getIcon;
