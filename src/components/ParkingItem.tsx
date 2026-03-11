import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface ParkingItemProps {
  parking: Parking;
  onPress: () => void;
}

const getOccupancyValue = (parking: Parking) => {
  if (parking.occupation > 0) {
    return Math.min(100, Math.max(0, Math.round(parking.occupation)));
  }

  if (parking.totalcapacity <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((parking.totalcapacity - parking.availablecapacity) /
          parking.totalcapacity) *
          100,
      ),
    ),
  );
};

const getOccupancyColor = (occupancy: number) => {
  if (occupancy >= 85) {
    return "bg-rose-500";
  }

  if (occupancy >= 60) {
    return "bg-amber-500";
  }

  return "bg-emerald-500";
};

const ParkingItem = ({ parking, onPress }: ParkingItemProps) => {
  const occupancy = getOccupancyValue(parking);
  const occupancyColor = getOccupancyColor(occupancy);
  const isOpen = parking.isopennow === 1 && parking.temporaryclosed !== 1;
  const isFree = parking.freeparking === 1;
  const hasPlaces = parking.availablecapacity > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <View className="mb-3 flex-row items-start justify-between">
        <View className="mr-3 flex-1 flex-row items-center gap-2">
          <MaterialCommunityIcons name="parking" size={18} color="#0f172a" />
          <Text
            className="flex-1 text-base font-semibold text-slate-900"
            numberOfLines={2}>
            {parking.name}
          </Text>
        </View>
        <View
          className={`flex-row items-center gap-1 rounded-full px-3 py-1 ${isOpen ? "bg-emerald-100" : "bg-rose-100"}`}>
          <View
            className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-500" : "bg-rose-500"}`}
          />
          <Text
            className={`text-xs font-semibold ${isOpen ? "text-emerald-700" : "text-rose-700"}`}>
            {isOpen ? "Open" : "Gesloten"}
          </Text>
        </View>
      </View>

      <View className="mb-3 flex-row gap-2">
        <View className="flex-row items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <MaterialCommunityIcons name="garage" size={14} color="#334155" />
          <Text className="text-xs font-medium text-slate-700">
            {parking.type || "Parking"}
          </Text>
        </View>
        {isFree && (
          <View className="flex-row items-center gap-1 rounded-full bg-sky-100 px-3 py-1">
            <MaterialCommunityIcons
              name="cash-remove"
              size={14}
              color="#0369a1"
            />
            <Text className="text-xs font-medium text-sky-700">Gratis</Text>
          </View>
        )}
      </View>

      <View className="mb-2 flex-row items-end justify-between">
        <View className="flex-row items-center gap-1">
          <Feather name="map-pin" size={14} color="#64748b" />
          <Text className="text-sm text-slate-500">Vrije plaatsen</Text>
        </View>
        <Text
          className={`text-lg font-bold ${hasPlaces ? "text-slate-900" : "text-rose-600"}`}>
          {parking.availablecapacity}
        </Text>
      </View>

      <View className="mb-1 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <View
          className={`h-2 rounded-full ${occupancyColor}`}
          style={{ width: `${occupancy}%` }}
        />
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <MaterialCommunityIcons
            name="chart-donut"
            size={14}
            color="#64748b"
          />
          <Text className="text-xs text-slate-500">Bezetting</Text>
        </View>
        <Text className="text-xs font-semibold text-slate-700">
          {occupancy}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParkingItem;
