
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { type StackScreenProps} from "@react-navigation/stack";

export type ParkingsStackParamsList = {
    parkingsList: undefined;
    parkingDetails: {
        data: Parking
    };
    addParking: undefined;
}

export type AuthStackParamsList = {
    login: undefined;
    register: undefined
}

export type ParkingsTabParamsList = {
    parkings: undefined;
    favorites: undefined;
    parkingsMap: undefined;
    parkingsSettings: undefined
}

export type ParkingsDrawerParamsList = {
    about: undefined;
    camera: undefined;
    sensors: undefined;
    images: undefined;
    counter: undefined;
    settings: undefined;
}


export type ParkingsStackNavProps<T extends keyof ParkingsStackParamsList> = StackScreenProps<ParkingsStackParamsList, T>
export type AuthStackNavProps<T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>
export type ParkingsTabNavProps<T extends keyof ParkingsTabParamsList> = BottomTabScreenProps<ParkingsTabParamsList, T>
export type ParkingsDrawerNavProps<T extends keyof ParkingsDrawerParamsList> = DrawerScreenProps<ParkingsDrawerParamsList, T>
declare global {
    namespace ReactNavigation {
        interface RootParamList extends ParkingsStackParamsList, AuthStackParamsList, ParkingsTabParamsList, ParkingsDrawerParamsList {}
    }
}