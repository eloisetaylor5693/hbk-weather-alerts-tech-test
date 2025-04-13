/** National Weather Service API alert response */
export interface NwsApiAlertResponse {
  id: string;
  type: string;
  features: NwsApiAlertFeature[];
}

interface NwsApiAlertFeature {
  id: string;
  type: string;
  geometry: unknown;
  properties: NwsApiAlertProperties;
}

interface NwsApiAlertProperties {
  areaDesc: string;
  category: string;
  certainty: string;
  description: string;
  effective: string;
  expires: string;
  event: string;
  headline: string;
  instruction: string;
  messageType: string;
  response: string;
  senderName: string;
  severity: string;
  statement?: string;
  status: string;
  urgency: string;
}
