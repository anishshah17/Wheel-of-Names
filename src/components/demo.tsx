import ShaderShowcase from '@/components/ui/hero';

interface DemoOneProps {
  mitigatedCount: number;
  onPrimaryAction?: () => void;
  riskCount: number;
}

export default function DemoOne({
  mitigatedCount,
  onPrimaryAction,
  riskCount,
}: DemoOneProps) {
  return (
    <div className="min-h-screen h-full w-full">
      <ShaderShowcase
        mitigatedCount={mitigatedCount}
        onPrimaryAction={onPrimaryAction}
        riskCount={riskCount}
      />
    </div>
  );
}
