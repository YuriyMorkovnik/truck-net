export const parseData = data => JSON.parse(JSON.stringify(data));

export const getHours = count => `${count} h`;

export const selectOrigins = rides => {
    const arrayOfOrigins = rides.map(item => item.originName);
    return [...new Set(arrayOfOrigins)];
};

export const filterRidesList = ({ ridesList, filterValues }) => {
    const { vehicleType, origin } = filterValues;
    const filteredByVehicleType = vehicleType !== ''
        ? ridesList.filter(({ vehicleTypeId }) => vehicleTypeId === vehicleType)
        : ridesList;
    return origin !== ''
        ? filteredByVehicleType.filter(({ originName }) => originName.toLowerCase().includes(origin.toLowerCase()))
        : filteredByVehicleType;
};
