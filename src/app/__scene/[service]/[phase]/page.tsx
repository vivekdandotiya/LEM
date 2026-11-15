import React from 'react';
import { SeoScene } from '@/components/process/scenes/SeoScene';
import { MetaScene } from '@/components/process/scenes/MetaScene';
import { SocialScene } from '@/components/process/scenes/SocialScene';
import { WebScene } from '@/components/process/scenes/WebScene';

export const metadata = {
  title: 'Internal Scene Record Canvas',
  robots: {
    index: false,
    follow: false,
  },
};

interface ScenePageProps {
  params: Promise<{
    service: string;
    phase: string;
  }>;
}

export function generateStaticParams() {
  const services = ['seo', 'ppc', 'meta-ads', 'social-media', 'web-development'];
  const phases = ['0', '1', '2', '3'];
  const params: Array<{ service: string; phase: string }> = [];

  for (const service of services) {
    for (const phase of phases) {
      params.push({ service, phase });
    }
  }

  return params;
}

export default async function SceneRecordPage({ params }: ScenePageProps) {
  const { service, phase } = await params;
  const phaseIndex = Math.max(0, Math.min(3, parseInt(phase, 10) || 0));

  const renderScene = () => {
    switch (service) {
      case 'seo':
        return <SeoScene activePhase={phaseIndex} isStatic={false} />;
      case 'ppc':
      case 'meta-ads':
        return <MetaScene activePhase={phaseIndex} isStatic={false} />;
      case 'social-media':
        return <SocialScene activePhase={phaseIndex} isStatic={false} />;
      case 'web-development':
        return <WebScene activePhase={phaseIndex} isStatic={false} />;
      default:
        return <SeoScene activePhase={phaseIndex} isStatic={false} />;
    }
  };

  return (
    <div
      style={{
        width: '1920px',
        height: '1200px',
        backgroundColor: '#080A0B',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        margin: 0,
      }}
    >
      {/* Background Dot Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: 'radial-gradient(circle, #EEEBE3 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {renderScene()}
      </div>
    </div>
  );
}
