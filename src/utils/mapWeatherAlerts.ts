import { BasicWeatherAlert } from "@/types/BasicWeatherAlert";
import { NwsApiAlertResponse } from "@/types/NwsApiAlertResponse";

export const mapWeatherAlerts = (
  data: NwsApiAlertResponse
): BasicWeatherAlert[] => {
  return data.features.map((feature) => {
    return {
      id: feature.id,
      areaDescription: feature.properties?.areaDesc,
      certainty: feature.properties?.certainty,
      effective: feature.properties?.effective,
      event: feature.properties?.event,
      expires: feature.properties?.expires,
      instruction: feature.properties?.instruction,
      messageType: feature.properties?.messageType,
      response: feature.properties?.response,
      severity: feature.properties?.severity,
      status: feature.properties?.status,
      urgency: feature.properties?.urgency,
    };
  });
};
