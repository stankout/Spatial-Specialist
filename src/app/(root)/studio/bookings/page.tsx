import {
  FeatureBadge,
  StudioPlatformPage,
  StudioRecordTable,
} from "@/components/studio-platform";
import { featureFlags, platformConfig } from "@/data/platform.config";
import { LocalBookingRepository } from "@/lib/booking/repository";
import { LocalServiceRequestRepository } from "@/lib/service-requests/repository";

export default async function Page() {
  const [bookings, knowledgeRequests] = await Promise.all([
    new LocalBookingRepository().list(),
    new LocalServiceRequestRepository().list(),
  ]);

  return (
    <StudioPlatformPage
      active="bookings"
      eyebrow="Manual scheduling ready"
      title="Bookings"
      description="Booking requests remain requests until the owner or a configured scheduling provider confirms availability."
    >
      <div className="studio-feature-strip">
        <FeatureBadge enabled={featureFlags.consultationBookingEnabled}>
          Consultation booking
        </FeatureBadge>
        <span>Provider · {platformConfig.providers.scheduling}</span>
      </div>
      <h2 className="studio-section-title">Appointment requests</h2>
      <StudioRecordTable
        headings={["Service", "Contact", "Requested", "Status"]}
        empty="No booking requests have been stored locally."
        rows={bookings.map((booking) => [
          booking.serviceKey,
          booking.contact.email,
          new Date(booking.requestedAt).toLocaleString("en-US"),
          booking.status,
        ])}
      />
      <h2 className="studio-section-title">Knowledge requests</h2>
      <StudioRecordTable
        headings={["Type", "Contact", "Created", "Status"]}
        empty="No paid-question or video-answer requests have been stored locally."
        rows={knowledgeRequests.map((request) => [
          request.type,
          request.contact.email,
          new Date(request.createdAt).toLocaleString("en-US"),
          request.status,
        ])}
      />
    </StudioPlatformPage>
  );
}
