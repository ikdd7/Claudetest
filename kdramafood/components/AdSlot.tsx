interface AdSlotProps {
  slotId: string;
  className?: string;
}

export default function AdSlot({ slotId, className = "" }: AdSlotProps) {
  return (
    // Replace with Google AdSense code
    <div
      data-ad-slot={slotId}
      className={`w-full bg-[#141414] border border-[#2A2A2A] border-dashed rounded-sm flex items-center justify-center min-h-[90px] text-[#2A2A2A] text-xs ${className}`}
    >
      Advertisement
    </div>
  );
}
