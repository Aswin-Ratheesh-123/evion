import { useState, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { VerticalTimeline } from './components/VerticalTimeline';
import { TelemetryHUD } from './components/TelemetryHUD';
import { VehicleSwitcherModal } from './components/VehicleSwitcherModal';
import { StationBookingModal } from './components/StationBookingModal';
import { HeroSection } from './components/sections/HeroSection';
import { MilestonesJourney } from './components/MilestonesJourney';
import { Footer } from './components/sections/Footer';
import { VEHICLE_MODELS } from './data/mockData';
import type { MilestoneItem, VehicleModel } from './types';

export function App() {
  const [currentVehicle, setCurrentVehicle] = useState<VehicleModel>(VEHICLE_MODELS[0]);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [telemetry, setTelemetry] = useState({
    progress: 0,
    speedKmh: 0,
    batterySoc: 38,
    activeMilestoneIndex: 0,
    currentMilestone: null as MilestoneItem | null,
    isCharging: false,
  });

  const handleTelemetryUpdate = useCallback(
    (data: {
      progress: number;
      speedKmh: number;
      batterySoc: number;
      activeMilestoneIndex: number;
      currentMilestone: MilestoneItem | null;
      isCharging: boolean;
    }) => {
      setTelemetry(data);
    },
    []
  );

  const handleScrollToMilestone1 = () => {
    const el = document.getElementById('milestone-01');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMilestoneSelect = (ms: MilestoneItem) => {
    const el = document.getElementById(`milestone-${ms.number}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#050505] selection:bg-[#65D900] selection:text-black overflow-x-hidden">
      {/* Top Floating White Glass Navigation */}
      <Navigation
        currentVehicle={currentVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={handleScrollToMilestone1}
        onContactClick={() => setIsBookingModalOpen(true)}
      />

      {/* Vertical Electric Journey Timeline & Scroll-Driven EV Car */}
      <VerticalTimeline
        vehicle={currentVehicle}
        onTelemetryUpdate={handleTelemetryUpdate}
        onMilestoneClick={handleMilestoneSelect}
      />

      {/* The 8 Story Milestones */}
      <main className="relative z-10 pt-16">
        <MilestonesJourney
          activeMilestoneIndex={telemetry.activeMilestoneIndex}
          batterySoc={telemetry.batterySoc}
          isCharging={telemetry.isCharging}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
        />
      </main>

      {/* Modern Dark Footer */}
      <Footer />

      {/* Live Floating Telemetry Cockpit HUD */}
      <TelemetryHUD
        progress={telemetry.progress}
        speedKmh={telemetry.speedKmh}
        batterySoc={telemetry.batterySoc}
        activeMilestone={telemetry.currentMilestone}
        isCharging={telemetry.isCharging}
        vehicle={currentVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
        onSelectMilestone={handleMilestoneSelect}
      />

      {/* Vehicle Switcher Modal */}
      <VehicleSwitcherModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        currentVehicle={currentVehicle}
        onSelectVehicle={(veh) => setCurrentVehicle(veh)}
      />

      {/* Deployment / Consultation Booking Modal */}
      <StationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}

export default App;
