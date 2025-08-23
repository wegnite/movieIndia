'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CountdownManager,
  CountdownTimer,
  HeaderCountdownBanner,
  PricingUrgencyTimer,
  VideoPlayerOverlay,
  FestivalCountdown,
  generateCountdownConfig
} from '@/components/countdown';
import type { TimerType } from '@/components/countdown';

export default function CountdownShowcase() {
  const [selectedTimer, setSelectedTimer] = useState<TimerType>('flash-sale');
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const timerTypes: { type: TimerType; label: string; description: string }[] = [
    { type: 'flash-sale', label: '⚡ Flash Sale', description: '2-hour urgent countdown' },
    { type: 'daily-deal', label: '🌟 Daily Deal', description: 'Resets at midnight IST' },
    { type: 'limited-slots', label: '🔥 Limited Slots', description: 'Stock counter with urgency' },
    { type: 'festival', label: '🎉 Festival Offer', description: 'Indian festival specials' },
    { type: 'weekend', label: '🎬 Weekend Special', description: 'Friday to Sunday offers' },
    { type: 'early-bird', label: '🐦 Early Bird', description: 'Morning special prices' }
  ];

  const handleVideoDemo = () => {
    setIsVideoPlaying(true);
    setShowVideoOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowVideoOverlay(false);
    setIsVideoPlaying(false);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🎯 Countdown Timer System</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive countdown timer system designed for the Indian market with psychological urgency features, 
          festival awareness, and smart user segmentation.
        </p>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="banner">Header Banner</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Urgency</TabsTrigger>
          <TabsTrigger value="festival">Festival Offers</TabsTrigger>
          <TabsTrigger value="video">Video Overlay</TabsTrigger>
          <TabsTrigger value="manager">Full System</TabsTrigger>
        </TabsList>

        {/* Live Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Interactive Timer Demo</h2>
            
            {/* Timer Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {timerTypes.map(({ type, label, description }) => (
                <Card 
                  key={type}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTimer === type 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTimer(type)}
                >
                  <h3 className="font-semibold text-sm">{label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{description}</p>
                </Card>
              ))}
            </div>

            {/* Active Timer Display */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <CountdownTimer
                config={generateCountdownConfig(selectedTimer)}
                variant="card"
                size="md"
                urgency={{
                  stockRemaining: Math.floor(Math.random() * 30) + 10,
                  totalStock: 100,
                  viewersCount: Math.floor(Math.random() * 50) + 20,
                  lastPurchased: '5 minutes ago'
                }}
                onUserEngagement={() => console.log('User engaged with timer')}
              />
            </div>
          </Card>
        </TabsContent>

        {/* Header Banner Tab */}
        <TabsContent value="banner" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Header Countdown Banner</h2>
            <p className="text-gray-600 mb-6">
              Sticky banner that appears at the top of pages. Perfect for site-wide urgent offers.
            </p>
            
            <div className="border rounded-lg overflow-hidden">
              <HeaderCountdownBanner
                defaultType="flash-sale"
                showCloseButton={true}
              />
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Features:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Persistent across page refreshes (localStorage)</li>
                <li>• Auto-extends on user engagement</li>
                <li>• Closeable with user preference memory</li>
                <li>• Different timers for different user segments</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        {/* Pricing Urgency Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pricing Page Urgency</h2>
            <p className="text-gray-600 mb-6">
              Enhanced pricing section with multiple urgency indicators and dynamic stock counters.
            </p>
            
            <PricingUrgencyTimer
              timerType="flash-sale"
              originalPrice={299}
              currentPrice={99}
              currency="₹"
              nextPriceIncrease={199}
              stockRemaining={23}
              totalStock={100}
              showStockCounter={true}
              showViewersCount={true}
              showLastPurchased={true}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Psychological Elements:</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Scarcity (limited slots)</li>
                  <li>• Social proof (viewers count)</li>
                  <li>• Recent activity (last purchased)</li>
                  <li>• Loss aversion (price increase warning)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Indian Market Features:</h3>
                <ul className="text-orange-700 space-y-1">
                  <li>• Rupee (₹) currency display</li>
                  <li>• IST timezone awareness</li>
                  <li>• Family viewing messaging</li>
                  <li>• Festival-based offers</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Festival Offers Tab */}
        <TabsContent value="festival" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Festival & Special Offers</h2>
            <p className="text-gray-600 mb-6">
              Automatic detection of Indian festivals and cricket matches for targeted offers.
            </p>
            
            <div className="grid gap-6">
              <FestivalCountdown
                variant="card"
                showCricketSpecials={true}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FestivalCountdown variant="banner" />
                <FestivalCountdown variant="minimal" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">2025 Festival Calendar:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-purple-700">
                <div>🎊 Republic Day - Jan 26</div>
                <div>🎨 Holi - Mar 14</div>
                <div>🏏 IPL Season - Mar-May</div>
                <div>🌙 Eid - Mar 30</div>
                <div>🇮🇳 Independence Day - Aug 15</div>
                <div>🪔 Diwali - Oct 20</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Video Overlay Tab */}
        <TabsContent value="video" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Video Player Overlay</h2>
            <p className="text-gray-600 mb-6">
              Smart overlays that appear during video playback to convert viewers into subscribers.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleVideoDemo}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                🎬 Demo Video Overlay (10s delay)
              </Button>
              
              <div className="text-sm text-gray-500">
                Click the button above to simulate video playback. The countdown overlay will appear after 10 seconds.
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Overlay Triggers:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Video pause (immediate)</li>
                <li>• Timed intervals during playback</li>
                <li>• User engagement based timing</li>
                <li>• Exit intent detection</li>
              </ul>
            </div>

            {/* Video Overlay */}
            {showVideoOverlay && (
              <VideoPlayerOverlay
                isVideoPlaying={isVideoPlaying}
                onResumeVideo={handleCloseOverlay}
                onSubscribeClick={() => {
                  alert('Redirecting to pricing page...');
                  handleCloseOverlay();
                }}
                showOnPlay={true}
                timerType="flash-sale"
                overlayDelay={0}
              />
            )}
          </Card>
        </TabsContent>

        {/* Full System Tab */}
        <TabsContent value="manager" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Countdown System</h2>
            <p className="text-gray-600 mb-6">
              The CountdownManager orchestrates all timers with smart user segmentation and context awareness.
            </p>
            
            <CountdownManager
              showHeaderBanner={false} // Don't duplicate with tab demo
              showPricingUrgency={true}
              showFestivalCountdown={true}
              showVideoOverlay={false}
              originalPrice={299}
              currentPrice={99}
              currency="₹"
              onSubscribeClick={() => alert('Subscribe clicked!')}
              onTimerExpire={(type) => console.log(`Timer expired: ${type}`)}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Smart Segmentation:</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• New visitors: Aggressive urgency</li>
                  <li>• Returning: Targeted offers</li>
                  <li>• Engaged: Personalized timing</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Context Awareness:</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Time of day optimization</li>
                  <li>• Weekend vs weekday</li>
                  <li>• Festival calendar</li>
                  <li>• Cricket season specials</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Persistence:</h3>
                <ul className="text-purple-700 space-y-1">
                  <li>• localStorage state</li>
                  <li>• Cross-session continuity</li>
                  <li>• User engagement tracking</li>
                  <li>• Auto-extend logic</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Implementation Guide */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Quick Implementation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Add to any component:</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { CountdownManager } from '@/components/countdown';

<CountdownManager
  showHeaderBanner={true}
  showPricingUrgency={true}
  originalPrice={299}
  currentPrice={99}
  onSubscribeClick={() => router.push('/pricing')}
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Individual components:</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { CountdownTimer, generateCountdownConfig } from '@/components/countdown';

<CountdownTimer
  config={generateCountdownConfig('flash-sale')}
  variant="card"
  urgency={{ stockRemaining: 25, viewersCount: 42 }}
/>`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}