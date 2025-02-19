import axios from 'axios';
import * as Loc from "expo-location";
import { GetCurrentLocation } from '../components/IndexComponents/HomeComponent/GetCurrentLocation';
import { getToken } from '../helpers/Token';
import { getUser } from '../helpers/user'

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";


export async function getRides(filters) {
    const token = await getToken()
    try {
        const request = await axios.post(`${API_URL}/rides/filter`, filters, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return [request, null];
    } catch (e) {
        console.log(e);
        return [null, e.message];
    }
}

export async function getRidesAroundUser() {
    try {
        const token = await getToken();
        const location = await Loc.getCurrentPositionAsync({ enableHighAccuracy: true });
        const { latitude, longitude } = location.coords;
        const request = await axios.get(
            `${API_URL}/rides/around/user?latitude=${latitude}&longitude=${longitude}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return [request, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function getRideOfCurrentUserAsPassenger() {
    const user = getUser()
    const token = await getToken()
    try {
        const request = await axios.get(
            `${API_URL}/rides/of-user/as-passenger`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    }
    catch (e) {
        return [null, e.message];
    }
}

export async function getRideOfCurrentUserAsDriver() {
    const token = await getToken();
    try {
        const request = await axios.get(
            `${API_URL}/rides/of-user/as-driver`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function getRequestList(rideId) {
    const token = await getToken();
    try {
        const request = await axios.get(
            `${API_URL}/rides/${rideId}/request`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function requestAccept(rideId,passengerId) {
    const token = await getToken();
    try {
        const request = await axios.post(
            `${API_URL}/rides/${rideId}/request/accept`,
            {passengerId},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        // console.log(request.data)
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function requestReject(rideId, passengerId) {
    const token = await getToken();
    try {
        debugger;
        const request = await axios.post(
            `${API_URL}/rides/${rideId}/request/reject`,
            {passengerId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
            
        );
        debugger
        return [request.data, null];
        debugger
    } catch (e) {
        return [null, e.message];
    }
}

export async function getRideById(rideId) {
    const token = await getToken();
    try {
        const request = await axios.get(`${API_URL}/rides/${rideId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function sendRideRequest(rideId, stopId="") {
    const token = await getToken();
    try {
        const request = await axios.post(
            `${API_URL}/rides/${rideId}/request`,
            {
                stopId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function removeRideRequest(rideId) {
    const token = await getToken();
    try {
        const request = await axios.delete(
            `${API_URL}/rides/${rideId}/request`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function markPresent(paymentDetails, rideDetails) {
    const token = await getToken();
    const { _id: rideId } = rideDetails;
    try {
        const request = await axios.post(
            `${API_URL}/rides/${rideId}/mark-present`,
            {
                paymentDetails, rideDetails
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}