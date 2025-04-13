import { NwsApiAlertResponse } from "@/types/NwsApiAlertResponse";
import { WeatherAlert } from "@/types/WeatherAlert";
import axios from "axios";
import { GetServerSidePropsResult } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JSX } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ data }: { data: WeatherAlert[] }): JSX.Element {
  return (
    <main
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">
        Weather alerts
      </h1>
    </main>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    data: WeatherAlert[];
  }>
> {
  try {
    const response = await axios.get<NwsApiAlertResponse>(
      "https://api.weather.gov/alerts/active"
    );

    const alerts: WeatherAlert[] = response.data.features.map((feature) => {
      return {
        id: feature.id,
        type: feature.type,
        areaDescription: feature.properties?.areaDesc,
        category: feature.properties?.category,
        certainty: feature.properties?.certainty,
        description: feature.properties?.description,
        effective: feature.properties?.effective,
        expires: feature.properties?.expires,
        event: feature.properties?.event,
        headline: feature.properties?.headline,
        instruction: feature.properties?.instruction,
        messageType: feature.properties?.messageType,
        response: feature.properties?.response,
        senderName: feature.properties?.senderName,
        severity: feature.properties?.severity,
        statement: feature?.properties?.statement ?? "No statement",
        status: feature.properties?.status,
        urgency: feature.properties?.urgency,
      };
    });

    return {
      props: {
        data: alerts,
      },
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to fetch data");
  }
}
