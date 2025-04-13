import { FullWeatherAlert } from "@/types/FullWeatherAlert";
import { NwsApiAlertFeature } from "@/types/NwsApiAlertResponse";

export const mapWeatherAlert = (data: NwsApiAlertFeature): FullWeatherAlert => {
  return {
    id: data.id,
    areaDescription: data.properties?.areaDesc,
    certainty: data.properties?.certainty,
    effective: data.properties?.effective,
    event: data.properties?.event,
    expires: data.properties?.expires,
    instruction: data.properties?.instruction,
    messageType: data.properties?.messageType,
    response: data.properties?.response,
    severity: data.properties?.severity,
    status: data.properties?.status,
    urgency: data.properties?.urgency,
    type: data.type,
    category: data.properties?.category,
    description: data.properties?.description,
    headline: data.properties?.headline,
    senderName: data.properties?.senderName,
  };
};
