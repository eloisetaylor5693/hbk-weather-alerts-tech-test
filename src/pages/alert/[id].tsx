import { GetServerSideProps } from "next";
import axios from "axios";
import { FullWeatherAlert } from "@/types/FullWeatherAlert";
import { mapWeatherAlert } from "@/utils/mapWeatherAlert";

interface AlertDetailsProps {
  alertData: FullWeatherAlert;
}

export default function AlertDetails({ alertData }: AlertDetailsProps) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{alertData.headline}</h1>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <strong>Type:</strong> {alertData.type}
        </div>
        <div>
          <strong>Category:</strong> {alertData.category}
        </div>
        <div>
          <strong>Area:</strong> {alertData.areaDescription}
        </div>
        <div>
          <strong>Sender:</strong> {alertData.senderName}
        </div>
        <div>
          <strong>Message Type:</strong> {alertData.messageType}
        </div>
        <div suppressHydrationWarning>
          <strong>Expires:</strong>{" "}
          {new Date(alertData.expires).toLocaleString()}
        </div>
        <div>
          <strong>Description:</strong>
          <p className="whitespace-pre-wrap mt-2">{alertData.description}</p>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const encodedUrl = context.params?.id as string;
    const alertUrl = decodeURIComponent(encodedUrl);

    const response = await axios.get(alertUrl);

    return {
      props: {
        alertData: mapWeatherAlert(response.data),
      },
    };
  } catch (error) {
    console.error("Failed to fetch alert details:", error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
