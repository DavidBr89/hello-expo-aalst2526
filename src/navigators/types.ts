
import { type StackScreenProps} from "@react-navigation/stack";

export type ParkingsStackParamsList = {
    parkingsList: undefined;
    parkingDetails: {
        data: Parking
    };
    parkingsMap: undefined;
}

export type ParkingsStackNavProps<T extends keyof ParkingsStackParamsList> = StackScreenProps<ParkingsStackParamsList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends ParkingsStackParamsList {}
    }
}