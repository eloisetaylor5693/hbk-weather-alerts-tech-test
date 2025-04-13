import { BasicWeatherAlert } from "./BasicWeatherAlert";

export interface FullWeatherAlert extends BasicWeatherAlert {
  id: string;
  type: string;
  category: string;
  description: string;
  expires: string;
  headline: string;
  senderName: string;
}
