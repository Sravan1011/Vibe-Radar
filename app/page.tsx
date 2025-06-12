import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart, Radar, TrendingUp, Zap } from "lucide-react"
import TrendChart from "@/components/trend-chart"
import FeatureCard from "@/components/feature-card"
import HowItWorks from "@/components/how-it-works"
import AIComparisonDemo from "@/components/ai-comparison-demo"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Radar className="h-6 w-6 text-primary" />
            <span>LLM Vibes Radar</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link href="/opinion">
              <Button>Get Started</Button>
              </Link>

            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track AI Opinion Trends in Real-Time
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    LLM Vibes Radar periodically polls AI models for opinions and rankings, visualizing shifts in AI
                    perspectives over time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <Zap className="h-4 w-4" />
                    Start Tracking
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full overflow-hidden">
                  <CardContent className="p-0">
                    <TrendChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how LLM Vibes Radar helps you understand AI biases and trends
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 text-primary" />}
                title="Real-time AI Opinion Tracking"
                description="Monitor how AI opinions shift over time on topics that matter to you."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Bias Detection"
                description="Identify and visualize biases across different AI models and providers."
              />
              <FeatureCard
                icon={<LineChart className="h-10 w-10 text-primary" />}
                title="Trend Analysis"
                description="Google Trends-style visualization of changing AI perspectives."
              />
              <FeatureCard
                icon={<PieChart className="h-10 w-10 text-primary" />}
                title="Comparative Insights"
                description="Compare how different AI models respond to the same prompts."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Efficient ISR Updates"
                description="Fast, efficient data updates using Incremental Static Regeneration."
              />
              <FeatureCard
                icon={<Radar className="h-10 w-10 text-primary" />}
                title="Custom Tracking"
                description="Set up custom topics and questions to track AI opinions on your areas of interest."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple process for tracking AI opinions and visualizing trends
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl pt-12">
              <HowItWorks />
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See It In Action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore how different AI models respond to the same questions
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl pt-12">
              <AIComparisonDemo />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Tracking AI Opinions Today</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join us in making AI biases transparent and tracking how AI perspectives evolve over time.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1">
                  Get Early Access
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2 items-center text-lg font-semibold">
            <Radar className="h-5 w-5 text-primary" />
            <span>LLM Vibes Radar</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 LLM Vibes Radar. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
