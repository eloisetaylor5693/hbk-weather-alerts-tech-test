import WeatherGrid from "@/components/WeatherGrid";
import { BasicWeatherAlert } from "@/types/BasicWeatherAlert";
import { NwsApiAlertResponse } from "@/types/NwsApiAlertResponse";
import { mapWeatherAlerts } from "@/utils/mapWeatherAlerts";
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

export default function Home({
  data,
}: {
  data: BasicWeatherAlert[];
}): JSX.Element {
  return (
    <main
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">
        Weather alerts
      </h1>
      <WeatherGrid data={data} />
    </main>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    data: BasicWeatherAlert[];
  }>
> {
  try {
    const response = await axios.get<NwsApiAlertResponse>(
      "https://api.weather.gov/alerts/active?status=actual"
    );

    return {
      props: {
        data: mapWeatherAlerts(response.data),
      },
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to fetch data");
  }
}
